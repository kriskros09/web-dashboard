import React from 'react'

import { IconProps } from './icons'

export const Twitter: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M9.1,19a9.3,9.3,0,0,0,9.3-9.2V9.2A6.5,6.5,0,0,0,20,7.5a5.9,5.9,0,0,1-1.9.5,3.5,3.5,0,0,0,1.5-1.7l-2.1.8A3.2,3.2,0,0,0,15.1,6a3.3,3.3,0,0,0-3.3,3.3,1.7,1.7,0,0,0,.1.7A8.9,8.9,0,0,1,5.2,6.5a3.4,3.4,0,0,0-.5,1.7A3.8,3.8,0,0,0,6.1,11a3,3,0,0,1-1.5-.5h0a3.1,3.1,0,0,0,2.7,3.2H5.8A3.2,3.2,0,0,0,8.9,16a6.3,6.3,0,0,1-4.1,1.5H4A9.1,9.1,0,0,0,9.1,19"
        fill="currentColor"
      />
    </g>
  </svg>
)
