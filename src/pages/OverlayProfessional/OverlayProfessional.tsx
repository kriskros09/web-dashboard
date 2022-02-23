import React, { FC, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

// Store
import { getState } from '../../store/models'
// Helpers
import { userSessionMapper } from '../../store/helpers/mappers'
// Hooks
import { useContent } from '../../hooks'
//Container
import { Container } from '../../components/core/Container'
// Components
import { FullViewLoader } from '../../components/Loader/FullViewLoader'
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { OverlayProf } from '../../modules/SignUp/views/OverlayProf'

const GLOBAL = 'global'
const SIGNUP = 'signup'
const PAGE_NAMES = [GLOBAL, SIGNUP]

const OverlayProfessional: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const { roles } = userSessionMapper(getState('User')?.session)
  const hasFirmRole = roles.includes('firmManager')
  const hasProRole = roles.includes('professional')
  const history = useHistory()

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  if (hasFirmRole || hasProRole) {
    history.push('/profile')
  }

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading title="Créer un profile professionnel" />
          <div className="md:w-full lg:w-8/12 bg-white mt-12 mb-8 p-10 rounded-lg shadow-md relative">
            <OverlayProf pageContent={content.page[SIGNUP]} />
          </div>
        </AccountLayout>
      </Layout>
    </Container>
  )
}

export default OverlayProfessional
