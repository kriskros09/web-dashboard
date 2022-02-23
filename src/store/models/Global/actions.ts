import { gql, execute, HttpLink, toPromise } from '@apollo/client'

import { getState } from '../index'
import graphql from '../../../services/graphql'

import { NewsletterInput } from './types'
import GraphQL from './graphql'

const API_DOMAIN = 'https://dev.goodowl.com/api'
const API_CONTENT_ENDPOINT = 'content'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries, mutations } = GraphQL

const setLoading = (payload) => {
  return {
    loading: payload,
  }
}

const getGlobalContent = async (_, context) => {
  const { state, actions } = context
  actions.setLoading(true)

  const lang = getState('Locale').language

  if (lang !== '') {
    const uri = `${API_DOMAIN}/${API_CONTENT_ENDPOINT}`
    const link = new HttpLink({ uri })

    const professionsOperation = {
      query: gql`
        query($langId: String, $status: Int) {
          professions(langId: $langId, status: $status) {
            profId
            texts {
              name
            }
          }
        }
      `,
      variables: { langId: lang, status: 1 },
    }

    const languagesOperation = {
      query: gql`
        query($langId: String) {
          languages(langId: $langId) {
            languageId
            texts {
              name
            }
          }
        }
      `,
      variables: { langId: lang },
    }

    const countriesOperation = {
      query: gql`
        query($langId: String, $status: Int) {
          countries(langId: $langId, status: $status) {
            countIso
            texts {
              name
            }
            regions {
              regIso
              texts {
                name
              }
            }
          }
        }
      `,
      variables: { langId: lang, status: 1 },
    }

    const LawsListOperation = {
      query: gql`
        query($langId: String, $status: Int) {
          laws(langId: $langId, status: $status) {
            lawId
            texts {
              langId
              name
            }
            sectors {
              sectId
              texts {
                name
              }
            }
          }
        }
      `,
      variables: { langId: lang, status: 1 },
    }

    const WeekDaysOperation = {
      query: gql`
        query($langId: String, $status: Int) {
          weekdays(langId: $langId, status: $status) {
            dayId
            texts {
              name
              short
            }
          }
        }
      `,
      variables: { langId: lang, status: 1 },
    }

    const servicesOperation = {
      query: gql`
        query($langId: String, $status: Int) {
          services(langId: $langId, status: $status) {
            servId
            texts {
              langId
              name
            }
          }
        }
      `,
      variables: { langId: lang, status: 1 },
    }

    const [professions, languages, countries, laws, weekdays, services] = await Promise.all([
      toPromise(execute(link, professionsOperation)),
      toPromise(execute(link, languagesOperation)),
      toPromise(execute(link, countriesOperation)),
      toPromise(execute(link, LawsListOperation)),
      toPromise(execute(link, WeekDaysOperation)),
      toPromise(execute(link, servicesOperation)),
      actions.getAllFirms({ status: 1, orderBy: 'name' }),
    ])
      .then((response) => response)
      .catch((error) => error)

    const updatedState = {}

    if (professions?.data?.professions) {
      Object.assign(updatedState, { professions: professions.data.professions })
      // updatedState.professions = [...professions.data.professions]
    }

    if (languages?.data?.languages) {
      Object.assign(updatedState, { languages: languages.data.languages })
      // updatedState.languages = [...languages.data.languages]
    }

    if (countries?.data?.countries) {
      // const countriesData = countries.data.countries
      // updatedState.countries = [...countriesData]
      const regions = countries.data.countries.map((country) => country.regions).flat()
      // updatedState.regions = regions
      Object.assign(updatedState, { countries: countries.data.countries, regions })
    }

    if (laws?.data?.laws) {
      Object.assign(updatedState, { laws: laws.data.laws })
    }

    if (weekdays?.data?.weekdays) {
      Object.assign(updatedState, { weekdays: weekdays.data.weekdays })
    }

    if (services?.data?.services) {
      Object.assign(updatedState, { services: services.data.services })
    }

    return updatedState
  }

  return state
}

const getFirmsByEmail = async (payload: { email: string }, context) => {
  const { state } = context
  const { email } = payload
  const endpoint = 'profiles'
  const query = queries.GET_FIRMS_BY_EMAIL
  const variables = { email }
  const response = await graphql.executeOparation(endpoint, query, variables)
  const { data, errors } = response

  if (errors?.length) {
    return {
      error: errors,
    }
  }

  if (data?.suggestedFirms) {
    const uniqueFirms = [...data.suggestedFirms].reduce((uniques, firm) => {
      if (!uniques.find((unique) => unique.firmId === firm.firmId)) {
        uniques.push(firm)
      }

      return uniques
    }, [])

    return {
      firmsByEmail: uniqueFirms,
    }
  }

  return state
}

const getAllFirms = async (payload: { status: number; orderBy: string }, { state }) => {
  // const { status, orderBy } = payload
  const endpoint = 'profiles'
  const query = queries.GET_ALL_FIRMS
  const variables = { ...payload }
  const response = await graphql.executeOparation(endpoint, query, variables)
  const { data, errors } = response

  if (errors?.length) {
    return {
      error: errors,
    }
  }

  if (data?.firms) {
    return {
      firms: data.firms,
    }
  }

  return state
}

const SubscribeNewsletter = async (payload: { newsletterInput: NewsletterInput }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(
    'emails',
    mutations.NEWSLETTER_SUBSCRIPTION,
    payload,
  )
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'newsletter subscription', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

export default { getGlobalContent, setLoading, getFirmsByEmail, getAllFirms, SubscribeNewsletter }
