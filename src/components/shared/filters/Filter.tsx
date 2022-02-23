import React, { FC, useState, useEffect, useRef } from 'react'

import { FilterToggle } from './FilterToggle'
import { FilterControlWrapper } from './FilterControlWrapper'
import { FilterControlMap } from './filterControls/'

type FilterType = {
  label: string
  content?: any
  // string to specify what filter to display (rating, price, location, etc ..)
  type: string

  light?: boolean

  filterData?:
    | ((e: React.MouseEvent<HTMLButtonElement>) => void)
    | ((e: React.FormEvent<HTMLFormElement>) => void)
}

export const Filter: FC<FilterType> = ({
  label = 'filter',
  type = 'price',
  content,
  light,
  filterData,
}) => {
  const filterTypeKey = {
    type,
  }.type
  const FilterControl: React.FC<{
    label: string
    content?: any
    light?: boolean
    getFilterData
    resetFilter
  }> = FilterControlMap[filterTypeKey]

  const el = useRef<HTMLDivElement>(null)

  const [toggle, setToggle] = useState<boolean>(false)
  const visibilityClass = toggle ? 'block' : 'hidden'

  const handleClick = (e: MouseEvent) => {
    if ((el.current as any).contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setToggle(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const handleButtonClick = (val) => {
    if (filterData) {
      filterData(val)
    }
    setToggle(false)
  }

  return (
    <div ref={el} className="relative mb-5 pb-5 lg:pb-0 border-b border-primary lg:border-0 px-1">
      <FilterToggle label={label} toggle={toggle} onClick={() => setToggle(!toggle)} />

      <FilterControlWrapper visibility={visibilityClass}>
        <FilterControl
          content={content}
          getFilterData={(e) => handleButtonClick(e)}
          label={label}
          light={light}
          resetFilter={() => setToggle(false)}
        />
      </FilterControlWrapper>
    </div>
  )
}
