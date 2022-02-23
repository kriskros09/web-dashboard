import React from 'react'

import { IconProps } from './icons'

export const Bell: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10,18h4a2,2,0,0,1-4,0ZM5,17a1,1,0,0,1,0-2h.5A4.4,4.4,0,0,0,7,12V9a5,5,0,0,1,4.9-5H12a5,5,0,0,1,5,4.9h0v3a4.4,4.4,0,0,0,1.5,3H19a1,1,0,0,1,0,2Z"
      fill="currentColor"
    />
  </svg>
)
