import React from 'react'

import { IconProps } from './icons'

export const Team: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M13.4,12.6H11.1a3.2,3.2,0,0,0-3.3,3.2v2.7h.1a18.5,18.5,0,0,0,4.6.8,11.5,11.5,0,0,0,4.1-.8h0V15.8A3.2,3.2,0,0,0,13.4,12.6Z"
        fill="currentColor"
      />
      <path
        d="M10.5,11.2a2.6,2.6,0,0,0,1.7.7h0a2.5,2.5,0,0,0,0-5h0A2.5,2.5,0,0,0,9.8,9.4a2.4,2.4,0,0,0,.7,1.8Z"
        fill="currentColor"
      />
      <path
        d="M17.9,9.8H15.8a2.7,2.7,0,0,1-.8,1.9,4.4,4.4,0,0,1,2.8,4.1v.6a9.8,9.8,0,0,0,3.3-.7h0V13A3.2,3.2,0,0,0,17.9,9.8Z"
        fill="currentColor"
      />
      <path
        d="M15.8,8.9A2.4,2.4,0,0,0,19,7.5a2.3,2.3,0,0,0-1.2-3.1,2.4,2.4,0,0,0-3.3,1.2,1.9,1.9,0,0,0-.2.8A3.7,3.7,0,0,1,15.8,8.9Z"
        fill="currentColor"
      />
      <path
        d="M9.5,11.7a3.4,3.4,0,0,1-.9-1.9H6.3A3.2,3.2,0,0,0,3.1,13v2.7h0a15.3,15.3,0,0,0,3.6.7v-.6A4.4,4.4,0,0,1,9.5,11.7Z"
        fill="currentColor"
      />
      <path
        d="M7.5,9.1h0l1.2-.3A3.7,3.7,0,0,1,9.9,6.6,2.5,2.5,0,0,0,7.5,4.1h0a2.5,2.5,0,0,0,0,5Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
