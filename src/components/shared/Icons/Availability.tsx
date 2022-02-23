import React from 'react'

import { IconProps } from './icons'

export const Availability: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm0,16a7,7,0,1,1,7-7A7,7,0,0,1,12,19Z"
        fill="currentColor"
      />
      <path
        d="M14.4,9l-3.7,4.6L9,12a1.1,1.1,0,0,0-1.4.1,1.1,1.1,0,0,0,.1,1.4l2.4,2.3.7.2h.1a1.1,1.1,0,0,0,.7-.3L16,10.3A1,1,0,0,0,14.4,9Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
