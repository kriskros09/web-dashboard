// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getState } from '../index'
import globalActions from '../Global/actions'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signUpFormMapper } from '../../helpers/mappers'
import graphql from '../../../services/graphql'

import GraphQL from './graphql'

const END_POINT = 'content'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries } = GraphQL

const PageContent = async (payload: { page: string; langId: string }, context) => {
  const { state } = context

  const { page } = payload
  const response = await graphql.executeOparation(END_POINT, queries.GET_PAGE_CONTENT, payload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      ...state,
      errors: [...state.errors, { view: 'profile', message: errors[0].message }],
    }
  }

  if (data?.pageContent?.translation) {
    return {
      [page]: data.pageContent.translation[page],
      global: data.pageContent.translation.global,
    }
  }

  return state
}

const FaqContent = async (payload: { langId: string }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, queries.GET_FAQ, payload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile', message: errors[0].message }],
    }
  }

  if (data?.faqsByCategories) {
    return {
      faqsByCategories: data?.faqsByCategories,
    }
  }

  return state
}

const LegalTextsContent = async (
  payload: { langId: string; catId: string; status: number },
  context,
) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, queries.GET_LEGAL_TEXTS, payload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile', message: errors[0].message }],
    }
  }

  if (data?.legalTexts) {
    return data
  }

  return state
}

export default {
  PageContent,
  FaqContent,
  LegalTextsContent,
}
