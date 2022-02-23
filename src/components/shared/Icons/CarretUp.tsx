import React from 'react'

import { IconProps } from './icons'

export const CarretUp: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="m5.8 14.5 6.2-6.2 6.2 6.2z" fill="currentColor" />
    </g>
  </svg>
)
