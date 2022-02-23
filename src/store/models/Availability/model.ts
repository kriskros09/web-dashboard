import { Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'
// import Effects from './effects'

const {
  getAvailabilities,
  getDaysOff,
  RemoveAvailability,
  RemoveDaysOff,
  setIsLoading,
  UpdateAvailability,
  CreateAvailability,
  CreateDaysOff,
  UpdateAvailabilityStatus,
  UpdateDaysOff,
} = Actions
// const { getTranslations } = Effects

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    getAvailabilities,
    getDaysOff,
    RemoveAvailability,
    RemoveDaysOff,
    setIsLoading,
    UpdateAvailability,
    CreateAvailability,
    CreateDaysOff,
    UpdateAvailabilityStatus,
    UpdateDaysOff,
  },
}

export default Model(model)
