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

const GetProDashboard = async (
  payload: {
    langId: string
    proId: string
    firmId: string
  },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_PRO_DASHBOARD, payload)

  const { data, errors } = response

  if (response?.errors) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'dashboard pro', message: errors[0].message }],
    }
  }

  if (response?.data?.dashboard_pro) {
    actions.setIsLoading(false)
    const { dashboard_pro } = data

    return {
      dashboard: dashboard_pro,
    }
  }
  actions.setIsLoading(false)

  return state
}

const GetFirmDashboard = async (
  payload: {
    langId: string
    firmId: string
  },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_FIRM_DASHBOARD, payload)
  const { data, errors } = response

  if (response?.errors) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'dashboard firm', message: errors[0].message }],
    }
  }

  if (response?.data?.dashboard_firm) {
    actions.setIsLoading(false)
    const { dashboard_firm } = data

    return {
      dashboard_firm,
    }
  }
  actions.setIsLoading(false)

  return state
}

const ProClientsData = async (
  payload: { proId: string; firmId: string; scope: number },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_PRO_CLIENT_DATA, payload)
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [
        ...state.errors,
        { view: 'pro client data on dashboard', message: errors[0].message },
      ],
    }
  }

  if (response?.data?.dashboard_clients_pro) {
    const { dashboard_clients_pro } = data

    return {
      dashboard_clients_pro,
    }
  }

  return state
}

const ProRevenuData = async (
  payload: { proId: string; firmId: string; scope: number; langId: string },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(
    'accounting',
    queries.GET_PRO_REVENU_DATA,
    payload,
  )

  const { data, errors } = response

  if (response?.errors) {
    return {
      errors: [...state.errors, { view: 'pro revenu data dashboard', message: errors[0].message }],
    }
  }

  if (response?.data?.dashboard_revenue_pro) {
    const { dashboard_revenue_pro } = data

    return {
      dashboard_revenue_pro,
    }
  }

  return state
}

const FirmClientsData = async (payload: { firmId: string; scope: number }, context) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_FIRM_CLIENT_DATA, payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [
        ...state.errors,
        { view: 'firm client data on dashboard', message: errors[0].message },
      ],
    }
  }

  if (response?.data?.dashboard_clients_firm) {
    const { dashboard_clients_firm } = data

    return {
      dashboard_clients_firm,
    }
  }

  return state
}

const FirmRevenuData = async (
  payload: { firmId: string; scope: number; langId: string },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(
    'accounting',
    queries.GET_FIRM_REVENU_DATA,
    payload,
  )

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [
        ...state.errors,
        { view: 'firm revenu data on dashboard', message: errors[0].message },
      ],
    }
  }

  if (response?.data?.dashboard_revenue_firm) {
    const { dashboard_revenue_firm } = data

    return {
      dashboard_revenue_firm,
    }
  }

  return state
}

const FirmProfessionalData = async (
  payload: { firmId: string; langId: string; searchName: string },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation('profiles', queries.GET_FIRM_PRO, payload)

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'firm dashboard profs list', message: errors[0].message }],
    }
  }

  if (response?.data?.dashboard_firm_professionals) {
    const { dashboard_firm_professionals } = data

    return {
      dashboard_firm_professionals,
    }
  }

  return state
}

export default {
  GetProDashboard,
  GetFirmDashboard,
  setIsLoading,
  ProClientsData,
  ProRevenuData,
  FirmClientsData,
  FirmRevenuData,
  FirmProfessionalData,
}
