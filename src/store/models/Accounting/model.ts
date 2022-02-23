import { Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'
// import Effects from './effects'

const { FirmCharges, Deposit, ProCharge, Invoice } = Actions
// const { getTranslations } = Effects

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    FirmCharges,
    Deposit,
    ProCharge,
    Invoice,
  },
}

export default Model(model)
