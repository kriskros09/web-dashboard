import React, { ReactNode, FC, useState } from 'react'

import { ClearIcon, Search } from '../../components/shared/Icons'
import { InputComponent } from '../../components/shared/forms/FormElements/Input'

type AccountLayoutType = {
  search?: boolean
  searchTitle?: string
  title: string
  subtitle?: string
  children?: {
    sort?: ReactNode
    button?: ReactNode
  }
  onSearch?: React.ChangeEventHandler<HTMLInputElement>
}
export const AccountHeading: FC<AccountLayoutType> = ({
  children,
  title = '',
  subtitle = '',
  search,
  searchTitle = 'Search',
  onSearch,
}) => {
  const [SearchInput, SetSearchInput] = useState<boolean>(false)

  return (
    <>
      {/* DESKTOP TITLE AND "FILTER" BAR */}
      <div className="w-full flex justify-between items-center xl:items-stretch xl:mb-6 pb-4 xl:pb-0 pt-4 px-4 xl:px-0">
        <div>
          <h1 className="text-lg font-semibold normal-case xl:font-normal xl:text-4xl text-primary-dark">
            {title}
          </h1>
          {subtitle ? (
            <span className="text-gray-400 text-sm italic font-light">{subtitle}</span>
          ) : null}
        </div>
        <div className="flex justify-end items-center">
          {search ? (
            <>
              <div className={`${SearchInput ? 'block' : 'hidden'} xl:block `}>
                <InputComponent
                  icon="search"
                  label="Search"
                  placeholder={searchTitle}
                  shadow
                  solid
                  onChange={onSearch}
                />
              </div>
              <div
                className={`btn p-1 inline-block relative z-0 cursor-pointer ${
                  !SearchInput ? 'block' : 'hidden'
                } xl:hidden`}
                onClick={() => SetSearchInput(!SearchInput)}
              >
                <Search fillColour="gray-300" size={32} />
              </div>
              <div
                className={`btn p-1 inline-block relative z-0 cursor-pointer ${
                  SearchInput ? 'block' : 'hidden'
                } xl:hidden`}
                onClick={() => SetSearchInput(!SearchInput)}
              >
                <ClearIcon fillColour="gray-300" size={32} />
              </div>
            </>
          ) : null}
          {children ? (
            children.sort ? (
              <div className="hidden xl:flex">{children.sort}</div>
            ) : null
          ) : null}
        </div>
      </div>

      {children ? (
        children.button ? (
          <div className="xl:hidden -mx-2 py-1 bg-white">{children.button}</div>
        ) : null
      ) : null}
    </>
  )
}
