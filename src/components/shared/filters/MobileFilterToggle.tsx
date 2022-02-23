import React, { FC } from 'react'

import { Button } from '../../shared/Button'

type MobileFilterToggleType = {
  className?: string

  toggleMap: (e: React.MouseEvent<HTMLButtonElement>) => void

  // open: boolean

  filterOpen: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const MobileFilterToggle: FC<MobileFilterToggleType> = ({
  className = '',
  toggleMap,
  filterOpen,
}) => {
  return (
    <div className={`flex justify-center items-center py-4 ${className}`}>
      <Button
        className="text-primary border border-primary hover:bg-primary hover:text-white mx-3 btn-sm"
        label="filter"
        onClick={filterOpen}
      />
      <Button
        className="text-primary border border-primary hover:bg-primary hover:text-white mx-3 btn-sm"
        label="map"
        onClick={toggleMap}
      />
    </div>
  )
}
