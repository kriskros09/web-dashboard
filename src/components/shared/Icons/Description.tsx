import React from 'react'

import { IconProps } from './icons'

export const Description: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M19.4,5.4H4.7a.7.7,0,0,0-.7.7V7.4a.7.7,0,0,0,.7.6H19.4a.7.7,0,0,0,.7-.6V6.1A.7.7,0,0,0,19.4,5.4Z"
        fill="currentColor"
      />
      <path
        d="M19.3,10.7H4.6a.7.7,0,0,0-.7.6v1.4a.7.7,0,0,0,.7.6H19.3a.7.7,0,0,0,.7-.6V11.3A.7.7,0,0,0,19.3,10.7Z"
        fill="currentColor"
      />
      <path
        d="M14.7,16H4.4a.6.6,0,0,0-.5.6v1.3c0,.4.2.7.5.7H14.7c.2,0,.4-.3.4-.7V16.6C15.1,16.3,14.9,16,14.7,16Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
