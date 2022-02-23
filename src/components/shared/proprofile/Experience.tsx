import React, { FC } from 'react'

export const Experience: FC<{ label?: string; data?: number }> = ({
  label = 'Year of experience',
  data = '',
}) => {
  return (
    <div>
      <h5 className="text-white font-bold text-sm mb-3 mt-6">{label}</h5>
      <p className="text-sm text-gray-600 font-medium">{data} years</p>
    </div>
  )
}
