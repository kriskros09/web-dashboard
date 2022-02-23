import React from 'react'
import { Link } from 'react-router-dom'

export const Confirmation: React.FC<{ pageContent?: any }> = ({ pageContent }) => {
  return (
    <div className="flex flex-col">
      <h2 className="normal-case text-primary mb-6">{pageContent?.finish?.main_title}</h2>
      <p className="text-primary-dark font-medium mb-4">{pageContent?.finish?.text}</p>
      <Link className="btn text-white bg-primary inline-block mt-12 ml-auto mr-0" to="/">
        {pageContent?.finish?.close_btn}
      </Link>
    </div>
  )
}
