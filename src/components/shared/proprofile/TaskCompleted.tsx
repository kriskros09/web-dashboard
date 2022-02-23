import React, { FC } from 'react'

export const TaskCompleted: FC<{ label?: string }> = ({ label = 'Task Completed on GoodOwl' }) => {
  return (
    <div>
      <h5 className="text-white font-bold text-sm mt-6">{label}</h5>
      <p className="text-sm text-gray-600">0</p>
    </div>
  )
}
