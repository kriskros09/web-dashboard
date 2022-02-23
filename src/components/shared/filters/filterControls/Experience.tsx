import React, { FC, useState } from 'react'

import { RangeComponent } from '../../forms/FormElements/Range'

import { FilterType } from './filter'
import { FilterLabel } from './FilterLabel'
import { FilterButtons } from './FilterButtons'

export const Experience: FC<FilterType> = ({
  label = 'filter name',
  light,
  content,
  getFilterData,
  resetFilter,
}) => {
  const [Experience, setExperience] = useState([] as any)

  return (
    <div>
      <FilterLabel label={label} light={light} />
      <RangeComponent
        Defaultrange={[5, 15]}
        light={light}
        max={25}
        min={0}
        placeholder="+"
        step={5}
        onChange={(e) => setExperience(e)}
      />
      <output className="hidden" name="expLow">
        {Experience[0]}
      </output>
      <output className="hidden" name="expHigh">
        {Experience[1]}
      </output>

      <FilterButtons
        label={content}
        onCancel={(e) => resetFilter(e)}
        onSubmit={() => getFilterData(Experience)}
      />
    </div>
  )
}
