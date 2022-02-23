import React from 'react'

import { IconProps } from './icons'

export const ForwardIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4,13H16.2l-5.6,5.6L12,20l8-8L12,4,10.6,5.4,16.2,11H4Z" fill="currentColor" />
  </svg>
)
