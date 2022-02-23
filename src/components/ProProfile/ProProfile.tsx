import React, { FC } from 'react'

import { Meta } from './Meta'
import { Bio } from './Bio'
import { Services } from './Services'

type ProprofileType = {
  pageContent?: any
}
const ProProfile: FC<ProprofileType> = ({ pageContent }) => {
  return (
    <div className="flex">
      <div className="w-1/5 bg-gray-100 rounded-tl-lg rounded-bl-lg p-9 side-profile">
        <Meta />
      </div>
      <div className="w-4/5 flex bg-primary-middle rounded-tr-lg rounded-br-lg p-9">
        <div className="w-1/2 border-r border-white pl-2 pr-12">
          <Bio pageContent={pageContent} />
        </div>
        <div className="w-1/2 pr-2 pl-12">
          <Services pageContent={pageContent} />
        </div>
      </div>
    </div>
  )
}

export default ProProfile
