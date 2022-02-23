import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory, Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Formik, Form } from 'formik'
import { string, object, ref } from 'yup'

import i18next from '../i18n'

// Hooks
import { useContent } from '../hooks'
// Store
import { useStore, getState } from '../store/models'
// Components
import { Button } from '../components/shared/Button'
import { Layout } from '../components/core/Layout'
import { Logo } from '../components/shared/Icons'
import { MainContainer } from '../containers/Main'
import { InputComponent } from '../components/shared/forms/FormElements/Input'
// import { Confirmation } from '../modules/SignUp/views/Confirmation'
// Services
import graphql from '../services/graphql'
import userGrapQL from '../store/models/User/graphql'
import { FullViewLoader } from '../components/Loader/FullViewLoader'
import Background from '../assets/img/img-goodowl-fond-hibou2.jpg'

const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/

const validationSchema = object().shape({
  password: string()
    .min(8, i18next.t('translation:formError.min_8'))
    .matches(passwordRegEx, i18next.t('translation:formError.passwordRegex'))
    .required(i18next.t('translation:formError.required')),

  confirmPassword: string()
    .required(i18next.t('translation:formError.required'))
    .oneOf([ref('password'), null], i18next.t('translation:formError.passwordMatching')),
})

const SIGNUP = 'signup'
const RESET_PASSWORD = 'reset_password'
const PAGE_NAMES = [RESET_PASSWORD, SIGNUP]

const PasswordResetContainer: React.FC = (): ReactElement<'Container'> | null => {
  const { isLoading: isContentLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const [, userActions] = useStore('User')
  const search = useLocation().search
  const history = useHistory()
  const token = new URLSearchParams(search).get('token')
  const [message, setMessage] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [userId, setUserId] = React.useState('')
  const [showConfirmation, setShowConfirmation] = React.useState(false)

  const handleSubmit = async (values, actions) => {
    if (userId !== '') {
      const { password, confirmPassword } = values
      await userActions.updatePassword({ userId, password, confirmPassword })
      const { errors } = getState('User')

      const hasError = errors.find((error) => error.view === 'password-reset')

      if (hasError?.message) {
        const { message } = hasError
        setMessage(message as any)
      } else {
        actions.setSubmitting(false)
        setShowConfirmation(true)
      }
    }
  }

  React.useEffect(() => {
    ;(async () => {
      setIsLoading(true)

      if (!token) {
        history.push('/')
        setIsLoading(false)

        return
      }

      const response = await graphql.executeOparation(
        'users',
        userGrapQL.mutations.VERIFY_PASSWORD_RESET_TOKEN,
        {
          emailToken: token,
        },
      )
      const hasServerError = response?.statusCode && response?.statusCode !== 200

      if (response?.errors || hasServerError) {
        setIsLoading(false)
        const message = hasServerError
          ? response?.result?.errors[0].message
          : response.errors[0].message

        setMessage(message)
      }

      if (response?.data?.verifyPasswordToken?.validated) {
        setIsLoading(false)
        const { userId } = jwt_decode(token) as any
        setUserId(userId)
      }
    })()
  }, [token])

  if (!isContentLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading || isContentLoading) {
    return <FullViewLoader showLoader />
  }

  return (
    <MainContainer>
      <Layout>
        <ImgBgContainer>
          <div className="container h-screen flex flex-col justify-center">
            <div className="w-full lg:w-6/12 xxl:w-2/5 bg-white p-10 lg:p-20 rounded shadow-md">
              <div className="text-center">
                <Link to="/">
                  <Logo />
                </Link>
                {showConfirmation ? (
                  <div className="flex flex-col">
                    <h2 className="normal-case text-primary mb-6">
                      {content.page[RESET_PASSWORD].confirmation.title}
                    </h2>
                    <p className="text-primary-dark font-medium mb-4">
                      {content.page[RESET_PASSWORD].confirmation.text_1}
                    </p>
                    <Link
                      className="btn text-white bg-primary inline-block mt-12 ml-auto mr-0"
                      to="/login"
                    >
                      {content.page[RESET_PASSWORD].confirmation.link_text}
                    </Link>
                    {content.page[RESET_PASSWORD].confirmation.text_2}
                  </div>
                ) : (
                  <>
                    <h2 className="normal-case text-primary mb-8 ">
                      {content.page[RESET_PASSWORD].texts.title}
                    </h2>
                    {message && <small>{message}</small>}
                    <Formik
                      enableReinitialize={false}
                      initialValues={{ password: '', confirmPassword: '' }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ handleChange, handleBlur, errors, isSubmitting }) => (
                        <Form className="flex flex-col justify-start">
                          <InputComponent
                            error={errors['password']}
                            label="Password"
                            name="password"
                            placeholder={content.page[RESET_PASSWORD].texts.input_2}
                            type="password"
                            light
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <InputComponent
                            error={errors['confirmPassword']}
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder={content.page[RESET_PASSWORD].texts.input_3}
                            type="password"
                            light
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <Button
                            className="bg-primary text-white md:self-start cursor-pointer"
                            disabled={isSubmitting}
                            label={content.page[RESET_PASSWORD].texts.btn_send}
                            type="submit"
                          />
                        </Form>
                      )}
                    </Formik>
                  </>
                )}
              </div>
            </div>
          </div>
        </ImgBgContainer>
      </Layout>
    </MainContainer>
  )
}
export default PasswordResetContainer

const ImgBgContainer = styled.div.attrs({
  className: 'h-screen w-full',
})`
  background-image: url(${Background});
  background-size: cover;
  background-position: center top;

  svg {
    display: initial;
    margin-bottom: 40px;
  }
`
