import { getState } from '..'
import userActions from '../User/actions'

import { State, ActionParams } from './types'

const setLanguage = async (
  payload: { language: string },
  context: { state: State; actions: getConsumerActionsType<Actions<State, ActionParams>> },
): Promise<Partial<State>> => {
  const { language } = payload
  const { state } = context

  if (language !== state.language) {
    const cachedState = localStorage['__LOCALE_MODEL__']
    const userState = getState('User')

    if (userState?.session?.decodedToken) {
      const { userId } = userState?.session?.decodedToken
      await userActions.setProfileLanguage({ userId, langId: language }, { state: userState })
    }

    if (cachedState) {
      const { Locale } = JSON.parse(cachedState)

      Locale.language = language
    }

    return {
      language,
    }
  }

  return state
}

export default { setLanguage }
