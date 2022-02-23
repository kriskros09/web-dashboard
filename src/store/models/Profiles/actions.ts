import globalActions from '../Global/actions'
import graphql from '../../../services/graphql'

import { State, ActionParams } from './types'
import {
  ProfileFormUser,
  ProfileFormPro,
  ProfileFormFirm,
  ProfileFormAddress,
  Licence,
} from './types'
import GraphQL from './graphql'

const END_POINT = 'profiles'
const { queries, mutations } = GraphQL

const setIsLoading = (isLoading: boolean): Partial<State> => {
  return {
    isLoading,
  }
}

const UserProfileInfo = async (
  payload: { userId: string },
  context: { state: State; actions: ActionParams | any },
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_USER_PROFILE, payload)

  const { data, errors } = response

  if (response?.errors) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile', message: errors[0].message }],
    }
  }

  if (response?.data?.profile) {
    actions.setIsLoading(false)

    const { profile } = data

    // // mapp useSame to boolean
    // const mappedUser = Object.keys(profile).reduce((update) => {
    //   if (update?.addresses?.[0] && typeof update?.addresses?.[0]?.useSame !== 'boolean') {
    //     update.addresses[0].useSame = Boolean(update?.addresses?.[0]?.useSame)
    //   }

    //   return update
    // }, profile)

    return {
      user: { ...profile },
    }
  }

  actions.setIsLoading(false)

  return state
}

const ProProfileInfo = async (
  payload: { proId: string },
  context: { state: State; actions: ActionParams | any },
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_PRO_PROFILE, payload)

  const { data, errors } = response

  if (response?.errors) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile pro', message: errors[0].message }],
    }
  }

  if (response?.data?.professional) {
    actions.setIsLoading(false)

    const { professional } = data

    return {
      pro: { ...professional },
    }
  }
  actions.setIsLoading(false)

  return state
}

const FirmProfileInfo = async (
  payload: { firmId: string },
  context: { state: State; actions: ActionParams | any },
): Promise<Partial<State>> => {
  const { state, actions } = context
  actions.setIsLoading(true)

  const response = await graphql.executeOparation(END_POINT, queries.GET_FIRM_PROFILE, payload)

  const { data, errors } = response

  if (response?.errors) {
    actions.setIsLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile pro', message: errors[0].message }],
    }
  }

  if (response?.data?.firm) {
    actions.setIsLoading(false)

    const { firm } = data

    return {
      firm: {
        ...firm,
      },
    }
  }
  actions.setIsLoading(false)

  return state
}

const UserProfileForm = async (
  payload: { userId: string; profileInput: ProfileFormUser },
  context,
): Promise<Partial<State>> => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.USER_INFO, payload)
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile form', message: errors[0].message }],
    }
  }

  if (response?.data?.updateProfile) {
    const { updateProfile } = data
    const { user } = state

    return {
      user: {
        ...user,
        ...updateProfile,
      },
    }
  }

  return state
}

const ProProfileForm = async (
  payload: { proId: string; professionalInput: ProfileFormPro },
  context,
): Promise<Partial<State>> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, actions } = context

  const response = await graphql.executeOparation(END_POINT, mutations.PRO_INFO, payload)
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile form', message: errors[0].message }],
    }
  }

  if (response?.data?.updateProfessional) {
    const { updateProfessional } = data
    const { pro } = state

    return {
      pro: {
        ...updateProfessional,
        ...pro,
      },
    }
  }

  return state
}

const FirmProfileForm = async (
  payload: { firmId: string; firmInput: ProfileFormFirm },
  context,
): Promise<Partial<State>> => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.FIRM_INFO, payload)
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile form', message: errors[0].message }],
    }
  }

  if (response?.data?.updateFirm) {
    const { updateFirm } = data
    const { firm } = state

    return {
      firm: {
        ...firm,
        ...updateFirm,
      },
    }
  }

  return state
}

const ProfileAddressUpdate = async (
  payload: { addressId: string; addressInput: ProfileFormAddress },
  context,
): Promise<Partial<State>> => {
  const { state } = context
  const response = await graphql.executeOparation(END_POINT, mutations.ADRESS_UPDATE, payload)
  const { data, errors } = response
  console.log('PAYLOAD UPDATE', payload)

  if (response?.errors) {
    return {
      errors: [...state.errors, { view: 'profile adresse update', message: errors[0].message }],
    }
  }

  if (response?.data?.updateAddress) {
    console.log(data)

    return data
  }

  return state
}

const ProfileAddressCreation = async (
  payload: { addressInput: ProfileFormAddress },
  context,
): Promise<Partial<State>> => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.ADRESS_CREATION, payload)
  // console.log('CREATION REPSONSE', response)
  const { data, errors } = response

  if (response?.errors) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile adresse creation', message: errors[0].message }],
    }
  }

  if (response?.data?.createAddress) {
    return data
  }

  return state
}

const ProfileDeleteAddress = async (
  payload: { addressId: string },
  context,
): Promise<Partial<State>> => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.DELETE_ADRESS, payload)
  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile adresse', message: errors[0].message }],
    }
  }

  if (response?.data?.deleteAddress) {
    return data
  }

  return state
}

const ProLicenceCreation = async (
  payload: { licenceInput: Licence },
  context,
): Promise<Partial<State>> => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.LICENCE_CREATION, payload)

  const { data, errors } = response

  if (response?.errors) {
    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile licence delete', message: errors[0].message }],
    }
  }

  if (response?.data?.createLicence) {
    return data
  }

  return state
}

const ProLicenceUpdate = async (
  payload: { licId: string; licenceInput: Licence },
  context,
): Promise<Partial<State>> => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, mutations.LICENCE_UPDATE, payload)
  const { data, errors } = response

  if (response?.errors) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'profile licence', message: errors[0].message }],
    }
  }

  if (response?.data?.updateLicence) {
    return data
  }

  return state
}

export default {
  UserProfileInfo,
  ProProfileInfo,
  FirmProfileInfo,
  UserProfileForm,
  ProProfileForm,
  FirmProfileForm,
  ProfileAddressUpdate,
  ProfileAddressCreation,
  ProfileDeleteAddress,
  ProLicenceCreation,
  ProLicenceUpdate,
  setIsLoading,
}
