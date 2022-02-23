import React from 'react'

import { IconProps } from './icons'

export const Purchase: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M20.8,7a1.2,1.2,0,0,0-.8-.4H8.3L7.8,4.8A.9.9,0,0,0,6.9,4H4A.9.9,0,0,0,3,5,1,1,0,0,0,4,6H6.1l2,8.9h0v.4h10a1,1,0,0,0,1-.7l1.6-7A1.4,1.4,0,0,0,20.8,7Zm-3.3,6.7H9.8L8.7,8.6h10Z"
        fill="currentColor"
      />
      <path d="M10.4,17A1.6,1.6,0,1,0,12,18.6h0A1.6,1.6,0,0,0,10.4,17Z" fill="currentColor" />
      <path d="M16.7,17a1.6,1.6,0,1,0,1.6,1.6h0A1.6,1.6,0,0,0,16.7,17Z" fill="currentColor" />
    </g>
  </svg>
)
