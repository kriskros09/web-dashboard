import * as Yup from 'yup'

import i18next from '../../../i18n'

import model from './form-model'

const { employee, invite, remove } = model

const phoneRegEx = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

export default {
  employee: [
    Yup.object().shape({
      [employee.fields.proEmail.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      [employee.fields.phone.name]: Yup.string()
        .matches(phoneRegEx, i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
    }),
  ],
  invite: [
    Yup.object().shape({
      [invite.fields.firstName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [invite.fields.lastName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [invite.fields.email.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
    }),
  ],
  remove: [
    Yup.object().shape({
      [remove.fields.password.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      [remove.fields.confirmPassword.name]: Yup.string()
        .required(i18next.t('translation:formError.required'))
        .oneOf(
          [Yup.ref(remove.fields.password.name), null],
          i18next.t('translation:formError.passwordMatching'),
        ),
    }),
  ],
}
