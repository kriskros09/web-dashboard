import React from 'react'

// Store
import { useStore } from '../store/models'
// Components
import { Container } from '../components/core/Container'
//Utils
import Utils from '../utils'

const SignUp: React.FC<{ endpoints?: string[]; pageName?: string }> = (props) => {
  const { pageName } = props
  const [, contentActions] = useStore('PageContent')
  const [localeState, localeActions] = useStore('Locale')
  const [, globalActions] = useStore('Global')

  React.useEffect(() => {
    ;(async () => {
      const language = localeState.language || Utils.Language.detectBrowserLanguage()
      await localeActions.setLanguage({ language })

      if (pageName) {
        await contentActions.PageContent({ page: pageName, langId: language })
      }
      await globalActions.getGlobalContent()
    })()
  }, [localeState.language])

  return <Container center>{props.children}</Container>
}

export default SignUp
