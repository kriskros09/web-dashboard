import React from 'react'

import { IconProps } from './icons'

export const Dashboard: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M17,20a1,1,0,0,1-1-.9h0V10a1,1,0,0,1,.9-1H19a1,1,0,0,1,1,.9h0v9a1,1,0,0,1-.9,1H17Zm-6,0a1,1,0,0,1-1-.9h0V5a1,1,0,0,1,.9-1H13a1,1,0,0,1,1,.9h0V19a1,1,0,0,1-.9,1H11ZM5,20a1,1,0,0,1-1-.9H4V15a1,1,0,0,1,.9-1H7a1,1,0,0,1,1,.9H8v4a1,1,0,0,1-.9,1H5Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
