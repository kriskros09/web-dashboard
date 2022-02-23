import React from 'react'

import { IconProps } from './icons'

export const Facebook: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M13.4,20V12.7h2.5l.4-2.8H13.4V8.1c0-.8.3-1.4,1.4-1.4h1.6V4.1H14.1a3.4,3.4,0,0,0-3.6,3.2V9.9H8v2.8h2.5V20Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
