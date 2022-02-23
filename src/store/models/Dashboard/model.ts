import { Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'

const {
  GetProDashboard,
  GetFirmDashboard,
  setIsLoading,
  ProClientsData,
  ProRevenuData,
  FirmClientsData,
  FirmRevenuData,
  FirmProfessionalData,
} = Actions

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    GetProDashboard,
    GetFirmDashboard,
    setIsLoading,
    ProClientsData,
    ProRevenuData,
    FirmClientsData,
    FirmRevenuData,
    FirmProfessionalData,
  },
}

export default Model(model)
