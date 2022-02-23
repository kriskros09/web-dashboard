export default {
  user: {
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
      phone: {
        name: 'phone',
        errors: {
          required: 'This fields is required',
          invalid: 'Invalid format',
        },
      },
      birthdate: {
        name: 'birthDate',
      },
      // useSame: {
      //   name: 'useSame',
      // }
      addresses: {
        name: 'addresses',
        values: {
          street: {
            name: 'street',
            errors: {
              required: 'This fields is required',
            },
          },
          streetNumber: {
            name: 'streetNumber',
            errors: {
              required: 'This fields is required',
            },
          },
          apartment: {
            name: 'apartment',
          },
          country: {
            name: 'country',
            errors: {
              required: 'This fields is required',
            },
          },
          city: {
            name: 'city',
            errors: {
              required: 'This fields is required',
            },
          },
          region: {
            name: 'region',
            errors: {
              required: 'This fields is required',
            },
          },
          zip: {
            name: 'postalCode',
            errors: {
              required: 'This fields is required',
              invalid: 'Format is invalid',
            },
          },
        },
      },
    },
  },
  pro: {
    fields: {
      proEmail: {
        name: 'proEmail',
      },
      proPhone: {
        name: 'phone',
        errors: {
          required: 'This fields is required',
          invalid: 'Phone is of wrong format',
        },
      },
      languages: {
        name: 'languages',
        errors: {
          required: 'This fields is required',
        },
      },
      description: {
        name: 'description',
      },
      photo: {
        name: 'photo',
      },
      professions: {
        name: 'professions',
        errors: {
          required: 'This fields is required',
        },
      },
      licences: {
        name: 'licences',
        values: {
          licence: {
            name: 'licence',
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
          licenceYear: {
            name: 'year',
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
          licenceCountry: {
            name: 'country',
            errors: {
              required: 'This fields is required',
            },
          },
        },
      },
    },
  },
  firm: {
    fields: {
      FirmName: {
        name: 'name',
        errors: {
          required: 'This field is required',
        },
      },
      FirmManager: {
        name: 'manager',
        errors: {
          required: 'This field is required',
        },
      },
      FirmTaxNumbers: {
        name: 'taxNumbers',
        errors: {
          required: 'this field is required',
        },
      },
      FirmPaymentEmail: {
        name: 'paypalEmail',
        errors: {
          required: 'This field is required',
          invalid: 'Email is of wrong format',
        },
      },
      addresses: {
        name: 'addresses',
        values: {
          street: {
            name: 'street',
            errors: {
              required: 'This fields is required',
            },
          },
          streetNumber: {
            name: 'streetNumber',
            errors: {
              required: 'This fields is required',
            },
          },
          apartment: {
            name: 'appartment',
          },
          country: {
            name: 'country',
            errors: {
              required: 'This fields is required',
            },
          },
          city: {
            name: 'city',
            errors: {
              required: 'This fields is required',
            },
          },
          region: {
            name: 'region',
            errors: {
              required: 'This fields is required',
            },
          },
          zip: {
            name: 'postalCode',
            errors: {
              required: 'This fields is required',
            },
          },
          phone: {
            name: 'phone',
            errors: {
              invalid: 'Phone is of wrong format',
              required: 'This fields is required',
            },
          },
          fax: {
            name: 'fax',
            errors: {
              invalid: 'Fax is of wrong format',
            },
          },
          hasBillingAddress: {
            name: 'useSame',
          },
        },
      },
    },
  },
}
