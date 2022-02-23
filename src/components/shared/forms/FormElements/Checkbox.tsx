import React, { FC } from 'react'
import styled from 'styled-components'
// import { composeInitialProps } from 'react-i18next';

type CheckboxType = {
  // Select input placeholder
  label: string

  name: string
  id: string
  checked?: boolean
  defaultChecked?: boolean
  light?: boolean
  solid?: boolean
  value?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  error?: string | undefined
  disabled?: boolean
}

export const Checkbox: FC<CheckboxType> = ({
  label = 'x',
  name = 'x',
  id = 'id',
  defaultChecked,
  // value,
  light,
  solid,
  checked,
  onChange,
  error,
  disabled,
}) => {
  return (
    <div className="input-group mt-4">
      <StyledCheckbox
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        light={light}
        name={name}
        solid={solid}
        type="checkbox"
        // value={value}
        onChange={onChange}
      />
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      {error && <small className="text-error ml-5">{error}</small>}
    </div>
  )
}

const StyledCheckbox = styled.input.attrs(() => ({
  className: 'checkbox',
}))<{ light?: boolean; solid?: boolean; disabled?: boolean }>`
  appearance: none;
  width: 16px;
  height: 16px;
  position: relative;
  border-radius: 4px;
  margin-right: 14px;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: ${(props) => (props.solid ? 'white' : 'unset')};

    border: ${(props) =>
      props.light || props.solid ? '1px #BBBBBB solid' : '1px var(--color-primary) solid'};
  }
  &:focus {
    outline: none;
  }
  &:checked {
    &:after {
      background-color: ${(props) => (props.light ? '#BBBBBB' : 'var(--color-primary)')};
    }
    &:before {
      content: '';
      position: absolute;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      z-index: 1;
      transform: rotate(45deg);
      left: 5px;
      top: 2px;
    }
  }

  &:disabled {
    &:after,
    &:before {
      opacity: 0.65;
    }
  }

  & + label {
    color: ${(props) => (props.light ? '#888888' : 'var(--color-primary-dark)')};
  }
`
