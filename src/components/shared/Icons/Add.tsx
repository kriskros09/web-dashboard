import React from 'react'

import { IconProps } from './icons'

export const AddIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11,5v6H5v2h6v6h2V13h6V11H13V5Z" fill="currentColor" />
  </svg>
)
