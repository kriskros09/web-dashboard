import { Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'
// import Effects from './effects'

const {
  FirmEmployees,
  InviteEmployee,
  RemoveEmployee,
  UpdateFirmEmployee,
  getProprices,
  UpdatePrice,
  DeletePrice,
  setIsLoading,
} = Actions
// const { getTranslations } = Effects

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    FirmEmployees,
    InviteEmployee,
    RemoveEmployee,
    UpdateFirmEmployee,
    getProprices,
    UpdatePrice,
    DeletePrice,
    setIsLoading,
  },
}

export default Model(model)
