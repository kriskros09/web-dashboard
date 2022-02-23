const queries = {
  GET_USER_PROFILE: `
    query($userId: String!) {
      profile(userId: $userId) {
        userId
        firstName
        lastName
        birthDate
        email
        phone
        photo
        addresses {
          addressId
          type
          useSame
          streetNumber
          street
          apartment
          city
          country
          region
          postalCode
          status
        }
      }
    }`,
  GET_PRO_PROFILE: `
    query($proId: String!) {
      professional(proId: $proId) {
        phone
        proId
        proEmail
        description
        photo
        languages {
          langId
        }
        professions {
          profId
        }
        licences {
          profId
          licId
          licence
          country
          region
          year
        }
        addresses {
          type
          streetNumber
          street
          apartment
          city
          country
          region
          postalCode
          phone
          fax
        }
      }
    }`,
  GET_FIRM_PROFILE: `
    query($firmId: String!) {
      firm(firmId: $firmId) {
        firmId
        langId
        name
        manager
        logo
        paypalEmail
        taxNumbers {
          taxId
          number
        }
        addresses {
          addressId
          type
          useSame
          streetNumber
          street
          apartment
          city
          country
          region
          postalCode
          phone
          fax
          status
        }
      }
    }`,
}

const mutations = {
  USER_INFO: `
    mutation($userId: String!, $profileInput: ProfileInput) {
      updateProfile(userId: $userId, profileInput: $profileInput) {
        userId
        firstName
        lastName
        birthDate
        email
        phone
        photo
      }
    }
  `,

  PRO_INFO: `
  mutation ($proId: String!, $professionalInput: ProfessionalInput) {
    updateProfessional(proId: $proId, professionalInput: $professionalInput){
      proId
      userId
      firmId
      phone
      proEmail
      description
      photo
      languages {
        langId
      }
      professions {
        profId
      }
      licences {
        licId
        licence
        country
        region
        year
      }
    }
  }
  `,

  FIRM_INFO: `
  mutation($firmId: String!, $firmInput: FirmInput) {
    updateFirm(firmId: $firmId, firmInput: $firmInput) {
      firmId
      name
      manager
      paypalEmail
      taxNumbers {
        taxId
        number
      }
    }
  } `,

  ADRESS_CREATION: `
    mutation($addressInput: AddressInput) {
      createAddress(addressInput: $addressInput ) {
        ownerId
        addressId
        type
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
      }
    }`,

  ADRESS_UPDATE: `
    mutation($addressId: String!, $addressInput: AddressInput) {
      updateAddress(addressId: $addressId, addressInput: $addressInput) {
        ownerId
        addressId
        type
        useSame
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
      }
    }`,
  DELETE_ADRESS: `
    mutation($addressId: String!) {
      deleteAddress(addressId: $addressId) {
        addressId
      }
     }`,

  LICENCE_CREATION: `
    mutation($licenceInput: LicenceInput) {
      createLicence(licenceInput: $licenceInput) {
        licId
        profId
        licence
        country
        region
        year
      }
    }`,
  LICENCE_UPDATE: `
    mutation($licId: String!, $licenceInput: LicenceInput) {
      updateLicence(licId:$licId, licenceInput: $licenceInput) {
        licId
        profId
        licence
        country
        region
        year
      }
    }`,
}

export default {
  queries,
  mutations,
}
