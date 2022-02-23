import React, { FC } from 'react'

import ProImage from '../../../assets/img/owl-goodowl-mobile.jpg'

export const ImageText: FC<any> = (props) => {
  const { pageContent } = props

  return (
    <div className="flex flex-col bg-white p-4">
      <div className="overflow-hidden h-80 w-full">
        <img alt="" className="w-full" src={ProImage} />
      </div>
      <div className="w-10/12 mx-auto text-center pt-12 pb-6">
        <h2 className="text-primary mb-8">{pageContent?.confirmation_title}</h2>
        <p className="text-2xl text-primary-dark font-medium mb-4">{pageContent?.text_1}</p>
        {/* <p className="text-2xl font-medium text-primary-dark"> {pageContent?.text_2}</p> */}
      </div>
    </div>
  )
}
