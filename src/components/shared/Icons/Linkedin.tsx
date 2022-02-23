import React from 'react'

import { IconProps } from './icons'

export const Linkedin: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M4.3,9.3H7.7V20H4.3ZM6,4A2,2,0,0,1,7.9,6a2.1,2.1,0,0,1-2,1.9A2,2,0,0,1,4,5.9,1.9,1.9,0,0,1,6,4"
        fill="currentColor"
      />
      <path
        d="M9.4,9h3.2v1.5h.1a3.4,3.4,0,0,1,3.2-1.7C19.4,8.8,20,11,20,14v6H16.6V14.7c0-1.3,0-2.9-1.8-2.9s-2,1.3-2,2.8V20H9.4Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
