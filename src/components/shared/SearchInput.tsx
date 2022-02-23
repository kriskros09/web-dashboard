import React, { ReactElement } from 'react'
import styled from 'styled-components'
import cx from 'classnames'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { LocationPinIcon } from '../shared/Icons'

const searchOptions = {
  // location: new google.maps.LatLng(-34, 151),
  // radius: 2000,
  types: ['(cities)'],
  componentRestrictions: { country: ['ca'] },
}

export type SearchInputParamsType = {
  label: string
  defaultValue?: string
  onSelectLocation: any // TODO: properly ype this
  coordinates: any // TODO: properly ype this
}

const SearchInput: React.FC<SearchInputParamsType> = (props): ReactElement | null => {
  const { onSelectLocation, defaultValue, label, coordinates } = props
  const [address, setAddress] = React.useState<string | undefined>(defaultValue)

  if (!window?.google?.maps) return null

  const handleChange = (address) => {
    setAddress(address)
  }

  const handleSelection = (selection) => {
    setAddress(selection)
    onSelectLocation(selection)
    geocodeByAddress(selection)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => coordinates(latLng))
      .catch((error) => console.error('Error', error))
  }

  return (
    <PlacesAutocomplete
      searchOptions={searchOptions}
      value={address}
      onChange={handleChange}
      onSelect={(selection) => handleSelection(selection)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div className="input-wrapper relative">
            <InputStyled>
              <input
                {...getInputProps({
                  placeholder: label,
                  className:
                    'location-search-input input placeholder-gray-300 text-sm leading-2 font-medium w-full flex-grow-0',
                  name: 'location',
                })}
              />
            </InputStyled>
            <span className="absolute top-1/2 transform -translate-y-1/2 left-0 px-2">
              <LocationPinIcon fillColour="primary" size={32} />
            </span>
            <div
              className={cx(
                'autocomplete-dropdown-container absolute bottom-0 transform translate-y-full left-0 w-full z-10 bg-white rounded-b',
                {
                  'py-4': suggestions.length !== 0,
                },
              )}
            >
              {loading && (
                <div className="px-5 text-sm font-medium color-primary-dark">Loading...</div>
              )}
              {suggestions.map((suggestion) => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                // inline style for demonstration purpose
                const style = {
                  cursor: 'pointer',
                  color: suggestion.active ? 'var(--color-primary-dark)' : 'var(--color-primary)',
                  padding: '0.4rem 1.1875rem',
                  lineHeight: '1.125rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </PlacesAutocomplete>
  )
}

const InputStyled = styled.div`
  & > input {
    color: var(--color-primary-dark);
    background-color: 'white';
    padding: 0.875rem 1rem 0.875rem 3rem;
    border-radius: 0.25rem;
  }
  & > input:focus {
    outline-color: var(--color-primary-light);
  }

  & > input:disabled {
    background-color: #eaeaea;
    border: 0;
    color: #888888;
  }
`

export default SearchInput
