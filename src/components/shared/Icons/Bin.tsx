import React from 'react'

import { IconProps } from './icons'

export const Bin: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M17.7,6.1H15.1v-1A1.2,1.2,0,0,0,14,4H10A1.2,1.2,0,0,0,8.9,5.1v1H6.3a.7.7,0,0,0-.7.7V8.2a.7.7,0,0,0,.7.7h.5V19a1,1,0,0,0,1,1h8.4a1,1,0,0,0,1-1V8.9h.5a.7.7,0,0,0,.7-.7V6.8A.7.7,0,0,0,17.7,6.1Zm-7.9-1,.2-.2h4l.2.2v1H9.8ZM16.3,19c0,.1,0,.1-.1.1H7.8c-.1,0-.1,0-.1-.1V8.9h8.6ZM17.5,8H6.5V7h11Z"
        fill="currentColor"
      />
      <path
        d="M9.5,18a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5.5.5,0,0,0-.4.5v7c0,.2.2.5.4.5Z"
        fill="currentColor"
      />
      <path
        d="M12,18a.5.5,0,0,0,.5-.5v-7A.5.5,0,0,0,12,10a.5.5,0,0,0-.5.5v7a.5.5,0,0,0,.5.5Z"
        fill="currentColor"
      />
      <path
        d="M14.4,18a.5.5,0,0,0,.5-.5v-7a.5.5,0,0,0-.5-.5.5.5,0,0,0-.4.5v7c0,.2.2.5.4.5Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
