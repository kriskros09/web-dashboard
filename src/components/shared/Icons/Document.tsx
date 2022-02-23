import React from 'react'

import { IconProps } from './icons'

export const Document: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M19,8.1,14.3,3.3a1.1,1.1,0,0,0-.7-.3H7.2A2.6,2.6,0,0,0,4.7,5.6V18.4A2.6,2.6,0,0,0,7.2,21h9.6a2.6,2.6,0,0,0,2.5-2.6V8.8A1.1,1.1,0,0,0,19,8.1Zm-2.4.4H13.9V5.8ZM16.8,19H7.3a.6.6,0,0,1-.6-.6V5.6A.6.6,0,0,1,7.2,5h4.7V9.5a1.1,1.1,0,0,0,1,1h4.4v7.9A.6.6,0,0,1,16.8,19Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
