import React from 'react'
import styled from 'styled-components'

type TooltipType = {
  color?: string
}
export const Tooltip: React.FC<TooltipType> = ({ color = 'bg-gray-400', children }) => {
  return (
    <TooltipStyled>
      <div className={`w-4 h-4 p-1 rounded-full block relative ${color}`}>
        <span className="block text-white text-xxs font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          i
        </span>
      </div>
      <div className="absolute bubble bg-gray-400 rounded shadow-sm text-white text-xs font-semibold p-4 text-left">
        {children}
      </div>
    </TooltipStyled>
  )
}

const TooltipStyled = styled.button.attrs(() => ({
  className: 'self-center relative',
}))`
  &:focus {
    outline: none;
  }
  & .bubble {
    opacity: 0;
    visibility: hidden;
    min-width: 300px;
    max-width: 300px;
    transition: opacity 0.2s ease-out, visibility 0.2s 0.2s ease-in-out;
    z-index: 20;

    @media (min-width: 768px) {
      left: -20px;
      top: 20px;
      transform: translate(-100%, -50%);
    }

    &:after {
      content: '';
      height: 10px;
      width: 10px;
      background-color: #888888;
      position: absolute;
      @media (min-width: 768px) {
        right: -5px;
        top: 20px;
        transform: translateY(-50%) rotate(45deg);
      }
    }
  }
  &:hover {
    & .bubble {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.2s 0.2s ease-in-out;
    }
  }
`
