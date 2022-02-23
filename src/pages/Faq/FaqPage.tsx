import React, { FC, ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
//Utils
import Utils from '../../utils'
// Store
import { useStore } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
//Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { Footer } from '../../components/shared/Footer'
import { SimpleHero } from '../../components/shared/SimpleHero'
import { FaqSection } from '../../components/shared/FaqSection'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const FAQ = 'faq'
const PAGE_NAMES = [GLOBAL, FAQ]
const FaqPage: React.FC = (): ReactElement<'MainContainer' | 'FullViewLoader' | 'div'> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const [pageState, pageActions] = useStore('PageContent')
  const [localeState] = useStore('Locale')

  React.useEffect(() => {
    pageActions.FaqContent({
      langId: localeState.language || Utils.Language.detectBrowserLanguage(),
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
      <div className="bg-gray-100">
        <Layout>
          <TopNavigation pageContent={content.page[GLOBAL]} />
          <Header pageContent={content.page[GLOBAL]} />
          <SimpleHero title={content.page[FAQ].banner.title} />
          <div className="container">
            <FaqSection faqsContent={pageState?.faqsByCategories} />
          </div>
          <Footer pageContent={content.page[GLOBAL]} />
        </Layout>
      </div>
    </Container>
  )
}

export default FaqPage
