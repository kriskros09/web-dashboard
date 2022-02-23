import { actionMiddlewares, Model } from 'react-model'

import { ActionParams, State } from './types'
import initialState from './state'
import Actions from './actions'
import { persistMiddleware } from './middleware'

const {
  getOrderDetails,
  getMandateOrderDetails,
  placeOrder,
  setIsLoading,
  recordPayment,
  MandateAddress,
  ResetCheckoutState,
} = Actions

const persistedState = localStorage.getItem('__ORDER_MODEL__')
const seedState = JSON.parse(persistedState || '{}')?.Order || {}

const model: ModelType<State, ActionParams> = {
  state: { ...initialState, ...seedState },
  actions: {
    getOrderDetails,
    getMandateOrderDetails,
    placeOrder,
    setIsLoading,
    recordPayment,
    MandateAddress,
    ResetCheckoutState,
  },
  middlewares: [...actionMiddlewares, persistMiddleware],
}

export default Model(model)
