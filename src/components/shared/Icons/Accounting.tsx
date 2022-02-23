import React from 'react'

import { IconProps } from './icons'

export const Accounting: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M12.8,11.2h-.1V9.5h.1a1,1,0,0,1,.7.9H15a2.4,2.4,0,0,0-2.2-2.4h-.1V7.1H11.5v.7h-.1a2.4,2.4,0,0,0-2.5,2.2c0,1.4,1,2,2.5,2.4h.1v2h-.1a1.1,1.1,0,0,1-1-1.2H8.8a2.6,2.6,0,0,0,2.6,2.6h.1v.7h1.2v-.7h.1c1.8-.3,2.6-1.3,2.6-2.4S13.9,11.4,12.8,11.2Zm-1.3-.3h-.1c-.4-.1-.9-.4-.9-.9a.8.8,0,0,1,.9-.8h.1Zm1.3,3.8h-.1V12.8h.1c.5.1,1,.3,1,1S13.3,14.6,12.8,14.7Z"
        fill="currentColor"
      />
      <path
        d="M12.1,3a9,9,0,1,0,9,9A9,9,0,0,0,12.1,3Zm0,16a7,7,0,1,1,7-7A7,7,0,0,1,12.1,19Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
