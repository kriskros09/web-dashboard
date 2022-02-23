export default {
  employee: {
    formId: '',
    fields: {
      firstName: {
        name: 'firstName',
        errors: {
          required: 'This fields is required',
          invalid: 'First name should be at least 2 characters',
        },
      },
      lastName: {
        name: 'lastName',
        errors: {
          required: 'This fields is required',
          invalid: 'First name should be at least 2 characters',
        },
      },
      proEmail: {
        name: 'proEmail',
        errors: {
          required: 'This fields is required',
          invalid: 'Invalid format',
        },
      },
      phone: {
        name: 'phone',
        errors: {
          required: 'This fields is required',
          invalid: 'Invalid format',
        },
      },
      professions: {
        name: 'professions',
        errors: {
          required: 'This fields is required',
          invalid: 'Invalid format',
        },
      },
      color: {
        name: 'color',
      },
      photo: {
        name: 'photo',
      },
      licenceNumber: {
        name: 'licence',
        errors: {
          required: 'This fields is required',
        },
      },
      licenceCountry: {
        name: 'licence-country',
        errors: {
          required: 'This fields is required',
        },
      },
      licenceRegion: {
        name: 'licence-region',
        errors: {
          required: 'This fields is required',
        },
      },
      licenceYear: {
        name: 'licence-year',
        errors: {
          required: 'This fields is required',
          invalid: 'Graduation year must be between 1950 and ',
        },
      },
    },
  },
  invite: {
    formId: '',
    fields: {
      firstName: {
        name: 'firstName',
        errors: {
          required: 'This fields is required',
          invalid: 'First name should be at least 2 characters',
        },
      },
      lastName: {
        name: 'lastName',
        errors: {
          required: 'This fields is required',
          invalid: 'First name should be at least 2 characters',
        },
      },
      email: {
        name: 'email',
        errors: {
          required: 'This fields is required',
          invalid: 'Invalid format',
        },
      },
    },
  },
  remove: {
    formId: '',
    fields: {
      password: {
        name: 'password',
        errors: {
          required: 'This fields is required',
        },
      },
      confirmPassword: {
        name: 'confirmPassword',
        errors: {
          required: 'This fields is required',
          invalid: 'Password confirmation does not match password',
        },
      },
    },
  },
}
