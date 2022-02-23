import jwt_decode from 'jwt-decode'

import { getState } from '../index'
import globalActions from '../Global/actions'
import graphql from '../../../services/graphql'

import { SignUpForm, Loginform, SignUpType, State } from './types'
import GraphQL from './graphql'

const END_POINT = 'users'
const signUpTypes = ['client', 'firm', 'lawyer']

const { queries, mutations } = GraphQL

const signUp = async (payload: { data: SignUpForm; type: SignUpType }, context) => {
  globalActions.setLoading(true)
  const { data, type } = payload
  const { state } = context
  const isTypeOfSignUp = signUpTypes.includes(type)
  const langId = getState('Locale').language
  const availableMutations = {
    client: mutations.SIGNUP_USER,
    firm: mutations.SIGNUP_FIRM,
    lawyer: mutations.SIGNUP_PROFESSIONAL,
  }

  if (isTypeOfSignUp) {
    const signUpInput = Object.entries(data).reduce(
      (formData, [key, value]) => {
        if (['confirm-password', 'user-agreement', 'lawyer-type'].includes(key)) return formData

        let fieldName = key

        if (key.includes('-')) {
          fieldName = fieldName.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('-', '').replace('_', ''),
          )
        }
        formData[fieldName] = value

        return formData
      },
      { langId },
    )
    console.log('signUpInput', signUpInput)
    const mutataion = availableMutations[type]
    const variables = { signUpInput }
    const response = await graphql.executeOparation(END_POINT, mutataion, variables)
    const hasServerError = response?.statusCode && response?.statusCode !== 200

    if (response?.errors || hasServerError) {
      globalActions.setLoading(false)
      const currentErrors = state.errors
      const newSignUpError = !hasServerError
        ? response?.errors[0]
        : response?.result?.errors[0] || new Error('An error has ocurred')
      const signUpError = currentErrors.find((error) => error.view === 'signup')

      if (signUpError && signUpError.message !== newSignUpError.message) {
        signUpError.message = newSignUpError.message
        const idx = currentErrors.findIndex(signUpError)
        currentErrors.splice(idx, 0, signUpError)

        return {
          errors: currentErrors,
        }
      } else if (signUpError && signUpError.message === newSignUpError.message) {
        return {
          errors: currentErrors,
        }
      }

      return {
        errors: [...state.errors, { view: 'signup', message: newSignUpError.message }],
      }
    }

    // client
    if (response?.data?.signUpUser) {
      globalActions.setLoading(false)

      return {
        errors: state.errors.filter((error) => error.view !== 'signup'),
        ...response.data.signUpUser,
      }
    }

    // lawyer
    if (response?.data?.signUpProfessional) {
      globalActions.setLoading(false)

      return {
        errors: state.errors.filter((error) => error.view !== 'signup'),
        ...response.data.signUpProfessional,
      }
    }

    // firm
    if (response?.data?.signUpFirm) {
      globalActions.setLoading(false)

      return {
        errors: state.errors.filter((error) => error.view !== 'signup'),
        ...response.data.signUpFirm,
      }
    }
  }

  globalActions.setLoading(false)

  return state
}

const Upgrade = async (
  payload: { userId: string; data: SignUpForm; type: SignUpType },
  context,
) => {
  globalActions.setLoading(true)
  const { data, type, userId } = payload
  const { state } = context
  const isTypeOfSignUp = signUpTypes.includes(type)
  const langId = getState('Locale').language
  const availableMutations = {
    firm: mutations.UPGRADE_TO_FIRM,
    lawyer: mutations.UPGRADE_TO_PROFESSIONAL,
  }

  if (isTypeOfSignUp) {
    const upgradeInput = Object.entries(data).reduce(
      (formData, [key, value]) => {
        if (
          [
            'confirm-password',
            'user-agreement',
            'lawyer-type',
            'first-name',
            'last-name',
            'lastName',
            'firstName',
            'password',
          ].includes(key)
        )
          return formData

        let fieldName = key

        if (key.includes('-')) {
          fieldName = fieldName.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('-', '').replace('_', ''),
          )
        }
        formData[fieldName] = value

        return formData
      },
      { langId },
    )
    console.log('signUpInput', upgradeInput)
    const mutataion = availableMutations[type]
    const variables = { userId, upgradeInput }
    const response = await graphql.executeOparation(END_POINT, mutataion, variables)
    const hasServerError = response?.statusCode && response?.statusCode !== 200

    if (response?.errors || hasServerError) {
      globalActions.setLoading(false)
      const currentErrors = state.errors
      const newSignUpError = !hasServerError
        ? response?.errors[0]
        : response?.result?.errors[0] || new Error('An error has ocurred')
      const signUpError = currentErrors.find((error) => error.view === 'overlay pro')

      if (signUpError && signUpError.message !== newSignUpError.message) {
        signUpError.message = newSignUpError.message
        const idx = currentErrors.findIndex(signUpError)
        currentErrors.splice(idx, 0, signUpError)

        return {
          errors: currentErrors,
        }
      } else if (signUpError && signUpError.message === newSignUpError.message) {
        return {
          errors: currentErrors,
        }
      }

      return {
        errors: [...state.errors, { view: 'overlay pro', message: newSignUpError.message }],
      }
    }

    // lawyer
    if (response?.data?.upgradeUserToProfessional) {
      globalActions.setLoading(false)

      return {
        errors: state.errors.filter((error) => error.view !== 'signup'),
        ...response.data.upgradeUserToProfessional,
      }
    }

    // firm
    if (response?.data?.upgradeUserToFirm) {
      globalActions.setLoading(false)

      return {
        errors: state.errors.filter((error) => error.view !== 'signup'),
        ...response.data.upgradeUserToFirm,
      }
    }
  }

  globalActions.setLoading(false)

  return state
}

