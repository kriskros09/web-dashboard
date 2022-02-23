import { actionMiddlewares, Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'
import { persistMiddleware } from './middleware'
// import Effects from './effects'

const {
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
} = Actions

const persistedState = localStorage.getItem('__USER_MODEL__')
const seedState = JSON.parse(persistedState || '{}')?.User || {}
const model: ModelType<State, ActionParams> = {
  state: { ...initialState, ...seedState },
  actions: {
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
  },
  middlewares: [...actionMiddlewares, persistMiddleware],
}

export default Model(model)
