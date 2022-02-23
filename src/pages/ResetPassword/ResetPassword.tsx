import React, { FC } from 'react'

// Components
import { Layout } from '../../components/core/Layout'
import { TopNavigation } from '../../components/shared/TopNavigation'
import { Hero } from '../../components/Hero'

const ResetPasswordPage: FC = () => (
  <Layout>
    <TopNavigation />
    <Hero />
  </Layout>
)

export default ResetPasswordPage
