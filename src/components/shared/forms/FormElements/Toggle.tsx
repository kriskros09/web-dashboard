import React, { FC } from 'react'
import styled from 'styled-components'

type toggleType = {
  toggle?: React.ChangeEventHandler<HTMLInputElement>
  checked?: boolean
  id?: string
}
const StyledCheckbox = styled.input.attrs(() => ({
  type: 'checkbox',
  name: 'toggle',
}))`
  appearance: none;
  width: 48px;
  height: 24px;
  border-radius: 40px;
  background-color: #dddddd;
  position: relative;
  cursor: pointer;
  transition: background-color ease-in 0.2s;

  &:after {
    content: '';
    height: 16px;
    width: 16px;
    border-radius: 40px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    transition: background-color ease-in 0.2s, transform ease 0.4s;
  }

  &:focus {
    outline: none;
  }

  &:checked {
    background-color: var(--color-primary);
    &:after {
      transform: translate(23px, -50%);
      transition: background-color ease-in 0.2s, transform ease 0.4s;
    }
  }
`
export const Toggle: FC<toggleType> = ({ toggle, checked, id = 'Toggle' }) => {
  return (
    <div className="flex items-center">
      <StyledCheckbox checked={checked} id={id} onChange={toggle} />
    </div>
  )
}
