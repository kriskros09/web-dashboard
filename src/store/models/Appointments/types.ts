export type Task = {
  taskId: string
  name: string
  appointDate: string
  price: string
  userFirstName: string
  userLastName: string
  userPhone: string
  mandateDescription: string
  law: string
  sector: string
}

export type Appointment = {
  proId: string
  color: string
  profile: {
    firstName: string
    lastName: string
  }
  tasks: Task[]
}

export type Error = {
  field?: string
  view: string
  message: string
}

export type State = {
  appointments: Appointment[]
  isLoading: boolean
  errors: Error[]
}

export type ActionParams = {
  GetProAppointments: {
    proId: string
    langId: string
    dateFrom: string
    dateTo: string
  }
  GetFirmAppointments: {
    firmId: string
    langId: string
    dateFrom: string
    dateTo: string
  }
  setIsLoading: boolean
}
