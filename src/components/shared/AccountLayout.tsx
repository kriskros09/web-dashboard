import React, { FC } from 'react'

import { FullViewLoader } from '../../components/Loader/FullViewLoader'

import { Header } from './AccountHeader'
import { Sidebar } from './AccountSidebar'

type LayoutTypes = {
  pageContent?: any
  isLoading?: boolean
}
export const AccountLayout: FC<LayoutTypes> = ({ children, pageContent, isLoading = false }) => {
  return (
    <div className="w-full min-h-screen bg-gray-150 relative">
      <Header pageContent={pageContent} />
      <div className="flex">
        <Sidebar menusContent={pageContent?.side_menu} />
        <div className="w-full h-full xl:pt-18 px-2 xl:pr-14 3xl:pr-14 xl:pl-14 pb-32">
          <FullViewLoader showLoader={isLoading} />
          {children}
        </div>
      </div>
    </div>
  )
}
