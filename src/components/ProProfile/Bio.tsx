import React, { FC } from 'react'

// Store
import { useStore } from '../../store/models'
//Components
import { Details } from '../shared/proprofile/Details'

export const Bio: FC<{ pageContent?: any }> = ({ pageContent }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchState, _] = useStore('Search')

  return (
    <div>
      <Details data={searchState?.professionalTile.description} label={pageContent?.main_title} />
      <Details data={searchState?.professionalTile.years} label={pageContent?.title_1} />
      <Details data={searchState?.professionalTile.laws} label={pageContent?.title_2} />
      <Details data={searchState?.professionalTile.languages} label={pageContent?.title_3} />
    </div>
  )
}
