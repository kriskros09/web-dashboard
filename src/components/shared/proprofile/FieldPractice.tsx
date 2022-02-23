import React, { FC } from 'react'

export const FieldPractice: FC<{ label?: string; data?: string }> = ({
  label = 'Field of practice',
  data = 'all',
}) => {
  return (
    <div>
      <h5 className="text-white font-bold text-sm mb-3 mt-6">{label}</h5>
      <div className="text-sm text-gray-600 font-medium">{data}</div>
    </div>
  )
}
