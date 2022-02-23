import React from 'react'

import { IconProps } from './icons'

export const Helpcenter: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M12.1,4a8,8,0,1,0,8,8A8,8,0,0,0,12.1,4Zm0,10a2,2,0,1,1,2-2A2,2,0,0,1,12.1,14Zm0-8a5.8,5.8,0,0,1,2.6.6L13.1,8.2a2.6,2.6,0,0,0-2.1,0L9.5,6.6A5.8,5.8,0,0,1,12.1,6Zm-6,6a5.8,5.8,0,0,1,.6-2.6L8.2,11a3.4,3.4,0,0,0,0,2L6.7,14.6A5.8,5.8,0,0,1,6.1,12Zm6,6a5.8,5.8,0,0,1-2.6-.6L11,15.8a2.6,2.6,0,0,0,2.1,0l1.6,1.6A5.8,5.8,0,0,1,12.1,18Zm5.4-3.4L15.9,13a3.4,3.4,0,0,0,0-2l1.6-1.6a4.9,4.9,0,0,1,0,5.2Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
