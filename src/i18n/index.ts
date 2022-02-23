import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from 'i18next'
import intervalPlural from 'i18next-intervalplural-postprocessor'

// Store
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getState, useStore } from '../store/models'

import { en } from './locales/en-CA'
import { fr } from './locales/fr-CA'

export const LANGUAGES = {
  FR: 'fr-CA',
  EN: 'en-CA',
}

// const lngDetector = new LanguageDetector()
// lngDetector.addDetector({
//   name: 'customDetector',
//   lookup(options) {
//     const [localeState,] = useStore('Locale')
//     // options -> are passed in options
//     return 'en';
//   },
// })

i18next
  .use(LanguageDetector)
  .use(intervalPlural)
  .use(initReactI18next)
  .init({
    detection: {
      lookupCookie: 'i18next',
    },
    fallbackLng: LANGUAGES.EN,
    resources: {
      en,
      fr,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18next
