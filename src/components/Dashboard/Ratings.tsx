import React from 'react'
import styled from 'styled-components'

import { Rating } from '../shared/proprofile/meta/Rating'

type RatingsTypes = {
  rating_type_0: string | number | undefined
  title_type_0: string | undefined
  rating_type_1: string | number | undefined
  title_type_1: string | undefined
  rating_type_2: string | number | undefined
  title_type_2: string | undefined
  rating_type_3: string | number | undefined
  title_type_3: string | undefined
  rating_avg: string | number | undefined
  title: string
}

export const Ratings: React.FC<RatingsTypes> = ({
  rating_type_0 = 0,
  rating_type_1 = 0,
  rating_type_2 = 0,
  rating_type_3 = 0,
  title_type_0 = '',
  title_type_1 = '',
  title_type_2 = '',
  title_type_3 = '',
  rating_avg = 0,
  title = 'Average Review',
}) => {
  return (
    <>
      <div className="bg-white py-4 px-5 module">
        <div className="flex items-center justify-between mb-2">
          <div className="w-1/2 flex flex-col justify-between">
            <p className="text-sm text-gray-400 font-medium">{title_type_0}</p>
          </div>
          <StyledRating className="w-1/2">
            <Rating rating={Number(rating_type_0)} starSize={21} />
          </StyledRating>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="w-1/2 flex flex-col justify-between">
            <p className="text-sm text-gray-400 font-medium">{title_type_1}</p>
          </div>
          <StyledRating className="w-1/2">
            <Rating rating={Number(rating_type_1)} starSize={21} />
          </StyledRating>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="w-1/2 flex flex-col justify-between">
            <p className="text-sm text-gray-400 font-medium">{title_type_2}</p>
          </div>
          <StyledRating className="w-1/2">
            <Rating rating={Number(rating_type_2)} starSize={21} />
          </StyledRating>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-1/2 flex flex-col justify-between">
            <p className="text-sm text-gray-400 font-medium">{title_type_3}</p>
          </div>
          <StyledRating className="w-1/2">
            <Rating rating={Number(rating_type_3)} starSize={21} />
          </StyledRating>
        </div>
      </div>
      <div className="bg-white py-4 px-5 module">
        <div className="flex items-center justify-between">
          <div className="w-1/2 flex flex-col justify-between">
            <p className="text-sm text-gray-400 font-medium">{title}</p>
          </div>
          <StyledRating className="w-1/2">
            <Rating rating={Number(rating_avg)} starSize={21} />
          </StyledRating>
        </div>
      </div>
    </>
  )
}

const StyledRating = styled.div`
  .flex {
    justify-content: flex-end;
  }
`
