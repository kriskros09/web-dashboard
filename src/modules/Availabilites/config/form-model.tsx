export default {
  workingHours: {
    formId: '',
    fields: {
      availabilities: {
        name: 'availabilities',
      },
      weekDays: {
        name: 'weekdays',
        errors: {
          required: 'This fields is required',
        },
      },
      startingTime: {
        name: 'startTime',
        errors: {
          required: 'This fields is required',
        },
      },
      endingTime: {
        name: 'endTime',
        errors: {
          required: 'This fields is required',
        },
      },
      status: {
        name: 'status',
      },
    },
  },
  daysOff: {
    formId: '',
    fields: {
      daysoffs: {
        name: 'daysOff',
      },
      startDate: {
        name: 'startDate',
      },
      endDate: {
        name: 'endDate',
      },
    },
  },
}
