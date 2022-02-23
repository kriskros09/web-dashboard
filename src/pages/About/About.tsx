import React, { ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
//Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { ImageTextColumns } from '../../components/sections/ImageTextColumns'
// import { Banner } from '../../components/Banner'
import { Footer } from '../../components/shared/Footer'
import { Container } from '../../components/core/Container'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const ABOUT = 'about_us'
const PAGE_NAMES = [GLOBAL, ABOUT]

const AboutPage: React.FC = (): ReactElement<'MainContainer' | 'FullViewLoader' | 'div'> | null => {
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

        <ImageTextColumns
          content={content.page[ABOUT]?.about_us.text}
          title={content.page[ABOUT]?.about_us.title}
          displayHalfRounded
        />

        <ImageTextColumns
          content={content.page[ABOUT]?.mission.text}
          title={content.page[ABOUT]?.mission.title}
          displayFullRounded
        />

        {/* <Banner
          bannerTitle={pageState[pageName]?.blue_bar_2.title}
          btnTitle={pageState[pageName]?.blue_bar_2.btn_text}
          link="/find-lawyer"
          inline
        /> */}
        <Footer pageContent={content.page[GLOBAL]} />
      </Layout>
    </Container>
  )
}

export default AboutPage
