import React from 'react'

import { IconProps } from './icons'

export const StarIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.5,9.7c-.1-.2-.2-.4-.4-.4l-5.3-.7L12.4,3.8c-.1-.4-.7-.4-.9,0L9.2,8.6l-5.3.7c-.2,0-.3.2-.4.4a1.1,1.1,0,0,0,.1.5l3.9,3.7-.9,5.2a.4.4,0,0,0,.2.5h.5L12,17.2l4.7,2.5h.5a.4.4,0,0,0,.2-.5l-.9-5.2,3.8-3.7A.6.6,0,0,0,20.5,9.7Z"
      fill="currentColor"
    />
  </svg>
)
