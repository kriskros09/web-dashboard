import React from 'react'

import { IconProps } from './icons'

export const Profile: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M5,20a6,6,0,0,1,5.9-5.8h2A5.8,5.8,0,0,1,18.7,20Zm2.6-1.9h8.7a3.7,3.7,0,0,0-3.4-1.9H11A3.7,3.7,0,0,0,7.6,18.1ZM8,9.4V8.5a3.9,3.9,0,0,1,4-3.9,4,4,0,0,1,3.8,3.9v.9a3.8,3.8,0,0,1-4,3.8A3.8,3.8,0,0,1,8,9.4Zm1.9-.9v.9a2,2,0,0,0,2,2,1.9,1.9,0,0,0,1.9-2V8.5a1.9,1.9,0,0,0-1.9-2,2,2,0,0,0-2,2Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
