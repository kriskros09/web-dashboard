import React from 'react'

import { IconProps } from './icons'

export const ClearIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19,6.4,17.6,5,12,10.6,6.4,5,5,6.4,10.6,12,5,17.6,6.4,19,12,13.4,17.6,19,19,17.6,13.4,12Z"
      fill="currentColor"
    />
  </svg>
)
