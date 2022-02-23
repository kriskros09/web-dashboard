/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupToFormErrors } from 'formik'
import * as Yup from 'yup'

import i18next from '../../../i18n'

import model from './form-model'
const { user, firm, pro } = model

const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
const phoneRegEx = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const UsPostalCodeRegEx = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/
const CaPostalCodeRegEx = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

const LawyerLicenceRegEx = /^\d{6}-\d{1}$/
const CpaLicenceRegEx = /^[A-Za-z][0-9]{6}$/

const TvqRegEx = /^\d{10}[T]{1}[Q]{1}\d{4}$|[N]{1}[R]{1}\d{9}$/
const TpsRegEx = /^\d{9}[R]{1}[T]{1}\d{4}$/

export default {
  address: [
    Yup.object().shape({
      streetNumber: Yup.string().required(i18next.t('translation:formError.required')),
      street: Yup.string().required(i18next.t('translation:formError.required')),
      apartment: Yup.string(),
      country: Yup.string().required(i18next.t('translation:formError.required')),
      region: Yup.string().required(i18next.t('translation:formError.required')),
      city: Yup.string().required(i18next.t('translation:formError.required')),
      postalCode: Yup.string().when(['zip-code-country-ref'], {
        is: 'US',
        then: Yup.string()
          .required('required')
          .matches(UsPostalCodeRegEx, i18next.t('translation:formError.invalid')),
        otherwise: Yup.string()
          .required('required')
          .matches(CaPostalCodeRegEx, i18next.t('translation:formError.invalid')),
      }),
    }),
  ],
  user: [
    // step 0
    Yup.object().shape({
      [user.fields.firstName.name]: Yup.string()
        .min(2)
        .required(i18next.t('translation:formError.required')),
      [user.fields.lastName.name]: Yup.string()
        .min(2)
        .required(i18next.t('translation:formError.required')),
      [user.fields.phone.name]: Yup.string().required(user.fields.phone.errors.required),
      [user.fields.email.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      addresses: Yup.array().of(
        Yup.object().shape({
          streetNumber: Yup.string().required(i18next.t('translation:formError.required')),
          street: Yup.string().required(i18next.t('translation:formError.required')),
          country: Yup.string().required(i18next.t('translation:formError.required')),
          region: Yup.string().required(i18next.t('translation:formError.required')),
          city: Yup.string().required(i18next.t('translation:formError.required')),
          postalCode: Yup.string().required(i18next.t('translation:formError.required')),
        }),
      ),
    }),
  ],
  pro: [
    Yup.object().shape({
      [pro.fields.proEmail.name]: Yup.string()
        .email('format invalide')
        .required(i18next.t('translation:formError.required')),
      [pro.fields.proPhone.name]: Yup.string()
        .required(i18next.t('translation:formError.required'))
        .matches(phoneRegEx, i18next.t('translation:formError.phone')),
      [pro.fields.languages.name]: Yup.array()
        .required(i18next.t('translation:formError.required'))
        .nullable(),

      [pro.fields.description.name]: Yup.string()
        .required(i18next.t('translation:formError.required'))
        .nullable(),

      licences: Yup.array().of(
        Yup.object().shape({
          [pro.fields.licences.values.licence.name]: Yup.string()
            .when(pro.fields.licences.values.licenceProfId.name, {
              is: 'PR0000000001',
              then: Yup.string()
                .required(i18next.t('translation:formError.required'))
                .matches(LawyerLicenceRegEx, i18next.t('translation:formError.invalid')),
            })
            .when(pro.fields.licences.values.licenceProfId.name, {
              is: 'PR0000000002',
              then: Yup.string()
                .required(i18next.t('translation:formError.required'))
                .matches(CpaLicenceRegEx, i18next.t('translation:formError.invalid')),
            })
            .when(pro.fields.licences.values.licenceProfId.name, {
              is: 'PR0000000003',
              then: Yup.string().required(i18next.t('translation:formError.required')),
            }),
          [pro.fields.licences.values.licenceRegion.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
          [pro.fields.licences.values.licenceCountry.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
          [pro.fields.licences.values.licenceYear.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
        }),
      ),
    }),
  ],
  firm: [
    Yup.object().shape({
      [firm.fields.FirmName.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      [firm.fields.FirmManager.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      [firm.fields.FirmTaxNumbers.name]: Yup.lazy((value) => {
        // if (value?.taxId === 'GST') {

        return Array.isArray(value)
          ? Yup.array()
              .of(
                Yup.object({
                  taxId: Yup.string().required(i18next.t('translation:formError.required')),
                  number: Yup.string()
                    .matches(TpsRegEx || TvqRegEx, i18next.t('translation:formError.taxeTpsRegex'))
                    .required(i18next.t('translation:formError.required')),
                }),
              )
              .required(i18next.t('translation:formError.required'))
          : Yup.string()
        // }

        // if (value?.taxId === 'PST') {
        //   return Array.isArray(value)
        //     ? Yup.array()
        //         .of(
        //           Yup.object({
        //             taxId: Yup.string().required(i18next.t('translation:formError.required')),
        //             number: Yup.string()
        //               .matches(TvqRegEx, i18next.t('translation:formError.taxeTvqRegex'))
        //               .required(i18next.t('translation:formError.required')),
        //           }),
        //         )
        //         .required(i18next.t('translation:formError.required'))
        //     : Yup.string()
        // }
      }),
      [firm.fields.addresses.name]: Yup.array().of(
        Yup.lazy((value) => {
          if (value?.type === 1) {
            return Yup.object().shape({
              phone: Yup.string().required(i18next.t('translation:formError.required')),
              streetNumber: Yup.string().required(i18next.t('translation:formError.required')),
              street: Yup.string().required(i18next.t('translation:formError.required')),
              country: Yup.string().required(i18next.t('translation:formError.required')),
              region: Yup.string().required(i18next.t('translation:formError.required')),
              city: Yup.string().required(i18next.t('translation:formError.required')),
              postalCode: Yup.string().required(i18next.t('translation:formError.required')),
            })
          }

          if (value?.type === 2) {
            return Yup.object().shape({
              streetNumber: Yup.string().required(i18next.t('translation:formError.required')),
              street: Yup.string().required(i18next.t('translation:formError.required')),
              country: Yup.string().required(i18next.t('translation:formError.required')),
              region: Yup.string().required(i18next.t('translation:formError.required')),
              city: Yup.string().required(i18next.t('translation:formError.required')),
              postalCode: Yup.string().required(i18next.t('translation:formError.required')),
            })
          }

          return Yup.string().nullable()
        }),
      ),
      [firm.fields.FirmPaymentEmail.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
    }),
  ],
}
