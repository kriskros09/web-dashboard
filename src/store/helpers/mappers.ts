import { SignUpForm } from '../models/User/types'
const fields = {
  client: [
    {
      raw: 'first_name',
      parsed: 'firstName',
    },
    {
      raw: 'last_name',
      parsed: 'lastName',
    },
    {
      raw: 'phone',
      parsed: 'phone',
    },
    {
      raw: 'password',
      parsed: 'password',
    },
    {
      raw: 'LangId',
      parsed: 'LangId',
    },
  ],
  professional: [
    {
      raw: 'professions',
      parsed: 'professions',
    },
    {
      raw: 'languages',
      parsed: 'languages',
    },
    {
      raw: 'licences',
      parsed: 'licences',
    },
    {
      raw: 'firm',
      parsed: 'firmId',
    },
    {
      raw: 'administrator_email',
      parsed: 'firmInviteEmail',
    },
  ],
  firm: [
    {
      raw: 'professions',
      parsed: 'professions',
    },
    {
      raw: 'languages',
      parsed: 'languages',
    },
    {
      raw: 'licences',
      parsed: 'licences',
    },
    {
      raw: 'firm',
      parsed: 'firm',
    },
  ],
}
const signUpFormMapper = (formData: SignUpForm, formType: string) => {
  // console.log('formData', formData)
  const userData = formData.reduce((signUpValues, field) => {
    // const parsedValues = { ...signUpValues }
    // console.log('parsedValues', parsedValues)
    const fieldsToParse =
      formType === 'client' ? fields[formType] : [...fields.client, ...fields[formType]]
    console.log('fieldsToParse', fieldsToParse)
    const requiredField = fieldsToParse.find((parsedField) => field.name.includes(parsedField.raw))

    if (requiredField) {
      signUpValues[requiredField.parsed] = field.value
    }

    // fieldsToParse.every((mappedField) => {
    //   if (field?.name?.includes(mappedField.raw)) {
    //     parsedValues[mappedField.parsed] = field.value
    //   }
    // })
    console.log('signUpValues', signUpValues)

    return signUpValues
  }, {})

  return userData
}

const userSessionMapper = (session) => {
  if (session?.decodedToken && session?.token) {
    const { decodedToken, token } = session

    return {
      isLoggedIn:
        token !== '' && typeof decodedToken !== undefined && Object.keys(decodedToken).length > 0,
      roles: decodedToken.roles,
      permissions: decodedToken.permissions,
    }
  }

  return {}
}

export { signUpFormMapper, userSessionMapper }
