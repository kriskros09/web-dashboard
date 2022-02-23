import React, { ReactElement } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { ProfOrderInput } from '../store/models/Order/types'
// Store
import { useStore, getState, actions } from '../store/models'
// Components
import { Container } from '../components/core/Container'
// Services
import graphql from '../services/graphql'
import userGrapQL from '../store/models/User/graphql'
import { FullViewLoader } from '../components/Loader/FullViewLoader'

const Confirmation: React.FC = (): ReactElement<'Container'> => {
  const [, userActions] = useStore('User')
  const search = useLocation().search
  const history = useHistory()
  const token = new URLSearchParams(search).get('token')

  if (!token) {
    history.push('/')
  }

  React.useEffect(() => {
    // Using an IIFE
    ;(async () => {
      if (!token) {
        history.push('/')

        return
      }

      const { data, errors } = await graphql.executeOparation(
        'users',
        userGrapQL.mutations.EMAIL_CONFIRMATION,
        {
          emailToken: token,
        },
      )

      if (errors) {
        history.push('/500-error')
      }

      if (data?.confirmEmail) {
        const { redirect, token, tokenExpiration, userId, orderToken } = data.confirmEmail
        await userActions.autoLogin({ token, tokenExpiration, userId })
        const { session } = getState('User')
        const { language } = getState('Locale')

        if (session && redirect) {
          const redirects = {
            profile: '/profile',
            order: '/checkout',
          }

          if (redirect === 'order' && orderToken) {
            try {
              const parsedToken = jwt_decode(orderToken) as any
              delete parsedToken?.exp
              delete parsedToken?.iat
              await actions.Order.getOrderDetails({
                langId: language,
                profOrderInput: parsedToken as ProfOrderInput,
              })
            } catch (e) {
              // we only get here if token decode failed
              console.log('E', e)
              history.push('/500-error')
            }
          }

          history.push(`${redirects[redirect]}`)
        } else {
          history.push('/500-error')
        }
      }
    })()
  }, [token])

  return (
    <Container center>
      <FullViewLoader showLoader />
    </Container>
  )
}

export default Confirmation
