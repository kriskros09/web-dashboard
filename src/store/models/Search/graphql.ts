const queries = {
  LAWYER_SEARCH: `
  query($langId: String, $searchListInput: SearchListInput) {
    search(langId: $langId, searchListInput:  $searchListInput) {
    proId
    photo
    firstName
    lastName
    price
    professions
    city
    latitude
    longitude
    reviews
    reviewsNumber
  }
}`,
  MAX_PRICE: `
  query($sectId: String!) {
    maxPrice(sectId: $sectId) {
      price
    }
  }
  `,
  PROFESSIONAL_PROFILE: `
  query($langId: String, $profTileInput: ProfessionalTileInput) {
    professionalTile(langId: $langId, profTileInput: $profTileInput){
      proId
      photo
      firstName
      lastName
      price
      city
      years
      professions
      laws
      languages
      selectedLaw
      selectedSector
      selectedService
      description
      reviews
      reviewsNumber
    }
  }
  `,
  TILES_AVAILABILITIES: `
  query($langId: String, $proId: String) {
    tileAvailabilities(langId: $langId, proId: $proId) {
      date
      available
      weekday
      short
      hours {
        time
        available
      }
    }
  }
  `,
}

export default {
  queries,
}
