import { Address } from '../Global/types'

export type Tasks = {
  taskId: string
  taskNumber: number
  name: string
  appointDate: string
  status: number
}

export type PurchaseOrders = {
  poId: string
}

export type Receipts = {
  depId: string
  depositNumber: string
}

export type Invoices = {
  invId: string
  invoiceNumber: string
}

export type ProfessionalCharges = {
  pcId: string
  pcNumber: string
}

export type Mandate = {
  mandId: string
  proId: string
  proFirstName: string
  proLastName: string
  userFirstName: string
  userLastName: string
  mandateNumber: string
  lawId: string
  law: string
  sectId: string
  sector: string
  orderDate: string
  custSubTotal: number
  status: number
  paymentStatus: number
  statusText: string
  paymentStatusText: string
  description: string
  mandateReference
  tasks: Tasks[]
  purchaseOrders: PurchaseOrders[]
  receipts: Receipts[]
  invoices: Invoices[]
  professionalCharges: ProfessionalCharges[]
}

export type PurchaseOrder = {
  poId: string
  mandId: string
  userId: string
  userFirstName: string
  userLastName: string
  proId: string
  proFirstName: string
  proLastName: string
  firmId: string
  firmName: string
  goId: string
  goAddress: Address
  userAddressId: string
  userAddress: Address
  firmAddressId: string
  firmAddress: Address
  mandateNumber: number
  mandateReference: string
  internalReference: string
  description: string
  items: PurchaseOrder_Item[]
  price: number
  custFeePrice: number
  custSubTotal: number
  taxes: Taxe[]
  custTotal: number
  orderDate: string
}

export type Taxe = {
  name: string
  custAmount: number
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
}

export type Error = {
  field?: string
  view: string
  message: string
}

export type State = {
  data: Mandate[]
  mandateStatus: Mandate | null
  isLoading: boolean
  errors: Error[]
  purchaseOrder: PurchaseOrder | null
  listInfo: {
    totalItems: number
  }
}

export type ActionParams = {
  UserPurchases: {
    langId: string
    userId: string
    perPage: number
    orderBy: string
    search: string
    page: number
    scope: number
  }
  TodoLists: {
    langId: string
    proId: string
    firmId: string
    perPage: number
    orderBy: string
    search: string
    page: number
    scope: number
  }
  MandateStatus: {
    langId: string
    mandId: string
    modBy: string
    status: number
  }
  TaskStatus: {
    taskId: string
    modBy: string
    status: number
  }
  PurchaseOrder: {
    poId: string
  }
  setIsLoading: boolean
}
