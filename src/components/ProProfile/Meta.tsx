/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'

// Store
import { useStore } from '../../store/models'
//Components
import { Name } from '../shared/proprofile/meta/Name'
import { ProfilePicture } from '../shared/proprofile/meta/ProfilePicture'
import { Title } from '../shared/proprofile/meta/Title'
import { Rating } from '../shared/proprofile/meta/Rating'

export const Meta: FC = () => {
  const [searchState, _] = useStore('Search')

  return (
    <div className="flex items-center md:flex-col md:items-stretch">
      <ProfilePicture className="rounded-lg md:mb-5" photo={searchState?.professionalTile.photo} />
      <div>
        <Name label={searchState?.professionalTile.firstName} />
        <Title
          className="text-xxs leading-none text-gray-500"
          label={searchState?.professionalTile.professions}
        />
        <Rating
          className="mt-2 leading-none"
          rating={searchState?.professionalTile.reviews}
          reviews={searchState?.professionalTile.reviewsNumber}
          reviewsMeta
        />
      </div>
    </div>
  )
}
