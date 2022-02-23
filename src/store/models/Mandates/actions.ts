// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getState } from '../index'
import globalActions from '../Global/actions'
import graphql from '../../../services/graphql'

import { State, ActionParams } from './types'
import GraphQL from './graphql'

const END_POINT = 'mandates'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries, mutations } = GraphQL

const setIsLoading = (isLoading: boolean): Partial<State> => {
  return {
    isLoading,
  }
}

const UserPurchases = async (
  payload: {
    langId: string
    userId: string
    perPage: number
    orderBy: string
    search: string
    page: number
    scope: number
  },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_PURCHASES, payload)

  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'User purchases', message: errors[0].message }],
    }
  }

  if (response?.data?.mandatesList) {
    const { mandates, listInfo } = data.mandatesList

    return {
      data: mandates,
      listInfo,
    }
  }

  return state
}

const TodoLists = async (
  payload: {
    langId: string
    proId: string
    firmId: string
    perPage: number
    orderBy: string
    search: string
    page: number
    scope: number
  },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_TODO, payload)

  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'Todo list', message: errors[0].message }],
    }
  }

  if (response?.data?.mandatesList) {
    const { mandates, listInfo } = data.mandatesList

    return {
      data: mandates,
      listInfo,
    }
  }

  return state
}

const MandateStatus = async (
  payload: { langId: string; mandId: string; modBy: string; status: number },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, mutations.MANDATE_STATUS, payload)
  const { data, errors } = response
  globalActions.setLoading(false)

  if (errors?.length) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'update mandat status', message: errors[0].message }],
    }
  }

  if (response?.data?.mandateStatus) {
    actions.setIsLoading(false)
    const { mandateStatus } = data

    return {
      ...state,
      mandateStatus,
    }
  }

  return state
}

const TaskStatus = async (payload: { taskId: string; modBy: string; status: number }, context) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, mutations.TASK_STATUS, payload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'update task status', message: errors[0].message }],
    }
  }

  return state
}

const PurchaseOrder = async (
  payload: {
    poId: string
  },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_PURCHASE_ORDER, payload)

  const { data, errors } = response

  if (errors?.length) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'purchase Order', message: errors[0].message }],
    }
  }

  if (response?.data?.purchaseOrder) {
    return data
  }

  return state
}

export default {
  UserPurchases,
  TodoLists,
  MandateStatus,
  TaskStatus,
  PurchaseOrder,
  setIsLoading,
}
