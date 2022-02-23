import React, { FC } from 'react'

import { Filter } from '../shared/filters/Filter'
import { Toggle } from '../shared/filters/Toggle'

type SearchFilterType = {
  handleToggleMap: (e: React.MouseEvent<HTMLDivElement>) => void

  pageContent?: any

  PriceFilter: (e: React.MouseEvent<HTMLButtonElement>) => void
  RatingFilter: (e: React.MouseEvent<HTMLButtonElement>) => void
  DateFilter: (e: React.MouseEvent<HTMLButtonElement>) => void
  ExpFilter: (e: React.MouseEvent<HTMLButtonElement>) => void
  LocationFilter: (e: React.FormEvent<HTMLFormElement>) => void
  OtherFilter: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export const SearchFilter: FC<SearchFilterType> = ({
  handleToggleMap,
  pageContent,
  PriceFilter,
  RatingFilter,
  DateFilter,
  ExpFilter,
  LocationFilter,
  OtherFilter,
}) => {
  return (
    <div className="md:px-5 pt-5 bg-gray-100 hidden lg:block relative">
      <div className="container">
        <div className="flex justify-between flex-wrap -mx-1">
          <div className="flex justify-start flex-wrap">
            <Filter
              content={pageContent?.filters}
              filterData={(e) => PriceFilter(e)}
              label={pageContent?.filters.price_title}
              type="price"
            />
            <Filter
              content={pageContent?.filters}
              filterData={(e) => RatingFilter(e)}
              label={pageContent?.filters.rating_title}
              type="rating"
            />
            <Filter
              content={pageContent?.filters}
              filterData={(e) => DateFilter(e)}
              label={pageContent?.filters.appointment_title}
              type="date"
            />
            <Filter
              content={pageContent?.filters}
              filterData={(e) => ExpFilter(e)}
              label={pageContent?.filters.years_title}
              type="experience"
            />
            <Filter
              content={pageContent?.filters}
              filterData={(e) => LocationFilter(e)}
              label={pageContent?.filters.location_title}
              type="location"
            />
            <Filter
              content={pageContent?.filters}
              filterData={(e) => OtherFilter(e)}
              label={pageContent?.filters.other_title}
              type="other"
            />
          </div>

          <Toggle label={pageContent?.filters.switch_map} toggleMap={handleToggleMap} />
        </div>
      </div>
    </div>
  )
}

export default SearchFilter
