import React from 'react'

import { IconProps } from './icons'

export const CalendarIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M6,9v9H18V9ZM17,6h2a1,1,0,0,1,1,.9h0V19a1,1,0,0,1-.9,1H5a1,1,0,0,1-1-.9H4V7a1,1,0,0,1,.9-1H7V5a1,1,0,0,1,.9-1H8a1,1,0,0,1,1,.9H9V6h6V5a1,1,0,0,1,2,0ZM16,16H14V14h2Zm-3,0H11V14h2Zm3-3H14V11h2Zm-3,0H11V11h2Zm-3,3H8V14h2Zm0-3H8V11h2Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
