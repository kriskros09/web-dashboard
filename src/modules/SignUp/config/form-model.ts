export default {
  client: {
    formId: 'client-signup-form',
    fields: {
      firstName: {
        name: 'first-name',
        errors: {
          required: 'This fields is required',
          invalid: 'First name should be at least 2 characters',
        },
      },
      lastName: {
        name: 'last-name',
        errors: {
          required: 'This fields is required',
          invalid: 'Last name should be at least 2 characters',
        },
      },
      email: {
        name: 'email',
        errors: {
          required: 'This fields is required',
          invalid: 'Email is of wrong format',
        },
      },
      phone: {
        name: 'phone',
        errors: {
          required: 'This fields is required',
          invalid: 'Phone is of wrong format',
        },
      },
      password: {
        name: 'password',
        errors: {
          required: 'This fields is required',
          invalid: 'Password must be at least 8 characters long',
          regex: 'Password must contains at leat one capital letter and one number',
        },
      },
      confirmPassword: {
        name: 'confirm-password',
        errors: {
          required: 'This fields is required',
          invalid: 'Password confirmation does not match password',
        },
      },
      userAgreement: {
        name: 'user-agreement',
        errors: {
          required: 'The terms and conditions must be accepted.',
        },
      },
    },
  },
  firm: {
    formId: 'firm-signup-form',
    fields: {
      lawyerType: {
        name: 'lawyer-type',
        errors: {
          required: 'You must choose a signup type',
        },
      },
      firstName: {
        name: 'first-name',
        errors: {
          required: 'This fields is required',
          invalid: 'First name should be at least 2 characters',
        },
      },
      lastName: {
        name: 'last-name',
        errors: {
          required: 'This fields is required',
          invalid: 'Last name should be at least 2 characters',
        },
      },
      email: {
        name: 'email',
        errors: {
          required: 'This fields is required',
          invalid: 'Email is of wrong format',
        },
      },
      phone: {
        name: 'phone',
        errors: {
          required: 'This fields is required',
          invalid: 'Phone is of wrong format',
        },
      },
      password: {
        name: 'password',
        errors: {
          required: 'This fields is required',
          invalid: 'Password must be at least 8 characters long',
          regex: 'Password must contains at leat one capital letter and one number',
        },
      },
      confirmPassword: {
        name: 'confirm-password',
        errors: {
          required: 'This fields is required',
          invalid: 'Password confirmation does not match password',
        },
      },
      userAgreement: {
        name: 'user-agreement',
        errors: {
          required: 'The terms and conditions must be accepted.',
        },
      },
      professions: {
        name: 'professions',
        errors: {
          required: 'One of those fields is required',
        },
      },
      languages: {
        name: 'languages',
        errors: {
          required: 'This fields is required',
        },
      },
      licences: {
        name: 'licences',
        errors: {
          required: 'This fields is required',
          invalid: 'Ypur license format is invalid',
        },
      },
      country: {
        name: 'country',
        errors: {
          required: 'This fields is required',
        },
      },
      professionalLicence: {
        name: 'licence',
        errors: {
          required: 'This fields is required',
        },
      },
      year: {
        name: 'year',
        errors: {
          required: 'This fields is required',
          invalid: 'Graduation year must be between 1950 and ',
        },
      },
      firmName: {
        name: 'firm-name',
        errors: {
          required: 'This fields is required',
        },
      },
      firmStreetNumber: {
        name: 'firm-street-number',
        errors: {
          required: 'This fields is required',
        },
      },
      firmStreetName: {
        name: 'firm-street-name',
        errors: {
          required: 'This fields is required',
        },
      },
      firmAppSuite: {
        name: 'firm-apartment',
        errors: {
          required: 'This fields is required',
        },
      },
      firmCountry: {
        name: 'firm-country',
        errors: {
          required: 'This fields is required',
        },
      },
      firmProvinceState: {
        name: 'firm-region',
        errors: {
          required: 'This fields is required',
        },
      },
      firmCity: {
        name: 'firm-city',
        errors: {
          required: 'This fields is required',
        },
      },
      firmPostalZipCode: {
        name: 'firm-postal-code',
        errors: {
          required: 'This fields is required',
        },
      },
      firmPhone: {
        name: 'firm-phone',
        errors: {
          required: 'This fields is required',
        },
      },
      firmFax: {
        name: 'firm-fax',
        errors: {
          required: 'This fields is required',
        },
      },
      paymentEmail: {
        name: 'payment-email',
        errors: {
          required: 'This fields is required',
          invalid: 'Email format is invalid',
        },
      },
      firmTaxNumbers: {
        name: 'firm-tax-numbers',
        errors: {
          required: 'This fields is required',
        },
      },
      firmOmitTaxAgreement: {
        name: 'firm-tax-numbers',
        errors: {
          required: 'This fields is required',
        },
      },
      employeesInviteEmails: {
        name: 'employees-invite-emails',
      },
    },
  },
  lawyer: {
    formId: 'lawyer-signup-form',
    fields: {
      lawyerType: {
        name: 'lawyer-type',
        errors: {
          required: 'You must choose a signup type',
        },
      },
      firstName: {
        name: 'first-name',
        errors: {
          required: 'This fields is required',
          invalid: 'First name should be at least 2 characters',
        },
      },
      lastName: {
        name: 'last-name',
        errors: {
          required: 'This fields is required',
          invalid: 'Last name should be at least 2 characters',
        },
      },
      email: {
        name: 'email',
        errors: {
          required: 'This fields is required',
          invalid: 'Email is of wrong format',
        },
      },
      phone: {
        name: 'phone',
        errors: {
          required: 'This fields is required',
          invalid: 'Phone is of wrong format',
        },
      },
      password: {
        name: 'password',
        errors: {
          required: 'This fields is required',
          invalid: 'Password must be at least 8 characters long',
          regex: 'Password must contains at leat one capital letter and one number',
        },
      },
      confirmPassword: {
        name: 'confirm-password',
        errors: {
          required: 'This fields is required',
          invalid: 'Password confirmation does not match password',
        },
      },
      userAgreement: {
        name: 'user-agreement',
        errors: {
          required: 'The terms and conditions must be accepted.',
        },
      },
      professions: {
        name: 'professions',
        errors: {
          required: 'One of those fields is required',
        },
      },
      languages: {
        name: 'languages',
        errors: {
          required: 'This fields is required',
        },
      },
      licences: {
        name: 'licences',
        errors: {
          required: 'This fields is required',
        },
      },
      licenceCountry: {
        name: 'country',
        errors: {
          required: 'This fields is required',
        },
      },
      licenceRegion: {
        name: 'region',
        errors: {
          required: 'This fields is required',
        },
      },
      licenceProfId: {
        name: 'profId',
        errors: {
          required: 'This fields is required',
        },
      },
      professionalLicence: {
        name: 'licence',
        errors: {
          required: 'This fields is required',
          invalid: 'The licence format in invalid',
        },
      },
      licenceYear: {
        name: 'year',
        errors: {
          required: 'This fields is required',
          invalid: 'Graduation year must be between 1950 and ',
        },
      },
      firmId: {
        name: 'firm-id',
        errors: {
          required: 'This fields is required',
        },
      },
      firmInviteEmail: {
        name: 'firm-invite-email',
        errors: {
          required: 'This fields is required',
          invalid: 'The email format in invalid',
        },
      },
      firmName: {
        name: 'firm-name',
        errors: {
          required: 'This fields is required',
        },
      },
      firmStreetNumber: {
        name: 'firm-street-number',
        errors: {
          required: 'This fields is required',
        },
      },
      firmStreetName: {
        name: 'firm-street-name',
        errors: {
          required: 'This fields is required',
        },
      },
      firmAppSuite: {
        name: 'firm-apartment',
        errors: {
          required: 'This fields is required',
        },
      },
      firmCountry: {
        name: 'firm-country',
        errors: {
          required: 'This fields is required',
        },
      },
      firmProvinceState: {
        name: 'firm-region',
        errors: {
          required: 'This fields is required',
        },
      },
      firmCity: {
        name: 'firm-city',
        errors: {
          required: 'This fields is required',
        },
      },
      firmPostalZipCode: {
        name: 'firm-postal-code',
        errors: {
          required: 'This fields is required',
          invalid: 'Postal Code is of wrong format',
        },
      },
      firmPhone: {
        name: 'firm-phone',
        errors: {
          required: 'This fields is required',
          invalid: 'Phone is of wrong format',
        },
      },
      firmFax: {
        name: 'firm-fax',
        errors: {
          invalid: 'Fax is of wrong format',
        },
      },
      paymentEmail: {
        name: 'payment-email',
        errors: {
          required: 'This fields is required',
          invalid: 'Email format is invalid',
        },
      },
      firmTaxTPS: {
        name: 'firm-tax-tps',
        errors: {
          required: 'This fields is required',
          invalid: 'You need to provide TVQ number also',
          regex: 'format must be 1234567810TQ1234 or NR123456789',
        },
      },
      firmTaxTVQ: {
        name: 'firm-tax-tvq',
        errors: {
          required: 'This fields is required',
          invalid: 'You need to provide TPS number also',
          regex: 'format must be 123456789RT1234',
        },
      },
      firmOmitTaxAgreement: {
        name: 'firm-tax-omit-agreement',
        errors: {
          required: 'This fields is required',
          invalid: 'You need to accept the agreement',
        },
      },
      employeesInviteEmails: {
        name: 'employees-invite-emails',
        errors: {
          required: 'This fields is required',
          invalid: 'Email format is invalid',
        },
      },
    },
  },
}
