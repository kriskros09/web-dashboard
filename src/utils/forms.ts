import moment from 'moment'

const dropdownMapper = (params, data) => {
  const mapped = data.map((item) => {
    const value = item[params.value]
    let label = item[params.label]

    if (params.label.includes('.')) {
      const [root, key] = params.label.split('.')
      label = item[root][0][key]
    }

    return {
      value,
      label,
    }
  })

  return mapped
}

const yearsDropdownMapper = () => {
  const today = new Date()
  const year = today.getFullYear()

  const options = Array.from(new Array(70), (v, i) => ({ value: year - i, label: year - i }))

  return options
}

const timeDropdownMapper = () => {
  const hours = [] as any

  for (let hour = 0; hour < 24; hour++) {
    hours.push({ value: moment({ hour }).format('HH:mm'), label: moment({ hour }).format('HH:mm') })
    hours.push({
      value: moment({ hour, minute: 30 }).format('HH:mm'),
      label: moment({ hour, minute: 30 }).format('HH:mm'),
    })
  }

  return hours
}

const FormatDefaultSelectedLangs = (data, globalState) => {
  const langIdSeclected = Object.keys(data).map((key) => data[key].langId)

  const availableLangs = dropdownMapper({ value: 'languageId', label: 'texts.name' }, globalState)
  const defaultlang = availableLangs.filter((availableLang) =>
    langIdSeclected.includes(availableLang.value),
  )

  return defaultlang
}

const FormatDefaultSelectedProfs = (data, globalState) => {
  const profsIdSeclected = Object.keys(data).map((key) => data[key].profId)

  const availableProfs = dropdownMapper({ value: 'profId', label: 'texts.name' }, globalState)
  const defaultprof = availableProfs.filter((availableProf) =>
    profsIdSeclected.includes(availableProf.value),
  )

  return defaultprof
}

const FormatDefaultSelectedWeekdays = (data, globalState) => {
  const weekdaysIdSeclected = Object.keys(data).map((key) => data[key].dayId)

  const availableWeekdays = dropdownMapper({ value: 'dayId', label: 'texts.name' }, globalState)
  const defaultweekday = availableWeekdays.filter((availableWeekday) =>
    weekdaysIdSeclected.includes(availableWeekday.value),
  )

  return defaultweekday
}

const formatAddress = (address) => {
  if (!address) return

  const apartment = address?.apartment ? `#${address?.apartment}` : ''

  return `${address?.city}, ${address?.streetNumber} ${address?.street}, ${apartment} ${address?.postalCode}, ${address?.region}, ${address.country}`
}

const lawyerSignUpFormDataMapper = (values, fields) => {
  return {
    [fields.firstName.name]: values[fields.firstName.name],
    [fields.lastName.name]: values[fields.lastName.name],
    [fields.email.name]: values[fields.email.name],
    [fields.phone.name]: values[fields.phone.name],
    [fields.password.name]: values[fields.password.name],
    [fields.professions.name]: values[fields.professions.name].map((profession) => ({
      profId: profession.value,
    })),
    [fields.languages.name]: values[fields.languages.name].map((language) => ({
      langId: language.value,
    })),
    [fields.licences.name]: values[fields.licences.name].map((licence) => ({
      profId: licence.profId,
      country: licence.country,
      region: licence.region,
      year: licence.year,
      licence: licence.licence,
    })),
    [fields.firmId.name]: values[fields.firmId.name]?.value || values[fields.firmId.name],
    [fields.firmInviteEmail.name]: values[fields.firmInviteEmail.name],
  }
}

const firmSignUpFormDataMapper = (values, fields) => {
  return {
    firstName: values[fields.firstName.name],
    lastName: values[fields.lastName.name],
    [fields.email.name]: values[fields.email.name],
    [fields.phone.name]: values[fields.phone.name],
    [fields.password.name]: values[fields.password.name],
    [fields.professions.name]: values[fields.professions.name].map((profession) => ({
      profId: profession.value,
    })),
    [fields.languages.name]: values[fields.languages.name].map((language) => ({
      langId: language.value,
    })),
    [fields.licences.name]: values[fields.licences.name].map((licence) => ({
      profId: licence.profId,
      country: licence.country,
      region: licence.region,
      year: licence.year,
      licence: licence.licence,
    })),
    firm: {
      name: values[fields.firmName.name],
      paypalEmail: values[fields.paymentEmail.name],
      address: {
        streetNumber: values[fields.firmStreetNumber.name],
        street: values[fields.firmStreetName.name],
        apartment: values[fields.firmAppSuite.name],
        country: values[fields.firmCountry.name].value,
        city: values[fields.firmCity.name],
        region: values[fields.firmProvinceState.name].value,
        postalCode: values[fields.firmPostalZipCode.name],
        phone: values[fields.firmPhone.name],
        fax: values[fields.firmFax.name],
      },
      taxNumbers: [
        { taxId: 'TX0000000001', number: values[fields.firmTaxTPS.name] },
        { taxId: 'TX0000000002', number: values[fields.firmTaxTVQ.name] },
      ],
    },
    invites: values[fields.employeesInviteEmails.name].map((invite) => ({
      email: invite.value,
    })),
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserFormAddressDataMapper = (values, fields) => {
  return {
    type: values.type,
    streetNumber: values.streetNumber,
    street: values.street,
    apartment: values.apartment,
    city: values.city,
    country: values.country,
    region: values.region,
    postalCode: values.postalCode,
    phone: values.phone,
    fax: values.fax,
    useSame: Boolean(values.useSame),
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProFormDataMapper = (values, fields) => {
  return {
    phone: values.phone,
    proEmail: values.proEmail,
    description: values.description,
    photo: values.photo,
    languages: values.languages.map((language) => ({
      langId: language.value,
    })),
    professions: values.professions.map((profession) => ({
      profId: profession.value,
    })),
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FirmFormDataMapper = (values, fields) => {
  return {
    paypalEmail: values.paypalEmail,
    manager: values.manager,
    name: values.name,
    taxNumbers: values.taxNumbers.map((taxNumber) => ({
      taxId: taxNumber.taxId,
      number: taxNumber.number,
    })),
  }
}

export {
  dropdownMapper,
  FormatDefaultSelectedLangs,
  FormatDefaultSelectedProfs,
  formatAddress,
  lawyerSignUpFormDataMapper,
  firmSignUpFormDataMapper,
  UserFormAddressDataMapper,
  ProFormDataMapper,
  FirmFormDataMapper,
  FormatDefaultSelectedWeekdays,
  yearsDropdownMapper,
  timeDropdownMapper,
}
