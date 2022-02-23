import React, { FC } from 'react'

export const Price: FC<{ label?: string; data?: any }> = ({ label = 'Price', data = 0 }) => {
  return (
    <div>
      <h5 className="text-white font-bold text-sm mt-6 mb-3">{label}</h5>
      <p className="text-sm font-bold text-gray-600">${data}</p>
    </div>
  )
}
