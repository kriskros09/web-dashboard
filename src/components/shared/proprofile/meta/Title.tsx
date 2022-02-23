import React, { FC } from 'react'

type TitleType = {
  className?: string
  label?: string
}
export const Title: FC<TitleType> = ({ className = 'text-xxs text-gray-500', label = '' }) => {
  return <div className={className}>{label}</div>
}
