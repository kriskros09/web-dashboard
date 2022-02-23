/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from 'yup'

import i18next from '../../../i18n'

import model from './form-model'
const { contact, newsletter } = model

export default {
  contact: [
    Yup.object().shape({
      [contact.fields.name.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [contact.fields.object.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      [contact.fields.message.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      [contact.fields.email.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
    }),
  ],
  newsletter: [
    Yup.object().shape({
      [newsletter.fields.email.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
    }),
  ],
}
