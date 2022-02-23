import React, { FC } from 'react'

export const SelectedTasks: FC<{ label?: string }> = ({ label = 'Selected Task' }) => {
  return (
    <div className="selected-tasks">
      <h5 className="text-white font-bold text-sm mt-6 mb-3">{label}</h5>
      <ul className="text-sm font-medium text-gray-600">
        <li>Phone consultation</li>
      </ul>
    </div>
  )
}
