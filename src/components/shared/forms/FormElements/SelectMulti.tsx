import React, { FC, CSSProperties } from 'react'
import Select from 'react-select'

import { SystemIconMap, ArrowRight } from '../../Icons'
type SelectType = {
  // Select is searchable
  searchable?: boolean
  // Select has a default value selected
  defaultSelected?: string | any[]
  // Select input placeholder
  placeholder: string
  options: Array<{ value: any; label: string }>
  // Optionnal, define icon to diplay in the input
  icon?: string
  //Optionnal, define dropdown icon
  dropdown?: boolean
  //Optionnal, define style
  outline?: boolean
  shadow?: boolean
  values?: any
  value?: Array<any> // fix this. remove string
  onChange?: any
  name?: string
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
export const SelectMultiComponent: FC<SelectType> = ({
  icon = '',
  placeholder = 'Choose option',
  outline,
  dropdown,
  shadow,
  searchable,
  value = [],
  onChange,
  //defaultSelected = '',
  options,
  name,
  error,
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
      padding: icon ? '0.875rem 3rem 0.875rem 3rem' : '0.875rem 1.1875rem 0.875rem 1.1875rem',
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
        isMulti
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
