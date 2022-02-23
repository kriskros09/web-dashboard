import React from 'react'

import { IconProps } from './icons'

export const Edit: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20,7.8a.4.4,0,0,0-.1-.3L16.5,4.1h-.6L5,14.9v.2L4,19.5a.6.6,0,0,0,.1.4h.4l4.3-1H9l8.5-8.5h0l2.4-2.3A.4.4,0,0,0,20,7.8ZM9.1,17.5,6.4,14.8l7.4-7.4,2.8,2.7ZM5,19l.7-3.6h0l2.8,2.7h0ZM17.2,9.5,14.4,6.8,16.2,5,19,7.8Z"
      fill="currentColor"
    />
  </svg>
)
