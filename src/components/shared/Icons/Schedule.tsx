import React from 'react'

import { IconProps } from './icons'

export const Schedule: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <g>
        <path
          d="M11.8,3a9,9,0,1,0,9,9A9,9,0,0,0,11.8,3Zm0,16a7,7,0,1,1,7-7A7,7,0,0,1,11.8,19Z"
          fill="currentColor"
        />
        <polygon
          fill="currentColor"
          points="12.8 6.9 10.8 6.9 10.8 13 14.6 15.8 15.8 14.2 12.8 12 12.8 6.9"
        />
      </g>
    </g>
  </svg>
)
