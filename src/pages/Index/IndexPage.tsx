import React, { ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
// Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { Hero } from '../../components/Hero'
import { Banner } from '../../components/Banner'
import { Footer } from '../../components/shared/Footer'
//Sections
import { HowTo } from '../../components/sections/HowTo'
import { FindLaw } from '../../components/sections/FindLaw'
import { ImageTextColumns } from '../../components/sections/ImageTextColumns'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'
import { Container } from '../../components/core/Container'
const GLOBAL = 'global'
const HOME_PAGE = 'home_page'
const PAGE_NAMES = [GLOBAL, HOME_PAGE]

const IndexPage: React.FC = (): ReactElement<'MainContainer' | 'FullViewLoader' | 'div'> | null => {
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
        <Hero pageContent={content.page[HOME_PAGE]} />
        <Banner
          bannerTitle={content.page[HOME_PAGE].blue_bar_1.title}
          btnTitle={content.page[HOME_PAGE].blue_bar_1.btn_text}
          link="/right-law"
          inline
        />
        <HowTo pageContent={content.page[HOME_PAGE]} />
        <FindLaw pageContent={content.page[HOME_PAGE]} />
        <ImageTextColumns
          content={content.page[HOME_PAGE].mission.text}
          title={content.page[HOME_PAGE].mission.title}
        />
        <Banner
          bannerTitle={content.page[HOME_PAGE].blue_bar_2.title}
          btnTitle={content.page[HOME_PAGE].blue_bar_2.btn_text}
          link="/find-lawyer"
          inline
        />
        <Footer pageContent={content.page[GLOBAL]} />
      </Layout>
    </Container>
  )
}

export default IndexPage
