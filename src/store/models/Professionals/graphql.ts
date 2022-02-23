const queries = {
  GET_FIRM_EMPLOYEES: `
  query($langId: String, $status: Int, $orderBy: String, $firmId: String, $searchName: String) {
    professionals(langId: $langId, status: $status, orderBy: $orderBy, firmId: $firmId, searchName: $searchName) {
      proId
      userId
      profile {
        firstName
        lastName
        email
      }
      prices {
        proId
        sectId
        price
      }
      photo
      phone
      proEmail
      color
      domains
      status
      statusName
      professions {
        profId
        name
      }
      licences {
        licId
        profId
        licence
        country
        region
        year
      }
      reviews
    }
  }`,

  GET_PRO_PRICE: `
  query($proId: String!) {
    professional(proId: $proId) {
      proId
      userId
      profile {
        firstName
        lastName
      }
      prices {
        proId
        sectId
        price
      }
    }
  }`,
}

const mutations = {
  UPDATE_PRICE: `
  mutation($proId: String!, $sectId: String!, $lawId: String!, $priceInput: PriceInput ) {
    updatePrice(proId: $proId, sectId: $sectId, lawId: $lawId, priceInput: $priceInput) {
      proId
      sectId
      price
    }
  }`,
  // UPDATE_ALL_PRICES: `
  // mutation($proId: String!, $lawId: String!, $priceInput: PriceInput ) {
  //   updateAllPrices(proId: $proId, lawId: $lawId, priceInput: $priceInput) {
  //     proId
  //   }
  // }`,
  DELETE_PRICE: `
  mutation($proId: String!, $sectId: String!) {
    deletePrice(proId: $proId, sectId: $sectId) {
      proId
      sectId
    }
  }`,
  UPDATE_FIRM_EMPLOYEE: `
  mutation($proId: String!, $professionalInput: ProfessionalInput) {
    updateFirmProfessional(proId: $proId, professionalInput: $professionalInput) {
      proId
    }
  }`,
  INVITE_EMPLOYEE: `
  mutation($firmInviteInput: FirmInviteInput) {
    inviteToFirm(firmInviteInput: $firmInviteInput) {
      sent
    }
  }`,
  REMOVE_EMPLOYEE: `
  mutation($firmRemoveInput: FirmRemoveInput) {
    removeFromFirm(firmRemoveInput: $firmRemoveInput) {
      firmId
      proId
    }
  }`,
}

export default {
  queries,
  mutations,
}
