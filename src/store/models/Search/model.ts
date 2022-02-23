import { Model } from 'react-model'

import { ActionParams, State } from './types'
import initialState from './state'
import Actions from './actions'
// import Effects from './effects'

const { searchPro, maxPrice, currentPro, availabilities } = Actions
// const { getTranslations } = Effects

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    searchPro,
    maxPrice,
    currentPro,
    availabilities,
    //LocationInfo
  },
}

export default Model(model)
