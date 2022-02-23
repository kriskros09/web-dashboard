export type Taxe = {
  taxId: string
  name: string
  rate: string
  custAmount: number
  proAmount: number
}

export type OrderDetails = {
  proId: string
  firmId: string
  firstName: string
  lastName: string
  professions: string
  photo: string
  selectedLaw: string
  selectedSector: string
  selectedService: string
  price: number
  date: string
  time: string
  custFeePrice: number
  custSubTotal: number
  proFeePrice: number
  proSubTotal: number
  taxes: Taxe[]
  custTotal: number
  proTotal: number
  custFeePercent: number
  proFeePercent: number
}

export type ProfOrderInput = {
  proId: string
  addressId: string
  date: string
  time: string
  lawId: string
  sectId: string
  servId: string
}
export type OrderInput = {
  userId: string
  proId: string
  lawId: string
  sectId: string
  servId: string
  appointDate: string
  description: string
  poNumber: string
  addressId: string
  langId: string
  modBy: string
}

export type Error = {
  field?: string
  view: string
  message: string
}

export type CheckoutSession = {
  proId: string
  firmId: string
  firstName: string
  lastName: string
  professions: string
  selectedLaw: string
  selectedSector: string
  selectedService: string
  price: number
  custFeePrice: number
  custSubTotal: number
  proFeePrice: number
  proSubTotal: number
  taxes: Taxe[]
  custTotal: number
  proTotal: number
  custFeePercent: number
  proFeePercent: number
  lawId: string
  sectId: string
  servId: string
}

export type MandateAddress = {
  mandId: string
  userAddressId: string
}

export type State = {
  order_details: OrderDetails | null
  order_details_by_codes: ProfOrderInput | null
  errors: Error[]
  isLoading: boolean
  mandId: string
  taskId: string
  paymentStatus: number
  mandateAddress: MandateAddress | null
  // checkoutSession?: CheckoutSession
}

export type ActionParams = {
  getOrderDetails: {
    langId: string
    profOrderInput: ProfOrderInput
  }
  getMandateOrderDetails: {
    langId: string
    taskId: string
    mandId: string
  }
  placeOrder: {
    orderInput: OrderInput
  }

  MandateAddress: {
    mandId: string
    userAddressId: string
    modBy: string
  }
  setIsLoading: boolean
  recordPayment: { mandId: string; taskId: string; payMethod: string }
  ResetCheckoutState
}
