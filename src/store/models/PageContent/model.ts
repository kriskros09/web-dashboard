import { Model } from 'react-model'

import { State, ActionParams } from './types'
import initialState from './state'
import Actions from './actions'
// import Effects from './effects'

const { PageContent, FaqContent, LegalTextsContent } = Actions
// const { getTranslations } = Effects

const model: ModelType<State, ActionParams> = {
  state: initialState,
  actions: {
    PageContent,
    FaqContent,
    LegalTextsContent,
  },
}

export default Model(model)
