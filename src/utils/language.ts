const SUPPORTED_LANGUAGES = ['en-CA', 'fr-CA']
const DEFAULT_LANGUAGE = 'fr-CA'
const detectBrowserLanguage = (): string => {
  const language = window?.navigator?.language

  if (language && SUPPORTED_LANGUAGES.includes(language)) {
    return language
  }

  return DEFAULT_LANGUAGE
}

export { detectBrowserLanguage }
