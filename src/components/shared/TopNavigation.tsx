import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Store
import { useStore } from '../../store/models'
import { LanguageSelect } from '../shared/forms/FormElements/Select'

type topNavContent = {
  pageContent?: any
}

export const TopNavigation: React.FC<topNavContent> = ({ pageContent }) => {
  const [globalState] = useStore('Global')
  const [localeState, localeActions] = useStore('Locale')
  const { i18n } = useTranslation()

  const languageOptions = React.useMemo(
    () =>
      globalState.languages
        .filter((lang) => lang.languageId !== 'es-ES')
        .map((language) => ({
          value: language.languageId,
          label: language.texts[0].name,
        })),
    [globalState.languages],
  )

  const handleSelection = (option) => {
    localeActions.setLanguage({ language: option })
    i18n.changeLanguage(option)
  }

  return (
    <div className="w-full bg-primary-dark py-3">
      <div className="w-full container flex flex-wrap justify-center md:justify-end">
        <div className="hidden md:block">
          <LanguageSelect
            options={languageOptions}
            selected={
              languageOptions.find((language) => language.value === localeState.language)?.label
            }
            onSelection={handleSelection}
          />
        </div>
        <Link
          className="text-xs font-semibold text-primary-middle hover:text-primary-light uppercase md:ml-5 "
          to="/how-it-works"
        >
          {pageContent?.top_bar.link_text}
        </Link>
      </div>
    </div>
  )
}
