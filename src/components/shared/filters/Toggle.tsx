import React, { FC } from 'react'
import styled from 'styled-components'

type toggleType = {
  toggleMap: (e: React.MouseEvent<HTMLDivElement>) => void

  label?: string
}

export const Toggle: FC<toggleType> = ({ toggleMap, label }) => {
  return (
    <div className="flex items-center mb-5">
      <label className="font-semibold text-gray-500 text-sm leading-2 mr-3" htmlFor="map-toggle">
        {label}
      </label>
      <StyledCheckbox defaultChecked onClick={toggleMap} />
    </div>
  )
}

const StyledCheckbox = styled.input.attrs(() => ({
  type: 'checkbox',
  name: 'map-toggle',
  id: 'mapToggle',
}))`
  appearance: none;
  width: 48px;
  height: 24px;
  border-radius: 40px;
  background-color: white;
  position: relative;
  cursor: pointer;
  transition: background-color ease-in 0.2s;

  &:after {
    content: '';
    height: 16px;
    width: 16px;
    border-radius: 40px;
    background-color: var(--color-primary);
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
      background-color: white;
      transform: translate(23px, -50%);
      transition: background-color ease-in 0.2s, transform ease 0.4s;
    }
  }
`
