import model from './form-model'

const { contact, newsletter } = model

export default {
  contact: {
    [contact.fields.name.name]: '',
    [contact.fields.email.name]: '',
    [contact.fields.object.name]: '',
    [contact.fields.message.name]: '',
  },
  newsletter: {
    [newsletter.fields.email.name]: '',
  },
}
