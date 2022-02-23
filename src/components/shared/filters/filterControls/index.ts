import { Price } from './Price'
import { DateControl } from './Date'
import { Location } from './Location'
import { RatingFilter } from './Rating'
import { Experience } from './Experience'
import { Other } from './Other'

const FilterControlMap: { [index: string]: any } = {
  price: Price,
  date: DateControl,
  location: Location,
  rating: RatingFilter,
  experience: Experience,
  other: Other,
}

export { FilterControlMap, Price, DateControl, RatingFilter, Experience, Other }
