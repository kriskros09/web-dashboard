import React from 'react'

import { IconProps } from './icons'

export const Search: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
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
          d="M19.9,18.5l-3.3-3.3A7,7,0,0,0,11.1,4H11a7,7,0,0,0-7,6.9H4a7,7,0,0,0,6.9,7H11a7.1,7.1,0,0,0,4.2-1.4l3.3,3.3ZM6,11a5,5,0,0,1,4.9-5H11a5,5,0,0,1,5,4.9h0a5,5,0,0,1-4.9,5H11a5,5,0,0,1-5-4.9Z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
)
