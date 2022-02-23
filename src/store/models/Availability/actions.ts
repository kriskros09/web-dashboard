import graphql from '../../../services/graphql'

import { State, inputAvailability, ActionParams, DaysOff } from './types'
import GraphQL from './graphql'

const END_POINT = 'profiles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries, mutations } = GraphQL

const setIsLoading = (isLoading: boolean): Partial<State> => {
  return {
    isLoading,
  }
}

const getAvailabilities = async (
  payload: { proId: string; status?: number },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_AVAILABILITIES, payload)

  const { data, errors } = response

  if (response?.errors) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'availabilities', message: errors[0].message }],
    }
  }

  //const { professionals } = data
  if (response?.data?.availabilities) {
    actions.setIsLoading(false)

    const { availabilities } = data

    return {
      availabilities,
    }
  }

  actions.setIsLoading(false)

  return data
}

const getDaysOff = async (
  payload: { proId: string; status?: number; orderBy?: string },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_DAYSOFF, payload)

  const { data, errors } = response

  if (response?.errors) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'days off', message: errors[0].message }],
    }
  }

  //const { professionals } = data
  if (response?.data?.daysOff) {
    actions.setIsLoading(false)

    const { daysOff } = data

    return {
      daysOff,
    }
  }

  actions.setIsLoading(false)

  return data
}

const RemoveAvailability = async (payload: { availId: string }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.DELETE_AVAILABILITY, payload)

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'remove availability', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

const RemoveDaysOff = async (payload: { dayOffId: string }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.DELETE_DAYSOFF, payload)

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'remove day off', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

const UpdateAvailabilityStatus = async (payload: { availId: string; status: number }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(
    END_POINT,
    mutations.UPDATE_AVAILABILITY_STATUS,
    payload,
  )

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'update availability status', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

const CreateAvailability = async (
  payload: { proId: string; availabilityInput: inputAvailability },
  context,
) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.CREATE_AVAILABILITY, payload)

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'create availabilities', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

const CreateDaysOff = async (payload: { proId: string; dayOffInput: DaysOff }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.CREATE_DAYSOFF, payload)

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'create days off', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

const UpdateAvailability = async (
  payload: { availId: string; proId: string; availabilityInput: inputAvailability },
  context,
) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.UPDATE_AVAILABILITY, payload)
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'update availability', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

const UpdateDaysOff = async (
  payload: { dayOffId: string; proId: string; dayOffInput: DaysOff },
  context,
) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.UPDATE_DAYSOFF, payload)
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'update days off', message: errors[0].message }],
    }
  }

  if (response?.data) {
    return data
  }

  return state
}

export default {
  getAvailabilities,
  getDaysOff,
  setIsLoading,
  RemoveAvailability,
  RemoveDaysOff,
  CreateAvailability,
  CreateDaysOff,
  UpdateAvailability,
  UpdateAvailabilityStatus,
  UpdateDaysOff,
}
