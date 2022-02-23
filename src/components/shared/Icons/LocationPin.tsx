import React from 'react'

import { IconProps } from './icons'

export const LocationPinIcon: React.FC<IconProps> = ({
  fillColour = 'text-gray-600',
  size = 24,
}) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6,3.2c3.7,0,7,3,6.8,6.4s-5,11.2-6.8,11.2S5,13.4,4.8,9.6,7.9,3.2,11.6,3.2Zm0,15.9.7-.7a15.7,15.7,0,0,0,1.9-2.6,12.7,12.7,0,0,0,2.6-6.2c.1-2.5-2.4-4.8-5.2-4.8S6.3,7.1,6.4,9.6A12.7,12.7,0,0,0,9,15.8a15.7,15.7,0,0,0,1.9,2.6A2.3,2.3,0,0,0,11.6,19.1Zm0-6.3A2.9,2.9,0,0,1,8.8,10a2.9,2.9,0,0,1,2.8-2.8A2.8,2.8,0,0,1,14.4,10,2.9,2.9,0,0,1,11.6,12.8Zm0-1.6A1.2,1.2,0,1,0,10.4,10h0A1.2,1.2,0,0,0,11.6,11.2Z"
      fill="currentColor"
    />
  </svg>
)
