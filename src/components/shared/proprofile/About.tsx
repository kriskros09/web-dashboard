import React, { FC } from 'react'

export const About: FC<{ label?: string; data?: any }> = ({ label = 'About me', data = '' }) => {
  return (
    <div>
      <h5 className="text-white font-bold text-sm mb-3">{label}</h5>
      <p className="text-sm text-gray-600 font-medium">{data}</p>
    </div>
  )
}
