const queries = {
  //STEP 1 & 2
  ORDER_DETAILS: `
  query($langId: String, $profOrderInput: ProfOrderDetailsInput) {
    profOrderDetails(langId: $langId, profOrderInput: $profOrderInput) {
      proId
      firstName
      lastName
      photo
      professions
      selectedLaw
      selectedSector
      selectedService
      date
      time
      price
      custFeePrice
      custSubTotal
      taxes {
        name
        custAmount
      }
      custTotal
    }
  }`,
  //STEP 3 & 4
  MANDATE_ORDER_DETAILS: `
  query($langId: String!, $mandId: String!, $taskId: String!) {
    mandateOrderDetails(langId: $langId, mandId: $mandId, taskId: $taskId) {
      firstName
      lastName
      photo
      professions
      selectedLaw
      selectedSector
      selectedService
      date
      time
      price
      custFeePrice
      custSubTotal
      taxes {
        name
        custAmount
      }
      custTotal
    }
  }`,
}

const mutations = {
  PLACE_ORDER: `
  mutation($orderInput: OrderInput) {
    placeOrder(orderInput: $orderInput) {
      mandId
    }
  }
  `,
  PAY_ORDER: `
  mutation($mandId: String!, $taskId: String!, $payMethod: String!) {
    payOrder(mandId: $mandId, taskId: $taskId, payMethod: $payMethod) {
      paymentStatus
      firstName
      lastName
      photo
      professions
      selectedLaw
      selectedSector
      selectedService
      date
      time
      price
      custFeePrice
      custSubTotal
      taxes {
        name
        custAmount
      }
      custTotal
    }
  }`,
  MANDATE_ADDRESS: `
  mutation($mandId: String!, $userAddressId: String!, $modBy: String!) {
    mandateAddress(mandId: $mandId, userAddressId: $userAddressId, modBy: $modBy) {
      mandId
      userAddressId
    }
  }`,
}

export default {
  queries,
  mutations,
}
