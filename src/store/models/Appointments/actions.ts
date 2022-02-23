// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getState } from '../index'
import globalActions from '../Global/actions'
import graphql from '../../../services/graphql'

import { State, ActionParams } from './types'
import GraphQL from './graphql'

const END_POINT = 'mandates'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries } = GraphQL

const setIsLoading = (isLoading: boolean): Partial<State> => {
  return {
    isLoading,
  }
}

const GetProAppointments = async (
  payload: {
    langId: string
    proId: string
    dateFrom: string
    dateTo: string
  },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_PRO_APPOINTMENTS, payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'calendar pro', message: errors[0].message }],
    }
  }

  if (response?.data?.appointmentsPro) {
    actions.setIsLoading(false)
    const { appointmentsPro } = data

    return {
      appointments: [appointmentsPro],
    }
  }
  actions.setIsLoading(false)

  return state
}

const GetFirmAppointments = async (
  payload: {
    langId: string
    firmId: string
    dateFrom: string
    dateTo: string
  },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_FIRM_APPOINTMENTS, payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'calendar firm', message: errors[0].message }],
    }
  }

  if (response?.data?.appointmentsFirm) {
    actions.setIsLoading(false)
    const { appointmentsFirm } = data

    return {
      appointments: appointmentsFirm,
    }
  }
  actions.setIsLoading(false)

  return state
}

export default {
  GetProAppointments,
  GetFirmAppointments,
  setIsLoading,
}
