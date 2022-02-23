import React from 'react'

import { IconProps } from './icons'

export const Camera: React.FC<IconProps> = ({ fillColour = 'text-gray-600', size = 24 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle cx="12" cy="12" fill="currentColor" r="3.203" />
      <path
        d="M9.002,2.002 L7.171,4.004 L4.002,4.004 C2.89817163,4.00766425 2.00456097,4.90216852 2.002,6.006 L2.002,18.0173333 C2.00456097,19.1211648 2.89817163,20.0156691 4.002,20.0193333 L19.9986667,20.0193333 C21.102495,20.0156691 21.9961057,19.1211648 21.9986667,18.0173333 L21.9986667,6.006 C21.9961057,4.90216852 21.102495,4.00766425 19.9986667,4.004 L16.829,4.004 L14.9993333,2.002 L9.002,2.002 Z M12.002,17.0163355 C9.97737768,17.0182212 8.15106287,15.800071 7.37496496,13.9301055 C6.59886706,12.0601399 7.02589244,9.90677859 8.4568493,8.47448618 C9.88780615,7.04219376 12.0407682,6.6131597 13.9114569,7.38751278 C15.7821457,8.16186586 17.0020001,9.98704347 17.0020001,12.0116667 C17.0025524,14.7748552 14.7631884,17.015413 12,17.0163355 L12.002,17.0163355 Z"
        fill="currentColor"
      />
    </g>
  </svg>
)