const loginUser = async (payload: Loginform, { state, actions }) => {
  actions.resetErrors('login')

  const response = await graphql.executeOparation(END_POINT, queries.LOGIN_USER, payload)

  if (response?.statusCode && response?.statusCode !== 200) {
    globalActions.setLoading(false)
    const { errors } = response.result

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'login', message: errors[0].message }],
    }
  }

  if (response?.data?.login) {
    const { token, tokenExpiration, userId } = response.data.login
    const decodedToken: any = jwt_decode(token)
    const { profilePicture, professionalPicture, proId, firmId, firstName, lastName } = decodedToken
    console.log('IMAGE', professionalPicture)
    const session = {
      token,
      decodedToken,
      tokenExpiration,
    }

    return {
      userId,
      proId,
      firmId,
      firstName,
      lastName,
      profilePicture,
      professionalPicture,
      session,
    }
  }

  return state
}

const logOutUser = async (payload: { userId: string }, { state }) => {
  localStorage.removeItem('__USER_MODEL__')
  await graphql.executeOparation(END_POINT, queries.LOGOUT_USER, payload)

  return {
    ...state,
    userId: '',
    proId: '',
    firmId: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    professionalPicture: '',
    session: null,
  }
}

const resetErrors = (view: string, { state }) => ({
  errors: state.errors.filter((error) => error.view !== view),
})

const verifyEmail = async (payload: { email: string }, { state }) => {
  const response = await graphql.executeOparation(END_POINT, queries.VERIFY_EMAIL, payload)

  if (response?.errors) {
    return {
      errors: [
        ...state.errors,
        { view: 'signup', field: 'email', message: response.errors[0].message },
      ],
    }
  }

  if (response?.data?.validateEmail?.email) {
    const hasEmailFieldError = state.errors.find(
      (error) => error.view === 'signup' && error.field === 'email',
    )

    if (hasEmailFieldError) {
      return {
        errors: state.errors.filter((error) => error.view !== 'signup' && error.field === 'email'),
      }
    }

    return state
  }

  return state
}

const autoLogin = (payload: {
  token: string
  tokenExpiration: number
  userId: string
}): Partial<State> => {
  const { token, tokenExpiration, userId } = payload
  const decodedToken: any = jwt_decode(token)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profilePicture, professionalPicture, proId, firmId, firstName, lastName } = decodedToken

  const session = {
    token,
    decodedToken,
    tokenExpiration,
  }

  return {
    userId,
    proId,
    firmId,
    firstName,
    lastName,
    session,
    profilePicture,
    professionalPicture,
  }
}

const setProfileLanguage = async (
  payload: { userId: string; langId: string },
  { state }: { state: State },
): Promise<Partial<State>> => {
  const { userId } = payload
  const response = await graphql.executeOparation(
    END_POINT,
    mutations.SET_PROFILE_LANGAUGE,
    payload,
  )

  if (response?.data?.langId && state?.session?.decodedToken?.userId === userId) {
    return {
      session: {
        ...sessionStorage.decodedToken,
        langId: response.data.langId,
      },
    }
  }

  return state
}

const requestPasswordReset = async (
  payload: { email: string },
  { state }: { state: State },
): Promise<Partial<State>> => {
  const { data, errors } = await graphql.executeOparation(
    END_POINT,
    mutations.REQUEST_PASSWORD_RESET,
    payload,
  )

  if (errors) {
    return {
      errors: [
        ...state.errors,
        { view: 'password-reset', field: 'email', message: errors[0].message },
      ],
    }
  }

  if (data?.resetPasswordRequest?.sent) {
    // nothing to see here... but this returns {sent: true}
    return {
      errors: state.errors.filter(
        (error) => error.view !== 'password-reset' && error.field === 'email',
      ),
    }
  }

  return state
}

const updatePassword = async (
  payload: { userId: string; password: string; confirmPassword: string },
  { state }: { state: State },
): Promise<Partial<State>> => {
  const response = await graphql.executeOparation(END_POINT, mutations.UPDATE_PASSWORD, payload)
  const hasServerError = response?.statusCode && response?.statusCode !== 200

  if (response?.errors || hasServerError) {
    const message = hasServerError
      ? response?.result?.errors[0].message
      : response.errors[0].message

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'password-reset', message }],
    }
  }

  if (response?.data?.changePassword?.userId) {
    return {
      userId: response.data.changePassword.userId,
    }
  }

  return state
}

export default {
  signUp,
  Upgrade,
  loginUser,
  resetErrors,
  logOutUser,
  verifyEmail,
  autoLogin,
  setProfileLanguage,
  requestPasswordReset,
  updatePassword,
}
