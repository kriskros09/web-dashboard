import React, { FC } from 'react'

import { StarIcon } from '../../Icons'

type RatingType = {
  className?: string
  startsLabel?: string
  reviewsMeta?: boolean
  rating?: number
  reviews?: number
  starSize?: number
}
export const Rating: FC<RatingType> = ({
  className = 'text-xxs text-gray-500',
  reviewsMeta,
  reviews = 0,
  rating = '',
  starSize = 18,
  startsLabel = '',
}) => {
  // stars rating loop and color styling
  const starsTotal: React.ReactNode[] = []

  for (let i = 0; i < 5; i++) {
    const startColor = i + 1 <= rating ? 'primary' : 'gray-300'
    starsTotal.push(<StarIcon key={i} fillColour={startColor} size={starSize} />)
  }

  return (
    <div className={className}>
      <div className="flex">
        {starsTotal}
        {startsLabel ? <span className="text-sm pl-2">{startsLabel}</span> : null}
      </div>
      {reviewsMeta ? (
        <p className="reviews text-xxs text-gray-300 leading-4 font-bold">
          {reviews > 0 ? `(${reviews} reviews)` : ' (no reviews)'}
        </p>
      ) : null}
    </div>
  )
}
