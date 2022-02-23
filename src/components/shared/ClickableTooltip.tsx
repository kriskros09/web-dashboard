import React, { useState } from 'react'
import styled from 'styled-components'

import { ClearIcon } from './Icons'

type ComponentType = {
  center?: boolean
}

export const ClickableTooltip: React.FC<ComponentType> = ({ children, center }) => {
  const [tooltipVisibility, SetTooltipVisibility] = useState<boolean>(false)

  return (
    <TooltipStyled center={center} tooltipVisibility={tooltipVisibility}>
      <div
        className="w-4 h-4 p-1 rounded-full block bg-primary relative"
        onClick={() => SetTooltipVisibility(!tooltipVisibility)}
      >
        <span className="block text-white text-xxs font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          i
        </span>
      </div>
      <div className="absolute bubble bg-white shadow-sm text-primary-dark text-xs p-8 text-left left-0 xl:inset-auto z-20">
        <button
          className="absolute top-0 right-0 focus:outline-none m-3"
          title="close"
          onClick={() => SetTooltipVisibility(!tooltipVisibility)}
        >
          <ClearIcon fillColour="gray-300" size={24} />
        </button>
        {children}
      </div>
    </TooltipStyled>
  )
}

const TooltipStyled = styled.div.attrs(() => ({
  className: 'self-center xl:relative',
}))<{ tooltipVisibility: boolean; center?: boolean }>`
  cursor: pointer;
  &:focus {
    outline: none;
  }
  & .bubble {
    opacity: ${(props) => (props.tooltipVisibility ? '1' : '0')};
    visibility: ${(props) => (props.tooltipVisibility ? 'visible' : 'hidden')};
    max-width: 100%;
    transition: opacity 0.2s ease-out, visibility 0.2s 0.2s ease-in-out;

    @media (min-width: 768px) {
      min-width: 650px;
    }
    @media (min-width: 1280px) {
      transform: ${(props) => (props.center ? 'none' : 'translateX(-100%)')};
    }

    p {
      margin-bottom: 2rem;
    }
  }
`
