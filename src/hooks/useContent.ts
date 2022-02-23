import { gql, execute, HttpLink, toPromise } from '@apollo/client'
import { useEffect, useState } from 'react'

import { actions, useStore } from '../store/models/'
import Utils from '../utils'
import { getServerError } from '../utils'

export type UseContentParamsType = {
  pageNames: string[]
}

type Translation = {
  [key: string]: string
}
export type UseContentReturnType = {
  isLoading: boolean
  content: {
    page: Record<string, Translation> | any
  }
}

const link = new HttpLink({ uri: 'https://dev.goodowl.com/api/content' })
export const useContent = (params: UseContentParamsType): UseContentReturnType => {
  const { pageNames } = params
  const [isLoading, setIsLoading] = useState(false)
  const [localeState] = useStore('Locale')
  const [content, setContent] = useState({ page: {} })
  const [, globalActions] = useStore('Global')

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      if (!localeState.language) {
        await actions.Locale.setLanguage({ language: Utils.Language.detectBrowserLanguage() })
      }

      await globalActions.getGlobalContent()

      if (pageNames.length > 0) {
        const batchedGraphs = pageNames.map(async (page) => {
          const graph = {
            query: gql`
              query($page: String!, $langId: String!) {
                pageContent(page: $page, langId: $langId)
              }
            `,
            variables: { page, langId: localeState.language },
          }

          return {
            key: page,
            result: await toPromise(execute(link, graph))
              .then((data) => data)
              .catch((error) => getServerError(error)),
          }
        })

        const responses = await Promise.all(batchedGraphs)

        const hasResponseWithError = responses.some((response) => response.result['error'])

        if (hasResponseWithError) {
          // handle a fallback here if we have an error fetching contect
        }

        const mappedPageContent = pageNames.reduce((acc, page) => {
          const pageResponse = responses.find((response) => response.key === page)

          if (!acc[page] && pageResponse?.result) {
            acc[page] = pageResponse.result['data'].pageContent.translation[page]
          }

          return acc
        }, {})

        setContent({
          ...content,
          page: mappedPageContent,
        })
      }

      setIsLoading(false)
    })()
  }, [pageNames, localeState.language])

  return {
    isLoading,
    content,
  }
}
