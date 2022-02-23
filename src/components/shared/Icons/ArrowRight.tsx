import React from 'react'

import { IconProps } from './icons'

export const ArrowRight: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.6,16.6,10,18l6-6L10,6,8.6,7.4,13.2,12Z" fill="currentColor" stroke="currentColor" />
  </svg>
)
