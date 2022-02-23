// import { ApolloClient, InMemoryCache, createHttpLink, RestLink } from '@apollo/client'
import { Model } from 'react-model'

import { StateType, ActionsParamsType } from './types'
import initialState from './state'
import Actions from './actions'

const { getGlobalContent, setLoading, getFirmsByEmail, getAllFirms, SubscribeNewsletter } = Actions

const model: ModelType<StateType, ActionsParamsType> = {
  state: initialState,
  actions: {
    getGlobalContent,
    setLoading,
    getFirmsByEmail,
    getAllFirms,
    SubscribeNewsletter,
  },
}

export default Model(model)
