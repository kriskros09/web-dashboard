// eslint-disable-next-line @typescript-eslint/no-unused-vars
import graphql from '../../../services/graphql'

import GraphQL from './graphql'

const END_POINT = 'accounting'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries } = GraphQL

const FirmCharges = async (
  payload: {
    langId: string
    firmId: string
    orderBy: string
  },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_CHARGES, payload)

  const { data, errors } = response

  if (errors?.length) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'accounting firm', message: errors[0].message }],
    }
  }

  if (response?.data?.charges) {
    return data
  }

  return state
}

const Deposit = async (
  payload: {
    depId: string
  },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_DEPOSIT, payload)

  const { data, errors } = response

  if (errors?.length) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'Deposit', message: errors[0].message }],
    }
  }

  if (response?.data?.deposit) {
    return data
  }

  return state
}

const ProCharge = async (
  payload: {
    pcId: string
  },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_PRO_CHARGE, payload)

  const { data, errors } = response

  if (errors?.length) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'Prof charge', message: errors[0].message }],
    }
  }

  if (response?.data?.charge) {
    return data
  }

  return state
}

const Invoice = async (
  payload: {
    invId: string
  },
  context,
) => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, queries.GET_INVOICE, payload)

  const { data, errors } = response

  if (errors?.length) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'Invoice', message: errors[0].message }],
    }
  }

  if (response?.data?.invoice) {
    return data
  }

  return state
}

export default {
  FirmCharges,
  Deposit,
  ProCharge,
  Invoice,
}
