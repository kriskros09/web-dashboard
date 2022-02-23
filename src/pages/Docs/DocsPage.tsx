import React, { FC } from 'react'

import { MainContainer } from '../../containers/Main'
import { Layout } from '../../components/core/Layout'

const DocsPage: FC = () => {
  return (
    <Layout>
      <MainContainer>
        <p className="text-lg text-white">This is the docs page</p>
      </MainContainer>
    </Layout>
  )
}

export default DocsPage
