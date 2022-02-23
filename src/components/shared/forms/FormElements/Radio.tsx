import React, { FC } from 'react'
import styled from 'styled-components'
import cx from 'classnames'

// import { composeInitialProps } from 'react-i18next';

type RadioType = {
  // Select input placeholder
  label?: any

  name: string

  id?: string

  light?: boolean

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  checked?: boolean
  defaultChecked?: boolean
}

export const Radio: FC<RadioType> = ({
  label = 'x',
  name = 'x',
  id,
  light,
  onChange,
  checked,
  defaultChecked,
  value,
}) => {
  const radioLabelClasses = cx('ml-3 text-sm leading-2 font-medium lg:font-semibold', {
    'text-primary': light,
    'text-gray-500 ': !light,
  })

  return (
    <div className="input-group flex items-center mb-1">
      <StyledRadio
        checked={checked}
        defaultChecked={defaultChecked}
        id={id}
        light={light}
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
      />
      <label className={radioLabelClasses} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

const StyledRadio = styled.input.attrs(() => ({
  className: 'radio',
}))<{ light?: boolean }>`
  appearance: none;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: ${(props) => (props.light ? '1px var(--color-primary) solid' : '2px #C9C9C9 solid')};
    z-index: 2;
  }
  &:focus {
    outline: none;
  }
  &:checked {
    &:before {
      content: '';
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      border: 5px white solid;
      background-color: var(--color-primary);
      z-index: 1;
    }
  }
`
