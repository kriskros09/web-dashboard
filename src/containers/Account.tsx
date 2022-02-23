import React from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
// Store
import { useStore } from '../store/models'
// Components
import { Container } from '../components/core/Container'
//Utils
import { detectBrowserLanguage } from '../utils/language'

const AccountContainer: React.FC<{ endpoints?: string[]; pageName?: string }> = (props) => {
  const { pageName } = props
  const [, contentActions] = useStore('PageContent')
  const [localeState, localeActions] = useStore('Locale')
  const [, globalActions] = useStore('Global')

  React.useEffect(() => {
    ;(async () => {
      const language = localeState.language || detectBrowserLanguage()
      await localeActions.setLanguage({ language })

      if (pageName) {
        await contentActions.PageContent({ page: pageName, langId: language })
      }
      await globalActions.getGlobalContent()
    })()
  }, [localeState.language])

  return (
    <Container center>
      <ToastContainer />
      {props.children}
    </Container>
  )
}

export default AccountContainer
