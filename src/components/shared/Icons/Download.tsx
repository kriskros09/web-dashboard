import React from 'react'

import { IconProps } from './icons'

export const Download: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M19.2,11v8a1.1,1.1,0,0,1-1.1,1.1H6A1.2,1.2,0,0,1,4.8,19V11H3.1v8A2.9,2.9,0,0,0,6,21.9H18.1A2.9,2.9,0,0,0,21,19V11Z"
        fill="currentColor"
      />
      <polygon
        fill="currentColor"
        points="16.4 12.6 15.2 11.4 12.9 13.8 12.9 3 11.1 3 11.1 13.8 8.8 11.4 7.6 12.6 12 17.3 16.4 12.6"
      />
    </g>
  </svg>
)
