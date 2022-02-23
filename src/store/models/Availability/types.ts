export type WeekDay = {
  dayId: number
}

export type Availability = {
  availId: string
  startTime: string
  endTime: string
  startDate: string
  status: number
  weekdays: WeekDay[]
}

export type DaysOff = {
  dayOffId?: string
  startDate: string
  endDate: string
  status?: number
  modBy?: string
}

export type inputAvailability = {
  startTime: string
  endTime: string
  startDate: string
  status: number
  weekdays: WeekDay[]
  modBy: string
}

export type AvailabilityStatus = {
  availId: string
  status: number
}

export type Error = {
  view: string
  message: string
}

export type State = {
  availabilities: Availability[]
  daysOff: DaysOff[]
  errors: Error[]
  isLoading: boolean
  deleteAvailability: string
  deleteDayOff: string
  updateAvailability: Availability | null
  updateDayOff: DaysOff | null
  createAvailability: Availability | null
  createDayOff: DaysOff | null
  changeAvailabilityStatus: AvailabilityStatus | null
  // vacations: Vacation[]
}

export type ActionParams = {
  getAvailabilities: {
    proId: string
    status?: number
  }
  getDaysOff: {
    proId: string
    status?: number
    orderBy?: string
  }
  RemoveAvailability: {
    availId: string
  }
  RemoveDaysOff: {
    dayOffId: string
  }
  UpdateAvailabilityStatus: {
    availId: string
    status: number
  }
  CreateAvailability: {
    proId: string
    availabilityInput: inputAvailability
  }
  CreateDaysOff: {
    proId: string
    dayOffInput: DaysOff
  }
  UpdateAvailability: {
    availId: string
    proId: string
    availabilityInput: inputAvailability
  }
  UpdateDaysOff: {
    dayOffId: string
    proId: string
    dayOffInput: DaysOff
  }

  setIsLoading: boolean
}
