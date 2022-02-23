import globalActions from '../Global/actions'
import graphql from '../../../services/graphql'

import {
  PriceInput,
  ProfessionalInput,
  FirmInviteInput,
  FirmRemoveInput,
  State,
  ActionParams,
} from './types'
import GraphQL from './graphql'

const END_POINT = 'profiles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries, mutations } = GraphQL

const setIsLoading = (isLoading: boolean): Partial<State> => {
  return {
    isLoading,
  }
}

const FirmEmployees = async (
  payload: {
    langId?: string
    status: number
    orderBy?: string
    firmId: string
    searchName?: string
  },
  context: { state: State; actions: ActionParams | any },
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_FIRM_EMPLOYEES, payload)
  const { data, errors } = response

  if (errors?.length) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'form employees', message: errors[0].message }],
    }
  }

  if (response?.data?.professionals) {
    actions.setIsLoading(false)
    const { professionals } = data
    // const { firmId } = data

    return {
      professionals,
      firmId: payload.firmId,
    }
  }

  actions.setIsLoading(false)

  return state
}

const InviteEmployee = async (payload: { firmInviteInput: FirmInviteInput }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.INVITE_EMPLOYEE, payload)

  console.log('INVITA RESPONSE', response)
  const { data } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [
        ...state.errors,
        { view: 'professional invite', message: response.errors[0].message },
      ],
    }
  }

  if (data) {
    return data
  }

  return state
}

const RemoveEmployee = async (payload: { firmRemoveInput: FirmRemoveInput }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.REMOVE_EMPLOYEE, payload)

  console.log('REMOVE RESPONSE', response)
  const { data } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [
        ...state.errors,
        { view: 'professional remove', message: response.errors[0].message },
      ],
    }
  }

  if (data) {
    return data
  }

  return state
}

const UpdateFirmEmployee = async (
  payload: { proId: string; professionalInput: ProfessionalInput },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(
    END_POINT,
    mutations.UPDATE_FIRM_EMPLOYEE,
    payload,
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [
        ...state.errors,
        { view: 'update firm employee profile', message: errors[0].message },
      ],
    }
  }

  if (data) {
    return data
  }

  return state
}

const getProprices = async (payload: { proId: string }, context) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_PRO_PRICE, payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'get prices', message: errors[0].message }],
    }
  }

  const { professional } = data

  return {
    professionals: [professional],
  }
}

const UpdatePrice = async (
  payload: { proId: string; sectId: string; lawId: string; priceInput: PriceInput },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, mutations.UPDATE_PRICE, payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'update price', message: errors[0].message }],
    }
  }

  return data
}

// const UpdateAllPrices = async (
//   payload: { proId: string; lawId: string; priceInput: PriceInput },
//   context,
// ) => {
//   const { state } = context
//   const response = await graphql.executeOparation(END_POINT, mutations.UPDATE_ALL_PRICES, payload)
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { data, errors } = response

//   if (errors?.length) {
//     globalActions.setLoading(false)

//     // Handle error via ui
//     return {
//       errors: [...state.errors, { view: 'profile', message: errors[0].message }],
//     }
//   }

//   return data
// }

const DeletePrice = async (payload: { proId: string; sectId: string }, context) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, mutations.DELETE_PRICE, payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'delete price', message: errors[0].message }],
    }
  }

  return data
}

export default {
  FirmEmployees,
  InviteEmployee,
  RemoveEmployee,
  UpdateFirmEmployee,
  getProprices,
  UpdatePrice,
  // UpdateAllPrices,
  DeletePrice,
  setIsLoading,
}
