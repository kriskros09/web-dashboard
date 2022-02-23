import model from './form-model'

const { workingHours, daysOff } = model

export default {
  workingHours: {
    [workingHours.fields.availabilities.name]: '',
  },
  daysOff: {
    [daysOff.fields.daysoffs.name]: '',
  },
}
