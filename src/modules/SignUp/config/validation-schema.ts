/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from 'yup'

import i18next from '../../../i18n'

import model from './form-model'

const { client, lawyer } = model

const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
const phoneRegEx = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const UsPostalCodeRegEx = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/
const CaPostalCodeRegEx = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

const LawyerLicenceRegEx = /^\d{6}-\d{1}$/
const CpaLicenceRegEx = /^[A-Za-z][0-9]{6}$/

const TvqRegEx = /^\d{10}[T]{1}[Q]{1}\d{4}$|[N]{1}[R]{1}\d{9}$/
const TpsRegEx = /^\d{9}[R]{1}[T]{1}\d{4}$/

export default {
  client: [
    // step 0
    Yup.object().shape({
      [client.fields.firstName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [client.fields.lastName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [client.fields.email.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      [client.fields.phone.name]: Yup.string()
        .matches(phoneRegEx, i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      [client.fields.password.name]: Yup.string()
        .min(8, i18next.t('translation:formError.min_8'))
        .matches(passwordRegEx, i18next.t('translation:formError.passwordRegex'))
        .required(i18next.t('translation:formError.required')),
      [client.fields.confirmPassword.name]: Yup.string()
        .required(i18next.t('translation:formError.required'))
        .oneOf(
          [Yup.ref(client.fields.password.name), null],
          i18next.t('translation:formError.passwordMatching'),
        ),
      [client.fields.userAgreement.name]: Yup.boolean().oneOf(
        [true],
        i18next.t('translation:formError.required'),
      ),
    }),
  ],
  lawyer: [
    // step 0
    Yup.object().shape({
      [lawyer.fields.lawyerType.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      [lawyer.fields.firstName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.lastName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.email.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.phone.name]: Yup.string()
        .matches(phoneRegEx, i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.password.name]: Yup.string()
        .min(8, i18next.t('translation:formError.min_8'))
        .matches(passwordRegEx, i18next.t('translation:formError.passwordRegex'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.confirmPassword.name]: Yup.string()
        .required(i18next.t('translation:formError.required'))
        .oneOf(
          [Yup.ref(lawyer.fields.password.name), null],
          i18next.t('translation:formError.passwordMatching'),
        ),
      [lawyer.fields.userAgreement.name]: Yup.boolean().oneOf(
        [true],
        i18next.t('translation:formError.required'),
      ),
    }),
    // step 1
    Yup.object().shape({
      [lawyer.fields.professions.name]: Yup.array().min(
        1,
        i18next.t('translation:formError.required'),
      ),

      [lawyer.fields.languages.name]: Yup.array()
        .required(i18next.t('translation:formError.required'))
        .nullable(),

      licences: Yup.array().of(
        Yup.object().shape({
          [lawyer.fields.professionalLicence.name]: Yup.string()
            .when(lawyer.fields.licenceProfId.name, {
              is: 'PR0000000001',
              then: Yup.string()
                .required(i18next.t('translation:formError.required'))
                .matches(LawyerLicenceRegEx, i18next.t('translation:formError.invalid')),
            })
            .when(lawyer.fields.licenceProfId.name, {
              is: 'PR0000000002',
              then: Yup.string()
                .required(i18next.t('translation:formError.required'))
                .matches(CpaLicenceRegEx, i18next.t('translation:formError.invalid')),
            })
            .when(lawyer.fields.licenceProfId.name, {
              is: 'PR0000000003',
              then: Yup.string().required(i18next.t('translation:formError.required')),
            }),
          //.required(i18next.t('translation:formError.required')),
          // .matches(LawyerLicenceRegEx, lawyer.fields.professionalLicence.errors.invalid),

          [lawyer.fields.licenceRegion.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
          [lawyer.fields.licenceCountry.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
          [lawyer.fields.licenceYear.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
        }),
      ),
    }),
    // step 2
    Yup.object().shape({
      [lawyer.fields.firmId.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
    }),
    // step 3
    Yup.object().shape(
      {
        [lawyer.fields.firmId.name]: Yup.string().when(lawyer.fields.firmInviteEmail.name, {
          is: (val) => !val,
          then: Yup.string()
            .required(i18next.t('translation:formError.required'))
            .notOneOf(['other'], i18next.t('translation:formError.required')),
          otherwise: Yup.string().nullable(true),
        }),
        [lawyer.fields.firmInviteEmail.name]: Yup.string().when(lawyer.fields.firmId.name, {
          is: (val) => !val || val === 'other',
          then: Yup.string().email().required(i18next.t('translation:formError.required')),
          otherwise: Yup.string().email().nullable(true),
        }),
      },
      [lawyer.fields.firmId.name, lawyer.fields.firmInviteEmail.name],
    ),
  ],
  firm: [
    // step 0
    Yup.object().shape({
      [lawyer.fields.lawyerType.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      [lawyer.fields.firstName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.lastName.name]: Yup.string()
        .min(2, i18next.t('translation:formError.min_2'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.email.name]: Yup.string()
        .email(i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.phone.name]: Yup.string()
        .matches(phoneRegEx, i18next.t('translation:formError.invalid'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.password.name]: Yup.string()
        .min(8, i18next.t('translation:formError.min_8'))
        .matches(passwordRegEx, i18next.t('translation:formError.passwordRegex'))
        .required(i18next.t('translation:formError.required')),
      [lawyer.fields.confirmPassword.name]: Yup.string()
        .required(i18next.t('translation:formError.required'))
        .oneOf(
          [Yup.ref(lawyer.fields.password.name), null],
          i18next.t('translation:formError.passwordMatching'),
        ),
      [lawyer.fields.userAgreement.name]: Yup.boolean().oneOf(
        [true],
        i18next.t('translation:formError.required'),
      ),
    }),
    // step 1
    Yup.object().shape({
      [lawyer.fields.professions.name]: Yup.array().min(
        1,
        i18next.t('translation:formError.required'),
      ),
      //  Yup.array()
      //   .min(1, i18next.t('translation:formError.required'))
      //   .of(
      //     Yup.object().shape({
      //       label: Yup.string(),
      //       value: Yup.string(),
      //     }),
      //   )
      //   .required(),
      [lawyer.fields.languages.name]: Yup.string().required(
        i18next.t('translation:formError.required'),
      ),
      //[lawyer.fields.licences.name]: Yup.string().required(i18next.t('translation:formError.required')),
      licences: Yup.array().of(
        Yup.object().shape({
          [lawyer.fields.professionalLicence.name]: Yup.string()
            .when(lawyer.fields.licenceProfId.name, {
              is: 'PR0000000001',
              then: Yup.string()
                .required(i18next.t('translation:formError.required'))
                .matches(LawyerLicenceRegEx, i18next.t('translation:formError.invalid')),
            })
            .when(lawyer.fields.licenceProfId.name, {
              is: 'PR0000000002',
              then: Yup.string()
                .required(i18next.t('translation:formError.required'))
                .matches(CpaLicenceRegEx, i18next.t('translation:formError.invalid')),
            })
            .when(lawyer.fields.licenceProfId.name, {
              is: 'PR0000000003',
              then: Yup.string().required(i18next.t('translation:formError.required')),
            }),

          [lawyer.fields.licenceRegion.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
          [lawyer.fields.licenceCountry.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),

          [lawyer.fields.licenceYear.name]: Yup.string().required(
            i18next.t('translation:formError.required'),
          ),
        }),
      ),
    }),
    // step 2
    Yup.object().shape(
      {
        [lawyer.fields.firmName.name]: Yup.string().required(
          i18next.t('translation:formError.required'),
        ),
        [lawyer.fields.firmStreetNumber.name]: Yup.string().required(
          i18next.t('translation:formError.required'),
        ),
        [lawyer.fields.firmStreetName.name]: Yup.string().required(
          i18next.t('translation:formError.required'),
        ),
        [lawyer.fields.firmAppSuite.name]: Yup.string(),
        [lawyer.fields.firmCountry.name]: Yup.string().required(
          i18next.t('translation:formError.required'),
        ),
        [lawyer.fields.firmProvinceState.name]: Yup.string().required(
          i18next.t('translation:formError.required'),
        ),
        [lawyer.fields.firmCity.name]: Yup.string().required(
          i18next.t('translation:formError.required'),
        ),
        [lawyer.fields.firmPostalZipCode.name]: Yup.string().when(['zip-code-country-ref'], {
          is: 'US',
          then: Yup.string()
            .required(i18next.t('translation:formError.required'))
            .matches(UsPostalCodeRegEx, i18next.t('translation:formError.invalid')),
          otherwise: Yup.string()
            .required(i18next.t('translation:formError.required'))
            .matches(CaPostalCodeRegEx, i18next.t('translation:formError.invalid')),
        }),
        [lawyer.fields.firmPhone.name]: Yup.string()
          .matches(phoneRegEx, i18next.t('translation:formError.invalid'))
          .required(i18next.t('translation:formError.required')),
        [lawyer.fields.firmFax.name]: Yup.string()
          .matches(phoneRegEx, i18next.t('translation:formError.invalid'))
          .nullable(),
        [lawyer.fields.paymentEmail.name]: Yup.string()
          .email(i18next.t('translation:formError.invalid'))
          .required(i18next.t('translation:formError.required')),
        [lawyer.fields.firmTaxTPS.name]: Yup.string().when(
          lawyer.fields.firmOmitTaxAgreement.name,
          {
            is: (val) => !val,
            then: Yup.string()
              .matches(TpsRegEx, i18next.t('translation:formError.taxeTpsRegex'))
              .required(i18next.t('translation:formError.required')),
            otherwise: Yup.string().nullable(true),
          },
        ),
        [lawyer.fields.firmTaxTVQ.name]: Yup.string().when(
          lawyer.fields.firmOmitTaxAgreement.name,
          {
            is: (val) => !val,
            then: Yup.string()
              .matches(TvqRegEx, i18next.t('translation:formError.taxeTvqRegex'))
              .required(i18next.t('translation:formError.required')),
            otherwise: Yup.string().nullable(true),
          },
        ),
        [lawyer.fields.firmOmitTaxAgreement.name]: Yup.boolean().when(
          [lawyer.fields.firmTaxTPS.name, lawyer.fields.firmTaxTVQ.name],
          {
            is: (firmTaxTPS, firmTaxTVQ) => !firmTaxTPS && !firmTaxTVQ,
            then: Yup.boolean().oneOf([true], i18next.t('translation:formError.required')),
            otherwise: Yup.boolean().nullable(),
          },
        ),
      },
      [
        [lawyer.fields.firmTaxTVQ.name, lawyer.fields.firmOmitTaxAgreement.name],
        [lawyer.fields.firmTaxTPS.name, lawyer.fields.firmOmitTaxAgreement.name],
        lawyer.fields.firmOmitTaxAgreement.name,
      ],
    ),
  ],
}
