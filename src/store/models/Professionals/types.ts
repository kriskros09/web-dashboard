import { Profession } from '../Global/types'

export type Profile = {
  firstName: string
  lastName: string
}

export type Prices = {
  proId: string
  sectId: string
  price: number
}

export type PriceInput = {
  price: number
  modBy: string
}

export type Professionals = {
  proId: string
  userId: string
  color: string
  photo: string
  domains: string
  phone: string
  proEmail: string
  reviews: number
  profile: {
    firstName: string
    lastName: string
  }
  professions: Profession[]
  prices: Prices[]
}

export type FirmInviteInput = {
  firmId: string
  proId: string
  langId: string
  firstName: string
  lastName: string
  email: string
}

export type FirmRemoveInput = {
  userId: string
  password: string
  confirmPassword: string
  firmId: string
  proId: string
  modBy: string
}

export type ProfessionalInput = {
  phone: string
  proEmail: string
  photo: string
  color: string
  professions: Profession[]
  modBy: string
}

export type Error = {
  field?: string
  view: string
  message: string
}

export type State = {
  professionals: Professionals[]
  firmId: string
  updateFirmProfessional: string
  errors: Error[]
  isLoading: boolean
  updatePrice: Prices | null
  deletePrice: Prices | null
}

export type ActionParams = {
  FirmEmployees: {
    firmId: string
    status: number
    langId?: string
    orderBy?: string
    searchName?: string
  }
  UpdateFirmEmployee: {
    proId: string
    professionalInput: ProfessionalInput
  }
  InviteEmployee: {
    firmInviteInput: FirmInviteInput
  }
  RemoveEmployee: {
    firmRemoveInput: FirmRemoveInput
  }
  getProprices: {
    proId: string
  }
  UpdatePrice: {
    proId: string
    sectId: string
    lawId: string
    priceInput: PriceInput
  }
  DeletePrice: {
    proId: string
    sectId: string
  }
  setIsLoading: boolean
}
