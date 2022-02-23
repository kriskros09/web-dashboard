import React, { ReactElement } from 'react'
import { LegalTextsSection } from 'components/shared/LegalTextsSection'

// Hooks
import { useContent } from '../../hooks'
//Container
import { Container } from '../../components/core/Container'
//Utils
import Utils from '../../utils'
// Store
import { useStore } from '../../store/models'
// Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { SimpleHero } from '../../components/shared/SimpleHero'
import { Footer } from '../../components/shared/Footer'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const PRIVACY_POLICY = 'privacy_policy'
const PAGE_NAMES = [GLOBAL, PRIVACY_POLICY]

type PrivacyPolicyType = {
  pageContent?: any
}

const PrivacyPolicyPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const [pageState, pageActions] = useStore('PageContent')
  const [localeState] = useStore('Locale')

  React.useEffect(() => {
    pageActions.LegalTextsContent({
      langId: localeState.language || Utils.Language.detectBrowserLanguage(),
      catId: 'CA0000000009',
      status: 1,
    })
  }, [localeState.language])

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  return (
    <Container center>
      <Layout>
        <TopNavigation pageContent={content.page[GLOBAL]} />
        <Header pageContent={content.page[GLOBAL]} />
        <SimpleHero title={content.page[PRIVACY_POLICY].texts.title} />
        <div className="container">
          <LegalTextsSection LegalTextsContent={pageState?.legalTexts} />
        </div>
        <Footer pageContent={content.page[GLOBAL]} />
      </Layout>
    </Container>
  )
}

export default PrivacyPolicyPage
