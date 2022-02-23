import React from 'react'

import { IconProps } from './icons'

export const BookIcon: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19,20V18.3l.5-.2a1.4,1.4,0,0,0,.2-.6V3.2a.8.8,0,0,0-.7-.8H6.4a2.8,2.8,0,0,0-1.7.7A2.6,2.6,0,0,0,4,4.8V19.2a2.4,2.4,0,0,0,2.4,2.4H18.9a.8.8,0,0,0,.8-.8A.8.8,0,0,0,19,20ZM8.3,16.7V4h9.8V16.7Zm-1.6,0H6.4l-.8.2V4.8a1.4,1.4,0,0,1,.2-.6L6.4,4h.3Zm10.8,1.6V20H6.4a.9.9,0,0,1-.8-.8.9.9,0,0,1,.8-.9Z"
      fill="currentColor"
    />
  </svg>
)
