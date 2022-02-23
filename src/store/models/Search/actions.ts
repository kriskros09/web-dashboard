/* eslint-disable @typescript-eslint/no-unused-vars */
import graphql from '../../../services/graphql'
import globalActions from '../Global/actions'

import GraphQL from './graphql'
import { searchListInput, ProfessionalTileInput, Coordinates } from './types'
const END_POINT = 'profiles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { queries } = GraphQL

const searchPro = async (
  payload: { langId: string; coordinates: Coordinates; searchListInput: searchListInput },
  context,
) => {
  const { state } = context

  const { coordinates, ...searchPayload } = payload

  const response = await graphql.executeOparation(END_POINT, queries.LAWYER_SEARCH, searchPayload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'search pro', message: errors[0].message }],
    }
  }

  if (data?.search) {
    const { search } = data
    const { searchListInput } = payload

    return {
      search,
      currentSectId: searchListInput?.sectId,
      currentServId: searchListInput?.servId,
      currentLawId: searchListInput?.lawId,
      currentCity: searchListInput?.city,
      currentCountry: searchListInput?.country,
      currentRegion: searchListInput?.region,
      coordinates,
    }
  }

  return state
}

const maxPrice = async (payload: { sectId: string }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, queries.MAX_PRICE, payload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'max price', message: errors[0].message }],
    }
  }

  if (data?.maxPrice) {
    const { maxPrice } = data

    return {
      maxPrice: maxPrice?.price,
    }
  }

  return state
}

const currentPro = async (
  payload: { langId: string; profTileInput: ProfessionalTileInput },
  context,
) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, queries.PROFESSIONAL_PROFILE, payload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'current Pro', message: errors[0].message }],
    }
  }

  if (data?.professionalTile) {
    const { professionalTile } = data
    const { profTileInput } = payload

    return {
      professionalTile,
      currentPro: profTileInput.proId,
    }
  }

  return state
}

const availabilities = async (payload: { langId: string; proId: string }, context) => {
  const { state } = context

  const response = await graphql.executeOparation(END_POINT, queries.TILES_AVAILABILITIES, payload)
  console.log('RESPONSE', response)
  console.log('PAYLOAD', payload)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, errors } = response

  if (errors?.length) {
    globalActions.setLoading(false)

    // Handle error via ui
    return {
      errors: [...state.errors, { view: 'tiles availabilities', message: errors[0].message }],
    }
  }

  if (data?.tileAvailabilities) {
    const { tileAvailabilities } = data

    return {
      tileAvailabilities,
    }
  }

  return state
}

export default {
  searchPro,
  maxPrice,
  currentPro,
  availabilities,
  //LocationInfo
}
