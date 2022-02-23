import React from 'react'

import { IconProps } from './icons'

export const FiscalLawIcon: React.FC<IconProps> = ({ fillColour = 'text-dark', size = 50 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 42 42"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.57,27.22h-.24v-.69h-.85v.69h-.23a1.48,1.48,0,0,0-1.48,1.48v.72a1.41,1.41,0,0,0,.79,1.18l.33.1v0l.6.18V33.1h-.23a.64.64,0,0,1-.64-.63v-.33h-.84v.33A1.48,1.48,0,0,0,13.25,34h.23v.74h.85V34h.24A1.47,1.47,0,0,0,16,32.47v-.72a1.46,1.46,0,0,0-.81-1.19L15,30.48v0l-.66-.19V28.07h.24a.63.63,0,0,1,.63.63V29H16V28.7A1.48,1.48,0,0,0,14.57,27.22Zm.63,4.53v.72a.63.63,0,0,1-.63.63h-.24V31.16l.5.14C15.06,31.46,15.2,31.63,15.2,31.75ZM13.48,30,13,29.86c-.15-.11-.36-.27-.36-.44V28.7a.64.64,0,0,1,.64-.63h.23Z"
      fill="currentColor"
    />
    <path
      d="M13.82,24.08a6.64,6.64,0,1,0,6.63,6.64A6.65,6.65,0,0,0,13.82,24.08Zm0,12.32a5.69,5.69,0,1,1,5.68-5.68A5.69,5.69,0,0,1,13.82,36.4Z"
      fill="currentColor"
    />
    <rect fill="currentColor" height="0.95" width="8.16" x="16.19" y="10.89" />
    <rect fill="currentColor" height="0.95" width="13.37" x="16.19" y="14.18" />
    <rect fill="currentColor" height="0.95" width="13.37" x="16.19" y="17.48" />
    <rect fill="currentColor" height="0.95" width="13.37" x="16.19" y="20.78" />
    <rect fill="currentColor" height="0.95" width="10.53" x="19.03" y="24.08" />
    <rect fill="currentColor" height="0.95" width="3.79" x="25.77" y="28.34" />
    <path
      d="M27.57,6.33H13.34V22.56h.95V7.28H26.71v4.45h4.74v20.6H21.58v1H32.4V11.16Zm.09,1.43,3,3h-3Z"
      fill="currentColor"
    />
  </svg>
)
