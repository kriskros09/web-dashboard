export type Address = {
  streetNumber: string
  street: string
  apartment?: string
  city: string
  country: string
  region: string
  regionName: string
  postalCode: string
  phone?: string
  fax?: string
}

export type Texts = {
  langId: string
  name: string
}
export type TextsDays = {
  name: string
  short: string
}

export type TextsSectors = {
  name: string
}

export type Profession = {
  profId: string
  texts: Texts[]
  name: string
}

export type Sectors = {
  sectId: string
  texts: TextsSectors[]
}

export type Law = {
  lawId: string
  texts: Texts[]
  sectors: Sectors[]
}

export type Language = {
  languageId: string
  texts: Texts[]
}

export type Country = {
  countIso: string
  texts: Texts[]
  regions: Region[]
}

export type Region = {
  regIso: string
  texts: Texts[]
}

export type Firm = {
  firmId: string
  name: string
  addresses: Address
}

export type Weekdays = {
  dayId: number
  texts: TextsDays[]
}

export type Service = {
  servId: string
  texts: Texts[]
}

export type DropdownType = {
  value: string
  label: string
}

export type StateType = {
  professions: Profession[]
  laws: Law[]
  languages: Language[]
  countries: Country[]
  regions: Region[]
  loading: boolean
  error: unknown
  firms: Firm[]
  firmsByEmail: Firm[]
  weekdays: Weekdays[]
  services: Service[]
}

export type NewsletterInput = {
  lang: string
  email: string
}

export type GetProfessionsParmsType = {
  lang: string
}
export type ActionsParamsType = {
  getGlobalContent: undefined
  setLoading: boolean
  getFirmsByEmail: { email: string }
  getAllFirms: { status: number; orderBy: string }
  SubscribeNewsletter: {
    newsletterInput: NewsletterInput
  }
}
