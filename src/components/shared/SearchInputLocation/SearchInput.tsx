import React from 'react'
import styled from 'styled-components'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

// Store
// import { Provider, connect } from 'react-model'
// import { StateType, ActionType } from '../model/home'

//Components
import { LocationPinIcon } from '../Icons'

// const mapProps = ({ light, counter, response }: StateType) => ({
//   lightStatus: light ? 'open' : 'close',
//   counter,
//   response,
// })

class SearchInput extends React.Component<
  {
    label: string
    defaultValue?: string
    onSelectLocation: React.ChangeEventHandler<HTMLInputElement> | any
  },
  any
> {
  constructor(props) {
    super(props)
    this.state = { address: this.props.defaultValue, placeId: '', suggestion: '' }
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address: string, placeId?: string, suggestion?: any) => {
    this.setState({ address, placeId, suggestion: suggestion.description })

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error))

    // console.log('in handle select', latLng)
  }

  componentDidUpdate() {
    this.props.onSelectLocation(this.state.suggestion)
  }

  searchOptions = {
    // location: new google.maps.LatLng(-34, 151),
    // radius: 2000,
    types: ['(cities)'],
    componentRestrictions: { country: ['ca'] },
  }

  render() {
    // const { state, actions } = this.props
    // console.log('the adress state', this.state.address)

    return (
      <PlacesAutocomplete
        googleCallbackName="init"
        searchOptions={this.searchOptions}
        shouldFetchSuggestions={this.state.address.length >= 2}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="input-wrapper relative ">
            <InputStyled
              {...getInputProps({
                placeholder: this.props.label,
                className:
                  'location-search-input input placeholder-gray-300 text-sm leading-2 font-medium w-full flex-grow-0',
                name: 'location',
              })}
            />

            <span className="absolute top-1/2 transform -translate-y-1/2 left-0 px-2">
              <LocationPinIcon fillColour="primary" size={32} />
            </span>
            <div
              className={`autocomplete-dropdown-container absolute bottom-0 transform translate-y-full left-0 w-full z-10 bg-gray-150 rounded-b ${
                suggestions.length !== 0 ? 'py-4' : ''
              }`}
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
        )}
      </PlacesAutocomplete>
    )
  }
}
const InputStyled = styled.input`
  &:focus {
    outline-color: var(--color-primary-light);
  }

  color: var(--color-primary-dark);
  background-color: 'white';
  padding: 0.875rem 1rem 0.875rem 3rem;
  border-radius: 0.25rem;

  &:disabled {
    background-color: #eaeaea;
    border: 0;
    color: #888888;
  }
`

export default SearchInput
