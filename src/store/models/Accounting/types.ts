export type Address = {
  streetNumber: string
  street: string
  apartment: string
  city: string
  country: string
  region: string
  postalCode: string
  texts: Text[]
}

export type Text = {
  name: string
}

export type Mandate = {
  pcId: string
  mandId: string
  mandateNumber: number
  mandateReference: string
  proId: string
  proFirstName: string
  proLastName: string
  userId: string
  userFirstName: string
  userLastName: string
  items: PurchaseOrder_Item[]
  professionalCharges: []
  amount: number
  internalReference: string
}

export type Taxe = {
  pcId: string
  taxId: string
  name: string
  rate: number
  amount: number
  taxNumber: string
}

export type Charge = {
  pcId: string
  firmId: string
  goId: string
  goAddress: Address
  firmName: string
  firmAddressId: string
  firmAddress: Address
  mandates: Mandate[]
  pcNumber: number
  mandateNumbers: string
  price: number
  fee: number
  subTotal: number
  taxes: Taxe[]
  total: number
  invoiceDate: string
  payDate: string
  paymentStatus: number
  paymentStatusText: string
  invoiceNumber: string
  userCompany: string
  userFirstName: string
  userLastName: string
  userAddress: Address
}

export type PurchaseOrder_Item = {
  poId: string
  lineId: string
  mandId: string
  taskId: string
  taskNumber: number
  name: string
  price: number
  createdAt: string
  updatedAt: string
  fee: number
  subTotal: number
}

export type Deposit = {
  depId: string
  userId: string
  userFirstName: string
  userLastName: string
  goId: string
  goAddress: Address
  depositNumber: number
  amount: number
  payMethod: string
  payName: string
  payDate: string
  mandates: Mandate[]
}

export type State = {
  charges: Charge[]
  deposit: Deposit | null
  charge: Charge | null
  invoice: Charge | null
}

export type ActionParams = {
  FirmCharges: {
    langId: string
    firmId: string
    orderBy: string
  }
  Deposit: {
    depId: string
  }
  ProCharge: {
    pcId: string
  }
  Invoice: {
    invId: string
  }
}
