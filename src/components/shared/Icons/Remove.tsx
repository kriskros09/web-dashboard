import React from 'react'

import { IconProps } from './icons'

export const RemoveIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="currentColor" height="3" width="100%" x="0.5" y="0.5" />
  </svg>
)
