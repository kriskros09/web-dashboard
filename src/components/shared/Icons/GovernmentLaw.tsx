import React from 'react'

import { IconProps } from './icons'

export const GovernmentLawIcon: React.FC<IconProps> = ({ fillColour = 'text-dark', size = 50 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 42 42"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32,32.49V30H31V27.55H30V19.26H31V16.79H32V14.32h2.27V11.89L21,4.52,7.73,11.89v2.43H10v2.47h1.05v2.47H12v8.29h-.94V30H10v2.47H6.92V35.8H35.08V32.49Zm-2-4V30h-3.8V28.49H30ZM16.73,16.79h1.43v2.47h.94v8.29h-.94V30H16.73V27.55h-.94V19.26h.94ZM22,27.55h-1.9V19.26H22ZM19.1,18.31h0V16.79h3.8v1.52H19.1Zm0,10.18h3.8V30H19.1Zm3.8-.94V19.26h.94V16.79h1.43v2.47h.94v8.29h-.94V30H23.84V27.55Zm6.16,0h-1.9V19.26h1.9Zm1-9.24h-3.8V16.79H30ZM8.68,13.37v-.92L21,5.6l12.32,6.85v.92H8.68ZM11,15.84V14.32h20.1v1.52H11Zm1,2.47V16.79h3.8v1.52H12Zm.95,1h1.9v8.29h-1.9ZM12,28.49h3.8V30H12ZM11,31h20.1v1.53H11Zm23.19,3.9H7.86V33.43H34.14Z"
      fill="currentColor"
    />
  </svg>
)
