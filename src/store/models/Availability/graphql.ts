const queries = {
  GET_AVAILABILITIES: `
  query($proId: String, $status: Int) {
    availabilities(proId: $proId, status: $status) {
      availId
      startTime
      endTime
      startDate
      status
      weekdays {
        dayId
      }
    }
  }
  `,

  GET_DAYSOFF: `
  query($proId: String!, $status: Int, $orderBy: String) {
    daysOff(proId: $proId, status: $status, orderBy: $orderBy) {
    dayOffId
    startDate
    endDate
    status
    }
  }`,
}

const mutations = {
  DELETE_AVAILABILITY: `
  mutation($availId: String!) {
    deleteAvailability(availId: $availId) {
      availId
    }
  }
  `,
  CREATE_AVAILABILITY: `
  mutation($proId: String!, $availabilityInput: AvailabilityInput) {
    createAvailability(proId: $proId, availabilityInput: $availabilityInput) {
      availId
      startTime
      endTime
      startDate
      status
       weekdays{
        dayId
      }
    }
  }`,
  UPDATE_AVAILABILITY: `
  mutation($availId: String!, $proId: String!, $availabilityInput: AvailabilityInput) {
    updateAvailability(availId: $availId, proId: $proId, availabilityInput: $availabilityInput) {
      availId
      startTime
      endTime
      startDate
      status
       weekdays{
        dayId
      }
    }
  }`,
  UPDATE_AVAILABILITY_STATUS: `
  mutation($availId: String!, $status: Int!) {
    changeAvailabilityStatus(availId: $availId, status: $status) {
      availId
      status
    }
  }
  `,
  DELETE_DAYSOFF: `
  mutation($dayOffId: String!) {
    deleteDayOff(dayOffId: $dayOffId) {
      dayOffId
    }
  }`,
  CREATE_DAYSOFF: `
  mutation($proId: String!, $dayOffInput: DayOffInput) {
    createDayOff(proId: $proId, dayOffInput: $dayOffInput) {
      dayOffId
      startDate
      endDate
      status
    }
  }`,
  UPDATE_DAYSOFF: `
  mutation($dayOffId: String!, $dayOffInput: DayOffInput) {
    updateDayOff(dayOffId: $dayOffId, dayOffInput: $dayOffInput) {
      dayOffId
      startDate
      endDate
      status
    }
  }`,
}

export default {
  queries,
  mutations,
}
