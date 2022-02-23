import React from 'react'

import { IconProps } from './icons'

export const CarretDown: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M18.2,9.5,12,15.8,5.8,9.5Z" fill="currentColor" />
    </g>
  </svg>
)
