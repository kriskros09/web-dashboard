import React from 'react'

import { IconProps } from './icons'

export const BubbleIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.4,7.2V5.6A1.6,1.6,0,0,1,8,4H19.2a1.6,1.6,0,0,1,1.6,1.6h0v7.6a1.6,1.6,0,0,1-1.6,1.6h-.8v2.8a.9.9,0,0,1-.8.8l-.6-.2-.9-1H10.3L7,20.6a.8.8,0,0,1-1.2-.1.8.8,0,0,1-.2-.5V17.2H4.8a1.6,1.6,0,0,1-1.6-1.6h0V8.8A1.6,1.6,0,0,1,4.8,7.2H6.4ZM16.8,14a.8.8,0,0,1,.7-.8h1.7V5.6H8v7.6h6l.6.2,2.2,2.3ZM6.4,8.8H4.8v6.8H6.4a.8.8,0,0,1,.8.7h0v1.7l2.2-2.3.6-.2h4.5l-.8-.8H8a1.6,1.6,0,0,1-1.6-1.6h0Z"
      fill="currentColor"
    />
  </svg>
)
