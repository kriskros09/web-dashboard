import React, { useState } from 'react'
import styled from 'styled-components'
import cx from 'classnames'

// Store
import { useStore } from '../../store/models'
//Components
import { SelectComponent } from '../shared/forms/FormElements/Select'
import { InputSubmit } from '../shared/forms/FormElements/Submit'
import SearchInput from '../../components/shared/SearchInput'

type ProSearchType = {
  inline?: boolean

  dark?: boolean

  getResults?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  coordinates?: any
  pageContent?: any
}

const ProSearch: React.FC<ProSearchType> = ({
  inline,
  dark,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getResults,
  pageContent,
  onSubmit,
  coordinates,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchState, searchActions] = useStore('Search')

  const [SelectedLocation, setSelectedLocation] = useState<string>('')
  const [SelectedLaw, setSelectedLaw] = useState<string>(searchState?.currentLawId)
  const [SelectedSector, setSelectedSector] = useState<string>(searchState?.currentSectId)
  const [SelectedServ, setSelectedServ] = useState<string>(searchState?.currentServId)
  const laws = globalState?.laws.map((law) => ({ value: law.lawId, label: law.texts[0].name }))
  const sublaws = globalState?.laws
    .filter((l) => l.lawId === SelectedLaw)
    .map((law) =>
      law.sectors.map((sublaw) => ({ value: sublaw.sectId, label: sublaw.texts[0].name })),
    )
    .flat()

  const Localisation = [
    searchState?.currentCity,
    searchState?.currentRegion,
    searchState?.currentCountry,
  ]
  let defaultLocalisationValue

  if (
    searchState?.currentCity === '' &&
    searchState?.currentRegion === '' &&
    searchState?.currentCountry === ''
  ) {
    defaultLocalisationValue = ''
  } else {
    defaultLocalisationValue = Localisation.join(', ')
  }

  const services = globalState?.services.map((service) => ({
    value: service.servId,
    label: service.texts[0].name,
  }))

  const Wrapperlass = cx('p-4 md:px-5 md:py-6', {
    'bg-primary-dark': dark,
    'bg-primary': !dark,
    rounded: !inline,
  })

  const ButtonClass = cx('text-white', {
    'bg-primary hover:bg-white hover:text-primary': dark,
    'bg-primary-dark hover:bg-white hover:text-primary-dark': !dark,
    'mt-4 self-center': !inline,
  })

  const FormDisplayClass = cx('flex flex-col', {
    'container xl:flex-row lg:items-center': inline,
  })

  console.log('LAW', SelectedLaw)
  console.log('SECTOR', SelectedSector)
  console.log('SERVICE', SelectedServ)

  return (
    <div className={Wrapperlass}>
      <FormStyled inline={inline} onSubmit={onSubmit}>
        <div className={FormDisplayClass}>
          {/* <InputComponent
            icon="location"
            id="location"
            label={pageContent?.form?.city_input}
            name="location"
            placeholder={pageContent?.form?.city_input}
            type="text"
            solid
            onChange={(e) => setSelectedLocation(e ? e.currentTarget.value : '')}
          /> */}
          <SearchInput
            coordinates={coordinates}
            defaultValue={defaultLocalisationValue}
            label={pageContent?.form?.city_input}
            onSelectLocation={setSelectedLocation}
          />
          <SelectComponent
            icon="law"
            name="law"
            options={laws}
            placeholder={pageContent?.form?.law_input}
            value={laws.find((option) => option.value === SelectedLaw)}
            searchable
            onChange={(e) => {
              setSelectedLaw(e ? e.value : '')
            }}
          />
          <SelectComponent
            icon="book"
            name="sector"
            options={sublaws}
            placeholder={pageContent?.form?.sector_input}
            value={sublaws.find((option) => option.value === SelectedSector)}
            searchable
            onChange={(e) => setSelectedSector(e ? e.value : '')}
          />
          <SelectComponent
            icon="bubble"
            name="service"
            options={services}
            placeholder={pageContent?.form?.service_input}
            value={services.find((option) => option.value === SelectedServ)}
            searchable
            onChange={(e) => setSelectedServ(e ? e.value : '')}
          />
          <InputSubmit
            className={ButtonClass}
            disabled={
              (!SelectedLocation || !SelectedLaw || !SelectedSector || !SelectedServ) &&
              (!searchState?.currentLawId ||
                !searchState?.currentSectId ||
                !searchState?.currentServId)
                ? true
                : false
            }
            value={pageContent?.form?.btn_text}
          />
        </div>
      </FormStyled>
    </div>
  )
}

export default ProSearch

const FormStyled = styled.form.attrs(() => ({
  action: 'GET',
}))<{ inline?: boolean }>`
  & .input-wrapper,
  .select-wrapper {
    width: 100%;
    margin-bottom: 0.5rem;
    margin-right: ${(props) => (props.inline ? '1.25rem' : null)};

    @media (min-width: 768px) {
      min-width: ${(props) => (props.inline ? '240px' : null)};
    }

    @media (min-width: 1280px) {
      margin-bottom: ${(props) => (!props.inline ? '0.5rem' : '0')};
    }
  }

  .input-wrapper + .select-wrapper {
    margin-top: 0;
  }

  & .btn {
    margin-top: 0;
  }
`
