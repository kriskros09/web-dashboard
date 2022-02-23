import React, { ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { SimpleHero } from '../../components/shared/SimpleHero'
import { Grid } from '../../components/LawList'
import { Banner } from '../../components/Banner'
import { Footer } from '../../components/shared/Footer'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const RIGHT_LAW = 'type_of_law'
const PAGE_NAMES = [GLOBAL, RIGHT_LAW]

const RightLawPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })

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
        <SimpleHero title={content.page[RIGHT_LAW].banner.title} />
        <Grid />
        <Banner
          bannerTitle={content.page[RIGHT_LAW].blue_bar_1.title}
          btnTitle={content.page[RIGHT_LAW].blue_bar_1.btn_text}
          link="/contact"
          inline
        />
        <Footer pageContent={content.page[GLOBAL]} />
      </Layout>
    </Container>
  )
}

export default RightLawPage
