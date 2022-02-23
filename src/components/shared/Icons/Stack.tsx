import React from 'react'

import { IconProps } from './icons'

export const Stack: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
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
          d="M20.9,12l-3.7-2,3.7-1.9L12.1,3.3H12L3.1,8.1,6.7,10,3.1,12l3.6,2L3.1,15.9l8.8,4.8H12l8.9-4.8L17.3,14ZM8.6,11,12,12.9,15.4,11l1.8,1L12,14.8,6.8,12ZM12,5.2l5.2,2.9L12,10.9,6.8,8.1Zm0,13.6L6.8,15.9l1.8-1L12,16.8l3.4-1.9,1.8,1Z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
)
