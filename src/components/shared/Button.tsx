import React from 'react'
import styled from 'styled-components'
import cx from 'classnames'

import { SystemIconMap } from './Icons'

// import classNames from 'classnames';

type ButtonTypes = {
  /**
   * Label of the button
   */
  label?: string
  /**
   * Type of the button
   */
  type?: string
  /**
   * String value to define the button classes
   */
  className?: string
  /**
   * String value to define the icon before label
   */
  iconBefore?: string
  /**
   * String value to define the icon after label
   */
  iconAfter?: string

  /**
   * Button click action
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  shouldDisplay?: boolean
  isLoading?: boolean
}

export const Button: React.FC<ButtonTypes> = ({
  onClick,
  label = '',
  className = 'classes',
  type = 'button',
  iconBefore = '',
  iconAfter = '',
  disabled = false,
  shouldDisplay = true,
  isLoading = false,
}) => {
  if (!shouldDisplay) return null

  const iconKey = iconBefore ? { iconBefore }.iconBefore : { iconAfter }.iconAfter
  const Icon = SystemIconMap[`${iconKey}`]
  const btnClass = cx(
    className,
    { 'opacity-50 cursor-not-allowed': disabled },
    { 'opacity-50 cursor-not-allowed flex': isLoading },
  )

  return (
    <ButtonStyled
      className={btnClass}
      disabled={disabled}
      isLoading={isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="-ml-1 mr-3 h-5 w-5 ">
          <svg
            className="animate-spin text-white"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : null}
      {iconBefore ? (
        <span className="pr-2">
          <Icon fillColour="" size={15} />
        </span>
      ) : null}
      <span>{label}</span>
      {iconAfter ? (
        <span className="pl-2">
          <Icon fillColour="" size={15} />
        </span>
      ) : null}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button.attrs((props) => ({
  className: `btn ${props.className}`,
  type: `${props.type}`,
  disabled: props.disabled,
}))`
  & svg {
    transition: fill 0.2s ease-in-out;
  }
  &:hover {
    svg {
      color: currentColor;
    }
  }

  &:not(.btn-xs) {
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`
