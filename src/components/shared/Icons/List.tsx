import React from 'react'

import { IconProps } from './icons'

export const List: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M6.1,5.2H4.7a.7.7,0,0,0-.6.7V7.2a.7.7,0,0,0,.6.7H6.1a.7.7,0,0,0,.6-.7h0V5.9A.7.7,0,0,0,6.1,5.2Z"
        fill="currentColor"
      />
      <path
        d="M19.7,5.2H9.4c-.3,0-.4.3-.4.7V7.2c0,.4.1.7.4.7H19.7c.2,0,.4-.3.4-.7V5.9C20.1,5.5,19.9,5.2,19.7,5.2Z"
        fill="currentColor"
      />
      <path
        d="M6.1,10.5H4.7a.7.7,0,0,0-.6.7h0v1.3a.7.7,0,0,0,.6.7H6.1a.7.7,0,0,0,.6-.7h0V11.2a.7.7,0,0,0-.6-.7Z"
        fill="currentColor"
      />
      <path
        d="M19.7,10.5H9.4c-.3,0-.4.3-.4.7v1.3c0,.4.1.7.4.7H19.7c.2,0,.4-.3.4-.7V11.2C20.1,10.8,19.9,10.5,19.7,10.5Z"
        fill="currentColor"
      />
      <path
        d="M6.1,15.8H4.7a.7.7,0,0,0-.6.7h0v1.3a.7.7,0,0,0,.6.7H6.1a.7.7,0,0,0,.6-.7h0V16.5a.7.7,0,0,0-.6-.7Z"
        fill="currentColor"
      />
      <path
        d="M19.7,15.8H9.4c-.3,0-.4.3-.4.7v1.3c0,.4.1.7.4.7H19.7c.2,0,.4-.3.4-.7V16.5C20.1,16.1,19.9,15.8,19.7,15.8Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
