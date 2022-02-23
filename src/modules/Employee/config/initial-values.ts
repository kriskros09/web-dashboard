import model from './form-model'

const { employee, invite, remove } = model

export default {
  employee: {
    [employee.fields.proEmail.name]: '',
    [employee.fields.phone.name]: '',
    [employee.fields.color.name]: '',
    [employee.fields.photo.name]: '',
  },
  invite: {
    [invite.fields.firstName.name]: '',
    [invite.fields.lastName.name]: '',
    [invite.fields.email.name]: '',
  },
  remove: {
    [remove.fields.password.name]: '',
    [remove.fields.confirmPassword.name]: '',
  },
}
