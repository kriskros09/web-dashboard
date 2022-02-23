export type Search = {
  proId: string
  photo: string
  firstName: string
  lastName: string
  price: number
  professions: string
  city: string
  latitude: string
  longitude: string
  reviews: number
  reviewsNumber: number
}

export type Coordinates = {
  lat: number
  lng: number
}

export type searchListInput = {
  city: string
  country: string
  region: string
  lawId: string
  sectId: string
  servId: string
  priceLow: number
  priceHigh: number
  priceOrder: string
  rating: number
  dateFrom: string
  dateTo: string
  expLow: number
  expHigh: number
  locKm: number
  locPostalCode: string
  languages: string
  Professionals: string
  licence: string
}
export type ProfessionalTileInput = {
  proId: string
  country: string
  region: string
  lawId: string
  sectId: string
  servId: string
}

export type Tile = {
  time: string
  available: number
}

export type TileAvailability = {
  date: string
  dayId: number
  weekday: string
  short: string
  available: number
  hours: Tile[]
}

export type State = {
  search: Search[]
  currentSectId: string
  currentServId: string
  currentLawId: string
  currentCity: string
  currentCountry: string
  currentRegion: string
  maxPrice: number
  tileAvailabilities: TileAvailability[]
  professionalTile: {
    proId: string
    photo: string
    firstName: string
    lastName: string
    price: number
    city: string
    years: number
    professions: string
    laws: string
    languages: string
    selectedLaw: string
    selectedSector: string
    selectedService: string
    reviews: number
    reviewsNumber: number
    description: string
  }
  currentPro: string
  coordinates: Coordinates
}

export type ActionParams = {
  searchPro: {
    langId: string
    coordinates: Coordinates
    searchListInput: searchListInput
  }
  maxPrice: {
    sectId: string
  }
  currentPro: {
    langId: string
    profTileInput: ProfessionalTileInput
  }
  availabilities: {
    langId: string
    proId: string
  }
  // LocationInfo: {
  //   LatLng: string
  // }
}
