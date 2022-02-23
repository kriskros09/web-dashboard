import React, { FC } from 'react'
import cx from 'classnames'

import { ArrowDown } from '../Icons/ArrowDown'

type ToggleType = {
  onClick(event: React.MouseEvent<HTMLElement>): void
  label: string
  toggle: boolean
}

export const FilterToggle: FC<ToggleType> = ({ label = 'filter', onClick, toggle }) => {
  // defined tailwind global classes and when toggle true or false
  const labelClass = cx(
    'cursor-pointer text-sm font-semibold px-4 py-2 rounded-20 shadow hidden lg:flex',
    {
      'text-gray-500 bg-white': !toggle,
      'text-white bg-primary': toggle,
    },
  )

  // defined styles when toggle true or false
  const iconColor = toggle ? 'white' : 'primary'

  return (
    <div className={labelClass} onClick={onClick}>
      <span className="mr-6">{label}</span>
      <ArrowDown fillColour={iconColor} size={20} />
    </div>
  )
}
