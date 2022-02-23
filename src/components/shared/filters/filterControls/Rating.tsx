import React, { FC, useState } from 'react'

import { SelectComponent } from '../../forms/FormElements/Select'
import { Rating } from '../../proprofile/meta/Rating'

import { FilterType } from './filter'
import { FilterLabel } from './FilterLabel'
import { FilterButtons } from './FilterButtons'

export const RatingFilter: FC<FilterType> = ({
  label = 'filter name',
  light,
  content,
  getFilterData,
  resetFilter,
}) => {
  const options = [
    { value: 1, label: <Rating rating={1} startsLabel={content?.rating_input_2} /> },
    { value: 2, label: <Rating rating={2} startsLabel={content?.rating_input_2} /> },
    { value: 3, label: <Rating rating={3} startsLabel={content?.rating_input_2} /> },
    { value: 4, label: <Rating rating={4} startsLabel={content?.rating_input_2} /> },
  ]

  const [Rates, setRates] = useState<any>()

  return (
    <div>
      <FilterLabel label={label} light={light} />
      <SelectComponent
        name="rating"
        options={options}
        placeholder={content?.rating_input_1}
        dropdown
        outline
        onChange={(e) => setRates(e.value)}
      />
      <FilterButtons
        label={content}
        onCancel={(e) => resetFilter(e)}
        onSubmit={() => getFilterData(Rates)}
      />
    </div>
  )
}
