import React from 'react'

import { IconProps } from './icons'

export const ArrowDown: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M7.4,8.6,6,10l6,6,6-6L16.6,8.6,12,13.2Z" fill="currentColor" stroke="currentColor" />
    </g>
  </svg>
)
