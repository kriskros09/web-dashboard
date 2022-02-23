import React from 'react'

import { IconProps } from './icons'

export const PriceSetting: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M12.8,12.7h-.1v1.8h.1c.5-.1,1-.4,1-1S13.3,12.8,12.8,12.7Z" fill="currentColor" />
      <path d="M10.5,10.1c0,.5.5.8.9.9h.1V9.4h-.1A.8.8,0,0,0,10.5,10.1Z" fill="currentColor" />
      <path
        d="M21.1,13.1V10.9L18.5,10a5.6,5.6,0,0,0-.4-1.2l1.2-2.3L17.7,4.9,15.4,6.1l-1.3-.4L13.2,3H11l-.9,2.6L8.9,6,6.6,4.8,4.9,6.5,6.1,8.8A5.6,5.6,0,0,0,5.7,10l-2.6.9v2.2l2.6.9c.1.5.3.8.4,1.3L4.9,17.6l1.6,1.6L8.8,18l1.3.4L11,21h2.2l.9-2.6,1.3-.4,2.3,1.2,1.6-1.6-1.2-2.3a5,5,0,0,0,.4-1.3Zm-8.3,3h-.1v.7H11.5v-.7h-.1a2.6,2.6,0,0,1-2.6-2.6h1.6a1.1,1.1,0,0,0,1,1.2h.1v-2h-.1c-1.5-.4-2.5-1-2.5-2.4a2.4,2.4,0,0,1,2.5-2.2h.1V7.1h1.2v.7h.1A2.4,2.4,0,0,1,15,10.3H13.5a1,1,0,0,0-.7-.9h-.1v1.6h.1c1.1.2,2.6.8,2.6,2.5S14.6,15.8,12.8,16.1Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
