import React from 'react'

import { IconProps } from './icons'

export const ConflictsLawIcon: React.FC<IconProps> = ({ fillColour = 'text-dark', size = 50 }) => (
  <svg
    className={`text-${fillColour}`}
    height={size}
    viewBox="0 0 42 42"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.64,16.81l-4-10L33,6.29l-.22-.92L23.12,7.7a2.4,2.4,0,0,0-4.54,1.1.13.13,0,0,0,0,.06l-10,2.67.25.92,2.69-.72L7.37,21.38H5.84v.47s.07,5.13,6,5.13,6-5.08,6-5.13v-.47H16.4l-4-9.9,6.37-1.7a2.49,2.49,0,0,0,.77,1V32.8H15.4a3.22,3.22,0,0,0-3.32,3.36v.47H29.89v-.47a3.22,3.22,0,0,0-3.31-3.36H22.42V10.72a2.37,2.37,0,0,0,1-1.92c0-.06,0-.12,0-.18l6.38-1.55L25.6,16.81H24.08v.48c0,.05.07,5.13,6,5.13s6-5.08,6-5.13v-.48ZM11.88,26c-4,0-4.87-2.61-5-3.72H16.93C16.77,23.42,15.94,26,11.88,26ZM8.41,21.38,12,12.89l3.38,8.49ZM28.9,35.69H13.08a2.2,2.2,0,0,1,2.32-1.95H26.58A2.19,2.19,0,0,1,28.9,35.69ZM21.47,32.8h-1V11.16a2.44,2.44,0,0,0,.48.05,2.52,2.52,0,0,0,.48-.05ZM21,10.26A1.46,1.46,0,1,1,22.44,8.8,1.46,1.46,0,0,1,21,10.26Zm9.24-1.93,3.38,8.48h-7Zm-.11,13.15c-4,0-4.88-2.62-5.05-3.72h10.1C35,18.86,34.18,21.48,30.12,21.48Z"
      fill="currentColor"
    />
  </svg>
)
