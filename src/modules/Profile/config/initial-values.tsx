import model from './form-model'

const { user, pro, firm } = model

export default {
  user: {
    [user.fields.firstName.name]: '',
    [user.fields.lastName.name]: '',
    [user.fields.email.name]: '',
    [user.fields.phone.name]: '',
    [user.fields.birthdate.name]: '',
    photo: '',
    addresses: [],
  },
  pro: {
    [pro.fields.proEmail.name]: '',
    [pro.fields.proPhone.name]: '',
    [pro.fields.description.name]: '',
    [pro.fields.languages.name]: '',
    [pro.fields.professions.name]: [],
    [pro.fields.licences.name]: [],
  },
  firm: {
    [firm.fields.FirmName.name]: '',
    [firm.fields.FirmManager.name]: '',
    [firm.fields.FirmTaxNumbers.name]: [],
    [firm.fields.FirmPaymentEmail.name]: '',
    addresses: [],
  },
}
