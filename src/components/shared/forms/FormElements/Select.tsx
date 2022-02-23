import React, { FC, CSSProperties, ReactElement } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
// import AsyncSelect from 'react-select';

import { SystemIconMap, ArrowRight } from '../../Icons'

type SelectType = {
  // Select is searchable
  searchable?: boolean
  // Select has a default value selected
  defaultSelected?: any
  value?: any
  // Select input placeholder
  placeholder: string

  options?: Array<{ value: any; label: any }>

  // Optionnal, define icon to diplay in the input
  icon?: string

  //Optionnal, define dropdown icon
  dropdown?: boolean

  //Optionnal, define style
  outline?: boolean

  shadow?: boolean
  name?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  error?: any
}

const DropdownIndicator = (props: any) => {
  const { innerProps } = props

  return (
    <div {...innerProps} className="CustomDropdown">
      <ArrowRight fillColour="primary" size={20} />
    </div>
  )
}

export const SelectComponent: FC<SelectType> = ({
  icon = '',
  placeholder = 'Choose option',
  value,
  outline,
  dropdown,
  shadow,
  searchable,
  onChange,
  options = [],
  name,
  error,
  onBlur,
}) => {
  const customStyles = {
    selectContainer: (provided: CSSProperties, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? 'var(--color-primary-light)' : '#BBBBBB',
      outline: state.isFocused ? 'none' : 'none',
    }),

    control: (provided: CSSProperties, state: any) => ({
      ...provided,
      borderWidth: outline ? '1px' : 0,
      borderColor: '#BBBBBB',
      padding: icon ? '0.875rem 0.5rem 0.875rem 3rem' : '0.815rem 0.5rem 0.815rem 1.1875rem',
      cursor: 'pointer',
      outline: state.isHover ? 'none' : 'none',
    }),

    valueContainer: (provided: CSSProperties) => ({
      ...provided,
      padding: 0,
      lineHeight: '1.125rem',
      fontSize: '0.875rem',
      fontWeight: 500,
    }),
    input: (provided: CSSProperties) => ({
      ...provided,
      lineHeight: '1.125rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      padding: 0,
      margin: 0,
    }),
    placeholder: (provided: CSSProperties) => ({
      ...provided,
      color: '#BBBBBB',
      fontWeight: 500,
    }),

    clearIndicator: (provided: CSSProperties) => ({
      ...provided,
      padding: 0,
      width: '20px',
      color: '#EEEEEE',
    }),
    menu: (provided: CSSProperties) => ({
      ...provided,
      backgroundColor: '#ffffff',
      marginBottom: 0,
      marginTop: '-2px',
      borderRadius: '0 0 4px 4px',
      border: 0,
      padding: '0.875rem 0 0.875rem 1.1875rem',
      boxShadow: 'inset 0px 3px 6px #00000029',
    }),
    option: (provided: CSSProperties, state: any) => ({
      ...provided,
      lineHeight: '1.125rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: state.isFocused ? 'var(--color-primary-dark)' : 'var(--color-primary)',
      backgroundColor: 'unset',
    }),

    singleValue: (provided: CSSProperties) => ({
      ...provided,
      color: 'var(--color-primary-dark)',
    }),
  }

  const iconKey = { icon }.icon
  const Icon = SystemIconMap[`${iconKey}`]

  return (
    <div className="select-wrapper relative">
      <Select
        className={`select-container ${dropdown ? 'dropdown-icon' : ''} ${
          outline ? 'style-outlined' : ''
        } ${shadow ? 'style-shadow' : ''}`}
        classNamePrefix="select"
        components={{ DropdownIndicator, IndicatorSeparator: () => null }}
        isClearable={searchable}
        isSearchable={searchable}
        name={name}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {icon ? (
        <span className="absolute top-1/2 transform -translate-y-1/2 left-0 px-2">
          <Icon fillColour="primary" size={32} />
        </span>
      ) : null}
      {error && <small className="text-error">{error}</small>}
    </div>
  )
}

export const SimpleSelect = () => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            aria-expanded="true"
            aria-haspopup="true"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            id="options-menu"
            type="button"
          >
            Options
            {/* <!-- Heroicon name: chevron-down --> */}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                fill-rule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      {/* <!--
    Dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
        <div className="rounded-md bg-white shadow-xs">
          <div
            aria-labelledby="options-menu"
            aria-orientation="vertical"
            className="py-1"
            role="menu"
          >
            <a
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              href="#"
              role="menuitem"
            >
              Account settings
            </a>
            <a
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              href="#"
              role="menuitem"
            >
              Support
            </a>
            <a
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              href="#"
              role="menuitem"
            >
              License
            </a>
            <form action="#" method="POST">
              <button
                className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LanguageSelect = (props: {
  options: Array<{ value: string; label: string }>
  selected: string | undefined
  onSelection: (string) => void
}): ReactElement<'div'> => {
  const { options, selected, onSelection } = props
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="ml-3 relative">
      <button
        aria-haspopup="true"
        aria-label="Language options"
        className="flex text-sm border-transparent rounded-full focus:outline-none transition duration-150 ease-in-out"
        id="language-options"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs font-semibold text-primary-middle hover:text-primary-light uppercase md:ml-5 ">
          {selected}
        </span>
      </button>
      <SelectOptions
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
        open={isOpen}
      >
        <div
          aria-labelledby="user-menu"
          aria-orientation="vertical"
          className="py-1 rounded-md bg-white shadow-xs"
          role="menu"
        >
          <div
            aria-labelledby="options-menu"
            aria-orientation="vertical"
            className="py-1"
            role="menu"
          >
            {options.map((option) => {
              return (
                <button
                  key={option.label}
                  className="block text-primary-dark font-bold px-4 py-2 w-full text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false)
                    onSelection(option.value)
                  }}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      </SelectOptions>
    </div>
  )
}

const SelectOptions = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  transition: ease-in 0.75s, ease-out 0.1s;
  transform: opacity 0 scale 95, opacity 100 sclae 100;
`
