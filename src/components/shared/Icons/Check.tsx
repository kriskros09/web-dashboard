import React from 'react'

import { IconProps } from './icons'

export const Check: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M9,16.2,4.8,12,3.4,13.4,9,19,21,7,19.6,5.6Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </g>
  </svg>
)
