import { Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'
// import Effects from './effects'

const { UserPurchases, TodoLists, MandateStatus, TaskStatus, setIsLoading, PurchaseOrder } = Actions
// const { getTranslations } = Effects

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    UserPurchases,
    TodoLists,
    MandateStatus,
    TaskStatus,
    PurchaseOrder,
    setIsLoading,
  },
}

export default Model(model)
