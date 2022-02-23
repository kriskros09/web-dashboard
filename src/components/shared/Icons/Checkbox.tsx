import React from 'react'

import { IconProps } from './icons'

export const CheckboxIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
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
          d="M20.2,4.8a1,1,0,0,0-1.4,0L12,11.7l-1.6-1.6A1,1,0,0,0,9,11.5l2.2,2.3a1.1,1.1,0,0,0,.8.3,1.1,1.1,0,0,0,.7-.3l7.5-7.6A1,1,0,0,0,20.2,4.8Z"
          fill="currentColor"
        />
        <path
          d="M18.8,10.6a.9.9,0,0,0-1,1v5.3a.5.5,0,0,1-.5.5H6.6a.5.5,0,0,1-.5-.5V6.2a.6.6,0,0,1,.5-.5H15a1,1,0,0,0,1-1,1.1,1.1,0,0,0-1-1H6.6A2.6,2.6,0,0,0,4.1,6.2V16.9a2.5,2.5,0,0,0,2.5,2.5H17.3a2.5,2.5,0,0,0,2.5-2.5V11.6A1,1,0,0,0,18.8,10.6Z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
)
