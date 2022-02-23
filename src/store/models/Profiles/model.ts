import { Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'

// import Effects from './effects'

const {
  UserProfileInfo,
  ProProfileInfo,
  FirmProfileInfo,
  UserProfileForm,
  ProProfileForm,
  ProfileAddressUpdate,
  ProfileDeleteAddress,
  ProfileAddressCreation,
  ProLicenceCreation,
  ProLicenceUpdate,
  FirmProfileForm,
  setIsLoading,
} = Actions
// const { getTranslations } = Effects

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    UserProfileInfo,
    ProProfileInfo,
    FirmProfileInfo,
    UserProfileForm,
    ProProfileForm,
    FirmProfileForm,
    ProfileAddressUpdate,
    ProfileDeleteAddress,
    ProfileAddressCreation,
    ProLicenceCreation,
    ProLicenceUpdate,
    setIsLoading,
  },
}

export default Model(model)
