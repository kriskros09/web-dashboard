import React from 'react'

import { IconProps } from './icons'

export const Logout: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M15.2,5.8a.7.7,0,0,0-.8.3V7.4a.5.5,0,0,0,.3.5A5.6,5.6,0,0,1,18,13,5.9,5.9,0,0,1,6.2,13,5.6,5.6,0,0,1,9.5,7.9a.5.5,0,0,0,.3-.5v-1a.6.6,0,0,0-.6-.6H9A7.8,7.8,0,0,0,4.1,13,8,8,0,1,0,15.2,5.8Z"
        fill="currentColor"
      />
      <path
        d="M12.1,12.9a1,1,0,0,0,1-1V4.2a1.1,1.1,0,0,0-.3-.8,1,1,0,0,0-1.4,0,1.1,1.1,0,0,0-.3.8v7.7A1,1,0,0,0,12.1,12.9Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
