import React from 'react'

import { IconProps } from './icons'

export const BackwardIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20,11H7.8l5.6-5.6L12,4,4,12l8,8,1.4-1.4L7.8,13H20Z" fill="currentColor" />
  </svg>
)
