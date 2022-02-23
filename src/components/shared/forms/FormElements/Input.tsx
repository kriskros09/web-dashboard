import React from 'react'
import styled from 'styled-components'

import { SystemIconMap } from '../../Icons'
// import { findByLabelText } from '@testing-library/react'

type InputType = {
  // string for input type
  type?: string

  // string for placeholder
  placeholder: string

  //string for label
  label: string
  labelClass?: string
  value?: string | string[]
  //string for name
  name?: string

  //string for id
  id?: string

  // Optionnal, define icon to diplay in the input
  icon?: string

  // style
  solid?: boolean
  light?: boolean
  shadow?: boolean
  prependLabel?: boolean
  disabled?: boolean
  required?: boolean
  min?: string
  pattern?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.ChangeEventHandler<HTMLInputElement>
  error?: string | undefined
}

export const InputComponent: React.FC<InputType> = ({
  placeholder = 'write here',
  icon = '',
  type = 'text',
  label = 'some label',
  solid,
  light,
  shadow,
  prependLabel,
  labelClass = '',
  id = '',
  name = 'name',
  disabled,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const iconKey = { icon }.icon
  const Icon = SystemIconMap[`${iconKey}`]

  return (
    <div
      className={`input-wrapper relative ${error && prependLabel ? 'pb-4' : ''} ${
        prependLabel ? 'flex' : ''
      }`}
    >
      {prependLabel ? (
        <label
          className="inline-block text-xs text-gray-400 bg-gray-200 whitespace-no-wrap flex-grow px-4 border border-gray-300 border-r-0 flex items-center rounded-tl rounded-bl"
          htmlFor={id}
        >
          {label}
        </label>
      ) : (
        <label className={`${labelClass || 'sr-only'}`} htmlFor={id}>
          {label}
        </label>
      )}
      <InputStyled
        disabled={disabled}
        icon={icon}
        id={id}
        label={label}
        light={light}
        name={name}
        // min={min}
        placeholder={placeholder}
        // pattern={pattern.length !== 0 ? pattern : undefined}
        prependLabel={prependLabel}
        shadow={shadow}
        // required={required}
        solid={solid}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {icon ? (
        <span className="absolute top-1/2 transform -translate-y-1/2 left-0 px-2">
          <Icon fillColour={`${shadow ? 'gray-300' : 'primary'}`} size={32} />
        </span>
      ) : null}
      {error && (
        <p className={`text-left ${prependLabel ? 'absolute mt-12' : ''}`}>
          <small className="text-error">{error}</small>
        </p>
      )}
    </div>
  )
}
export const InputComponentPrice: React.FC<InputType> = ({
  placeholder = 'write here',
  icon = '',
  type = 'text',
  label = 'some label',
  solid,
  light,
  shadow,
  prependLabel,
  labelClass = '',
  id = '',
  name = 'name',
  disabled,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const iconKey = { icon }.icon
  const Icon = SystemIconMap[`${iconKey}`]

  return (
    <div className={`input-wrapper relative ${prependLabel ? 'flex' : ''}`}>
      {prependLabel ? (
        <label
          className="inline-block text-xs text-gray-400 bg-gray-200 whitespace-no-wrap flex-grow px-4 border border-gray-300 border-r-0 flex items-center rounded-tl rounded-bl"
          htmlFor={id}
        >
          {label}
        </label>
      ) : (
        <label className={`${labelClass || 'sr-only'}`} htmlFor={id}>
          {label}
        </label>
      )}
      <InputStyled
        defaultValue={value || ''}
        disabled={disabled}
        icon={icon}
        id={id}
        label={label}
        light={light}
        name={name}
        placeholder={placeholder}
        prependLabel={prependLabel}
        shadow={shadow}
        solid={solid}
        type={type}
        onBlur={onBlur}
        onChange={onChange}
      />
      {icon ? (
        <span className="absolute top-1/2 transform -translate-y-1/2 left-0 px-2">
          <Icon fillColour={`${shadow ? 'gray-300' : 'primary'}`} size={32} />
        </span>
      ) : null}

      {error && (
        <p className="text-left">
          <small className="text-error">{error}</small>
        </p>
      )}
    </div>
  )
}

const InputStyled = styled.input.attrs(() => ({
  className: 'input placeholder-gray-300 text-sm leading-2 font-medium w-full flex-grow-0',
}))<InputType>`
  &:focus {
    outline-color: var(--color-primary-light);
  }
  color: ${(props) => (props.solid ? 'var(--color-primary-dark)' : 'var(--color-primary)')};
  background-color: ${(props) => (props.solid ? 'white' : 'transparent')};
  border: ${(props) =>
    props.solid ? 'none' : props.light ? 'solid 1px #BBBBBB' : 'solid 1px var(--color-primary)'};
  padding: 0.875rem ${(props) => (props.icon ? '3rem' : '1.1875rem')};
  boxshadow: ${(props) => (props.shadow ? '0px 2px 2px #DDDDDD' : 'none')};
  border-radius: 0.25rem;
  border-top-left-radius: ${(props) => (props.prependLabel ? '0' : '0.25rem')};
  border-bottom-left-radius: ${(props) => (props.prependLabel ? '0' : '0.25rem')};

  &:disabled {
    color: #888888;
  }
`
