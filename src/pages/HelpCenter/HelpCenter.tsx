import React, { FC, useState, ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
// Store
import { useStore } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { ContactSection } from '../../components/shared/ContactSection'
import { FaqSection } from '../../components/shared/FaqSection'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const HELP_CENTER = 'help_center'
const PAGE_NAMES = [GLOBAL, HELP_CENTER]

const HelpCenterPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageState, pageActions] = useStore('PageContent')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')

  React.useEffect(() => {
    pageActions.FaqContent({
      langId: localeState.language,
    })
  }, [localeState.language])

  const [DetailsOpen, setDetailsOpen] = useState<number>(1)

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading title={content.page[HELP_CENTER].texts?.main_title} />
          {/* MOBILE */}
          <div className="flex flex-col lg:hidden">
            <Button
              className={`flex justify-between text-white text-left mb-2 ${
                DetailsOpen === 1 ? 'bg-primary shadow-md' : 'bg-gray-300'
              }`}
              iconAfter={`${DetailsOpen === 1 ? 'arrow-down' : 'arrow-right'}`}
              label={content.page[HELP_CENTER].texts?.btn_contact}
              onClick={() => setDetailsOpen(1)}
            />
            <div className={`bg-white p-6 mb-2  ${DetailsOpen === 1 ? 'block' : 'hidden'}`}>
              <ContactSection pageContent={content.page[HELP_CENTER]} />
            </div>
            <Button
              className={`flex justify-between text-white text-left mb-2 ${
                DetailsOpen === 2 ? 'bg-primary shadow-md' : 'bg-gray-300'
              }`}
              iconAfter={`${DetailsOpen === 2 ? 'arrow-down' : 'arrow-right'}`}
              label={content.page[HELP_CENTER].texts?.btn_faq}
              onClick={() => setDetailsOpen(2)}
            />
            <div className={`bg-white p-6 mb-2 ${DetailsOpen === 2 ? 'block' : 'hidden'}`}>
              <FaqSection faqsContent={pageState?.faqsByCategories} />
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex">
            <div className="w-1/4 flex flex-col pr-10">
              <Button
                className={`text-white text-left mb-2 ${
                  DetailsOpen === 1 ? 'bg-primary shadow-md' : 'bg-gray-300'
                }`}
                label={content.page[HELP_CENTER].texts?.btn_contact}
                onClick={() => setDetailsOpen(1)}
              />
              <Button
                className={`text-white text-left mb-2 ${
                  DetailsOpen === 2 ? 'bg-primary shadow-md' : 'bg-gray-300'
                }`}
                label={content.page[HELP_CENTER].texts?.btn_faq}
                onClick={() => setDetailsOpen(2)}
              />
            </div>

            <div className="w-3/4 bg-white py-10 px-20">
              <div className={`${DetailsOpen === 1 ? 'block' : 'hidden'}`}>
                <ContactSection pageContent={content.page[HELP_CENTER]} />
              </div>
              <div className={`${DetailsOpen === 2 ? 'block' : 'hidden'}`}>
                <FaqSection faqsContent={pageState?.faqsByCategories} />
              </div>
            </div>
          </div>
        </AccountLayout>
      </Layout>
    </Container>
  )
}

export default HelpCenterPage
