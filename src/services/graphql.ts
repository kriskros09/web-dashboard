import { gql, execute, HttpLink, toPromise } from '@apollo/client'

const API_DOMAIN = 'https://dev.goodowl.com/api'

export const executeOparation = async (endpoint: string, operation, variables): Promise<any> => {
  const uri = `${API_DOMAIN}/${endpoint}`
  const link = new HttpLink({ uri })
  const graph = {
    query: gql`
      ${operation}
    `,
    variables: { ...variables },
  }

  const result = await toPromise(execute(link, graph))
    .then((data) => data)
    .catch((error) => error)

  return result
}

export default {
  executeOparation,
}
