import React, { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'

export const Details: FC<{ label?: any; data?: any }> = ({ label = 'Titre', data = '' }) => {
  return (
    <div className="mb-6">
      <h5 className="text-white font-bold text-sm mb-3">{label}</h5>
      <p className="text-sm text-gray-600 font-medium">{ReactHtmlParser(data)}</p>
    </div>
  )
}
