import {} from 'react-model'
import graphql from '../../../services/graphql'

import GraphQL from './graphql'
import { ProfOrderInput, OrderInput, State, ActionParams } from './types'

const { queries, mutations } = GraphQL

const getOrderDetails = async (
  payload: { langId: string; profOrderInput: ProfOrderInput },
  context: { state: State; actions: ActionParams | any }, // TODO: properly type this
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation('profiles', queries.ORDER_DETAILS, payload)

  const { data, errors } = response

  if (errors?.length) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'order details', message: errors[0].message }],
    }
  }

  if (response?.data?.profOrderDetails) {
    actions.setIsLoading(false)
    const { profOrderDetails } = data

    return {
      order_details: profOrderDetails,
      order_details_by_codes: payload?.profOrderInput,
      mandId: '',
      taskId: '',
      paymentStatus: undefined,
    }
  }
  actions.setIsLoading(false)

  return state
}

const MandateAddress = async (
  payload: { mandId: string; userAddressId: string; modBy: string },
  context: { state: State; actions: ActionParams | any },
) => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation('mandates', mutations.MANDATE_ADDRESS, payload)

  const { data, errors } = response

  if (errors?.length) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'order mandate address', message: errors[0].message }],
    }
  }

  if (data) {
    actions.setIsLoading(false)

    return data
  }

  actions.setIsLoading(false)

  return state
}

const placeOrder = async (
  payload: { orderInput: OrderInput },
  context: { state: State; actions: ActionParams | any },
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation('mandates', mutations.PLACE_ORDER, payload)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'place order', message: errors[0].message }],
    }
  }

  if (data?.placeOrder) {
    actions.setIsLoading(false)

    return {
      ...data,
    }
  }

  actions.setIsLoading(false)

  return state
}

const ResetCheckoutState = () => {
  return {
    paymentStatus: 1,
    order_details: null,
    order_details_by_codes: null,
    mandId: '',
    taskId: '',
  }
}

const getMandateOrderDetails = async (
  payload: { langId: string; mandId: string; taskId: string },
  context: { state: State; actions: ActionParams | any },
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(
    'mandates',
    queries.MANDATE_ORDER_DETAILS,
    payload,
  )

  const { data, errors } = response

  if (errors?.length) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'mandate order details', message: errors[0].message }],
    }
  }

  if (response?.data?.mandateOrderDetails) {
    actions.setIsLoading(false)
    const { mandateOrderDetails } = data
    const { mandId, taskId } = payload

    return {
      order_details: mandateOrderDetails,
      mandId,
      taskId,
    }
  }
  actions.setIsLoading(false)

  return state
}

const setIsLoading = (isLoading: boolean): Partial<State> => {
  return {
    isLoading,
  }
}

const recordPayment = async (
  payload: { mandId: string; taskId: string; payMethod: string },
  context: { state: State; actions: ActionParams | any },
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)
  const response = await graphql.executeOparation('mandates', mutations.PAY_ORDER, payload)
  actions.setIsLoading(false)
  console.log('PAYLOAD========>', payload)
  const { data, errors } = response

  if (errors?.length) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'pay order', message: errors[0].message }],
    }
  }

  if (data?.payOrder?.paymentStatus) {
    localStorage.removeItem('__ORDER_MODEL__')

    actions.setIsLoading(false)

    const { payOrder } = data

    const {
      proId,
      firmId,
      firstName,
      lastName,
      photo,
      professions,
      selectedLaw,
      selectedSector,
      selectedService,
      date,
      time,
      price,
      custFeePrice,
      custSubTotal,
      taxes,
      proFeePrice,
      proSubTotal,
      custTotal,
      proTotal,
      custFeePercent,
      proFeePercent,
    } = payOrder

    return {
      paymentStatus: payOrder.paymentStatus,
      order_details: {
        proId,
        firmId,
        firstName,
        lastName,
        photo,
        professions,
        selectedLaw,
        selectedSector,
        selectedService,
        date,
        time,
        price,
        custFeePrice,
        custSubTotal,
        taxes,
        proFeePrice,
        proSubTotal,
        custTotal,
        proTotal,
        custFeePercent,
        proFeePercent,
      },
      order_details_by_codes: null,
      mandId: '',
      taskId: '',
    }
  }

  actions.setIsLoading(false)

  return state
}

export default {
  getOrderDetails,
  placeOrder,
  getMandateOrderDetails,
  setIsLoading,
  recordPayment,
  MandateAddress,
  ResetCheckoutState,
}
