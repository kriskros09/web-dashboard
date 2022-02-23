import React, { FC, ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
//Container
import { Container } from '../../components/core/Container'
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { SimpleHero } from '../../components/shared/SimpleHero'
import { Header } from '../../components/shared/Header'
import { Footer } from '../../components/shared/Footer'
import { ContactSection } from '../../components/shared/ContactSection'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const CONTACT = 'contact_us'
const PAGE_NAMES = [GLOBAL, CONTACT]

type Types = {
  inline?: boolean

  dark?: boolean

  pageContent?: any

  // getResults?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ContactPage: React.FC = (): ReactElement<
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
          <SimpleHero title="Contact" />
          <div className="container">
            <ContactSection pageContent={content.page[CONTACT]} />
          </div>
          <Footer pageContent={content.page[GLOBAL]} />
        </Layout>
      </div>
    </Container>
  )
}

export default ContactPage
