import { actionMiddlewares, Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'
import { persistMiddleware } from './middleware'

const { setLanguage } = Actions

const persistedState = localStorage.getItem('__LOCALE_MODEL__')
const seedState = JSON.parse(persistedState || '{}')?.Locale || {}

const model: ModelType<State, ActionParams> = {
  state: { ...initialState, ...seedState },
  actions: {
    setLanguage,
  },
  middlewares: [...actionMiddlewares, persistMiddleware],
}

export default Model(model)
