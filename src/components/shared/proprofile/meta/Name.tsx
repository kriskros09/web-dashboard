import React, { FC } from 'react'

type NameType = {
  className?: string
  label?: string
}
export const Name: FC<NameType> = ({
  className = 'text-primary-dark font-bold text-lg mb-1',
  label = '',
}) => {
  return <h4 className={className}>{label}</h4>
}
