import React from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'
// Store
// import { useStore } from '../../store/models'
// Components
import { Container } from '../../components/core/Container'
// import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const MainContainer: React.FC<{ pageName?: string; isLoading?: boolean }> = (props) => {
  // const { isLoading = false } = props
  // const [, contentActions] = useStore('PageContent')
  // const [localeState, localeActions] = useStore('Locale')
  // const [, globalActions] = useStore('Global')

  // React.useEffect(() => {
  //   ;(async () => {
  //     const language = localeState.language || detectBrowserLanguage()
  //     await localeActions.setLanguage({ language })

  //     if (pageName) {
  //       await contentActions.PageContent({ page: pageName, langId: language })
  //     }
  //     await globalActions.getGlobalContent()
  //   })()
  // }, [localeState.language])

  return (
    <Container center>
      <ToastContainer />
      {props.children}
      {/* <FullViewLoader showLoader={isLoading} /> */}
    </Container>
  )
}

export default MainContainer
