import React, { FC, useState } from 'react'

// Store
import { useStore } from '../../../../store/models'
import { RangeComponent } from '../../forms/FormElements/Range'
import { Radio } from '../../forms/FormElements/Radio'

import { FilterType } from './filter'
import { FilterLabel } from './FilterLabel'
import { FilterButtons } from './FilterButtons'

export const Price: FC<FilterType> = ({
  label = 'filter name',
  light,
  content,
  getFilterData,
  resetFilter,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchState, searchActions] = useStore('Search')
  React.useEffect(() => {
    searchActions.maxPrice({
      sectId: searchState?.currentSectId || '',
    })
  }, [searchState?.currentSectId])

  const [MaxPrice, setMaxPrice] = useState<any>({ low: '', high: '', order: 'asc' })

  if (!searchState?.maxPrice) {
    return null
  }

  return (
    <div>
      <FilterLabel label={label} light={light} />
      <RangeComponent
        Defaultrange={[50, searchState?.maxPrice]}
        light={light}
        max={searchState?.maxPrice}
        min={50}
        placeholder="$"
        step={10}
        onChange={(e) => setMaxPrice({ ...MaxPrice, low: e[0], high: e[1] })}
      />
      <output className="hidden" name="priceLow">
        {MaxPrice['low']}
      </output>
      <output className="hidden" name="priceHigh">
        {MaxPrice['high']}
      </output>
      <div>
        <FilterLabel label={content?.price_text} light={light} />
        <Radio
          id="ascending"
          label={content?.price_input_1}
          light={light}
          name="sort"
          value="asc"
          onChange={(e) => setMaxPrice({ ...MaxPrice, order: e.currentTarget.value })}
        />
        <Radio
          id="descending"
          label={content?.price_input_2}
          light={light}
          name="sort"
          value="desc"
          onChange={(e) => setMaxPrice({ ...MaxPrice, order: e.currentTarget.value })}
        />
      </div>
      <FilterButtons
        label={content}
        onCancel={(e) => resetFilter(e)}
        onSubmit={() => getFilterData(MaxPrice)}
      />
    </div>
  )
}
