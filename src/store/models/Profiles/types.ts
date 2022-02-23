import { Language } from '../Global/types'

export type Addresses = {
  addressId: string
  type: number
  useSame: number
  streetNumber: string
  street: string
  apartment: string
  city: string
  country: string
  region: string
  postalCode: string
  status: number
}

export type Error = {
  view: string
  message: string
}

export type ProfileFormUser = {
  userId: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
  photo: string
  status: number
  modBy: string
}

export type ProfileFormPro = {
  userId: string
  proEmail: string
  phone: string
  photo: string
  languages: Language[]
  professions: Profession[]
  modBy: string
  status: number
}

export type ProfileFormFirm = {
  name: string
  manager: string
  logo: string
  paypalEmail: string
  langId: string
  status: number
  taxNumbers: taxNumber[]
  modBy: string
}

export type ProfileFormAddress = {
  ownerId: string
  type: number
  useSame: number
  streetNumber: string
  street: string
  apartment: string
  city: string
  country: string
  region: string
  postalCode: string
  modBy: string
  status: number
  phone?: string
  fax?: string
}

export type Profession = {
  profId: string
  name: string
}
export type taxNumber = {
  taxId: string
  number: string
}

export type Licence = {
  licId: string
  proId: string
  profId: string
  licence: string
  country: string
  region: string
  year: number
}

export type FirmProfile = {
  firmId: string
  langId: string
  manager: string
  name: string
  paypalEmail: string
  addresses: Addresses[]
  taxNumbers: taxNumber[]
  logo: string
}

export type ProProfile = {
  proId: string
  proEmail: string
  description: string
  languages: Language[]
  professions: Profession[]
  licences: Licence[]
  photo: string
  addresses: Addresses[]
  phone: string
}

export type UserProfile = {
  userId: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
  photo: string
  addresses: Addresses[]
}

export type State = {
  user: UserProfile
  pro: ProProfile
  firm: FirmProfile
  updateAddress: ProfileFormAddress | null
  createAddress: ProfileFormAddress | null
  deleteAddress: string | null
  createLicence: Licence | null
  errors: Error[]
  isLoading: boolean
}

export type ActionParams = {
  UserProfileInfo: {
    userId: string
  }
  ProProfileInfo: {
    proId: string
  }
  FirmProfileInfo: {
    firmId: string
  }
  UserProfileForm: {
    userId: string
    profileInput: ProfileFormUser
  }
  ProProfileForm: {
    proId: string
    professionalInput: ProfileFormPro
  }
  FirmProfileForm: {
    firmId: string
    firmInput: ProfileFormFirm
  }
  ProfileAddressUpdate: {
    addressId: string
    addressInput: ProfileFormAddress
  }
  ProfileAddressCreation: {
    addressInput: ProfileFormAddress
  }
  ProfileDeleteAddress: {
    addressId: string
  }
  ProLicenceCreation: {
    licenceInput: Licence
  }
  ProLicenceUpdate: {
    licId: string
    licenceInput: Licence
  }
  setIsLoading: boolean
}
