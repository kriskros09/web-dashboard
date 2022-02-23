import { Address } from '../Global/types'
export type Task = {
  taskId: string
  name: string
  appointDate: string
  price: string
  userFirstName: string
  userLastName: string
  law: string
  sector: string
}

export type Error = {
  field?: string
  view: string
  message: string
}

export type NextTask = {
  taskId: string
  name: string
  appointDate: string
  userFirstName: string
  userLastName: string
  userEmail: string
}

export type Review = {
  name: string
  rating: string | number
}

export type Appointment = {
  proId: string
  profile: {
    firstName: string
    lastName: string
  }
  color: string
  tasks: Task[]
}

export type Dashboard = {
  name: string
  addresses: Address[]
  nextTasks: NextTask[]
  sales: number
  tasks: number
  saleAvg: number
  reviews: Review[]
  reviewAvg: number
  calendar: Appointment
}

export type PieChart = {
  new: number
  returning: number
  total: number
}

export type RevenuChart = {
  month: string
  thisYearRevenue: number
  lastYearRevenue: number
  thisYearTransactions: number
  lastYearTransaction: number
}

export type Profession = {
  profId: string
  name: string
}

export type Pro = {
  proId: string
  profile: {
    firsName: string
    lastname: string
  }
  phone: string
  proEmail: string
  photo: string
  color: string
  status: number
  statusName: string
  professions: Profession[]
  addresses: Address[]
  tasks: number
  sales: number
}

export type State = {
  dashboard: Dashboard | null
  dashboard_firm: Dashboard | null
  isLoading: boolean
  errors: Error[]
  dashboard_clients_pro: PieChart | null
  dashboard_revenue_pro: RevenuChart[] | null
  dashboard_clients_firm: PieChart | null
  dashboard_revenue_firm: RevenuChart[] | null
  dashboard_firm_professionals: Pro[]
}

export type ActionParams = {
  GetProDashboard: {
    proId: string
    firmId: string
    langId: string
  }
  GetFirmDashboard: {
    firmId: string
    langId: string
  }
  ProClientsData: {
    proId: string
    firmId: string
    scope: number
  }
  ProRevenuData: {
    proId: string
    firmId: string
    scope: number
    langId: string
  }
  FirmClientsData: {
    firmId: string
    scope: number
  }
  FirmRevenuData: {
    firmId: string
    scope: number
    langId: string
  }
  FirmProfessionalData: {
    firmId: string
    langId: string
    searchName: string
  }
  setIsLoading: boolean
}
