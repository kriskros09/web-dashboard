import React from 'react'

import { IconProps } from './icons'

export const Tag: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <g>
        <path
          d="M20.4,10.3,13.7,3.6a2.6,2.6,0,0,0-1.8-.7H5.4A2.5,2.5,0,0,0,2.9,5.4v6.5a2.6,2.6,0,0,0,.7,1.8l6.7,6.7a2.6,2.6,0,0,0,1.8.7,2.4,2.4,0,0,0,1.8-.7l6.5-6.5A2.5,2.5,0,0,0,20.4,10.3ZM19,12.5,12.5,19a.5.5,0,0,1-.7,0L5,12.2c-.1,0-.1-.2-.1-.3h0V5.4a.5.5,0,0,1,.5-.5h6.8L19,11.8A.5.5,0,0,1,19,12.5Z"
          fill="currentColor"
        />
        <path
          d="M8.3,6H8.2A2.2,2.2,0,0,0,6,8.2a2.3,2.3,0,1,0,4.5,0A2.2,2.2,0,0,0,8.3,6ZM8.2,9a.7.7,0,0,1-.7-.8.7.7,0,0,1,.7-.7h0a.7.7,0,0,1,.8.7A.7.7,0,0,1,8.2,9Z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
)
