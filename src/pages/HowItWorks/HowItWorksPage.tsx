import React, { ReactElement } from 'react'
import ReactHtmlParser from 'react-html-parser'

// Hooks
import { useContent } from '../../hooks'
//Container
import { Container } from '../../components/core/Container'
//Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Header } from '../../components/shared/Header'
import { Footer } from '../../components/shared/Footer'
import { YoutubeVideo } from '../../components/shared/youtubevideo/YoutubeVideo'
import { SimpleHero } from '../../components/shared/SimpleHero'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const HOW_IT_WORKS = 'how_it_works'
const PAGE_NAMES = [GLOBAL, HOW_IT_WORKS]

type HowitWorksType = {
  pageContent?: any
}

const HowItWorksPage: React.FC = (): ReactElement<
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
      <div className="bg-gray-100">
        <Layout>
          <TopNavigation pageContent={content.page[GLOBAL]} />
          <Header pageContent={content.page[GLOBAL]} />
          <SimpleHero title={content.page[HOW_IT_WORKS].banner.title} />
          <div className="container">
            <div className="w-full flex-column xl:flex xl:flex-row bg-white rounded p-5 lg:p-10 mt-10 mb-10">
              <div className="w-full xl:w-6/12">
                <h4 className="text-center xl:text-left pb-8 pt-8 md:pt-4 xl:w-8/12">
                  {ReactHtmlParser(content.page[HOW_IT_WORKS].texts.title_1)}
                </h4>
              </div>
              <div className="sm:w-full xl:w-6/12">
                <h3 className="text-center xl:text-left text-primary-dark pb-5 pt-5 md:pt-4">
                  {content.page[HOW_IT_WORKS].texts.question_1}
                </h3>
                <p className="pb-5 text-primary-dark">
                  {content.page[HOW_IT_WORKS].texts.text_1_1}
                </p>
                <YoutubeVideo
                  frameborder="0"
                  height="100%"
                  videoSrc="https://www.youtube.com/embed/xuW7RaQylgQ"
                  width="100%"
                />
                <p className="pt-5 pb-8 text-primary-dark">
                  {content.page[HOW_IT_WORKS].texts.text_1_2}
                </p>
              </div>
            </div>
            <div className="w-full flex-column xl:flex xl:flex-row bg-white rounded p-5 lg:p-10 mt-10 mb-10">
              <div className="w-full xl:w-6/12">
                <h4 className="text-center xl:text-left pb-8 pt-8 md:pt-4 xl:w-8/12">
                  {ReactHtmlParser(content.page[HOW_IT_WORKS].texts.title_2)}
                </h4>
              </div>
              <div className="sm:w-full xl:w-6/12">
                <h3 className="text-center xl:text-left text-primary-dark pb-5 pt-5 md:pt-4">
                  {content.page[HOW_IT_WORKS].texts.question_2}
                </h3>
                <p className="pb-5 text-primary-dark">
                  {content.page[HOW_IT_WORKS].texts.text_2_1}
                </p>
                <YoutubeVideo
                  frameborder="0"
                  height="100%"
                  videoSrc="https://www.youtube.com/embed/-UiLP7JxjcM"
                  width="100%"
                />
                <p className="pt-5 pb-8 text-primary-dark">
                  {content.page[HOW_IT_WORKS].texts.text_2_2}
                </p>
              </div>
            </div>
          </div>
          <Footer pageContent={content.page[GLOBAL]} />
        </Layout>
      </div>
    </Container>
  )
}

export default HowItWorksPage
