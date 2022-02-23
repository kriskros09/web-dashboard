const queries = {
  GET_CHARGES: `
  query($langId: String, $firmId: String, $orderBy: String) {
    charges(langId: $langId, firmId: $firmId, orderBy: $orderBy) {
      pcId
      pcNumber
      mandateNumbers
      price
      fee
      subTotal
      taxes {
        name
        rate
        amount
      }
      total
      invoiceDate
      payDate
      paymentStatus
      paymentStatusText
    }
  }`,
  GET_DEPOSIT: `
  query($depId: String!){
  deposit(depId: $depId) {
     goAddress{
      texts {
        name
      }
    }
    payDate
    depositNumber
    payMethod
    payName
    amount
    mandates {
      mandateReference
      amount
      proFirstName
      proLastName
    }
    userFirstName
    userLastName
  }
}
  `,
  GET_PRO_CHARGE: `
  query($pcId: String!) {
    charge(pcId: $pcId) {
      invoiceDate
      pcNumber
      goAddress {
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
        texts {
          name
        }
      }
      firmName
      firmAddress {
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
      }
      mandates {
        mandateNumber
        mandateReference
        proFirstName
        proLastName
        userFirstName
        userLastName
        items {
          lineId
          name
          price
          fee
          subTotal
        }
      }
      subTotal
      taxes {
        name
        rate
        amount
        taxNumber
      }
      total
      langId
    }
  }  `,
  GET_INVOICE: `
  query($invId: String!) {
    invoice(invId: $invId) {
      goAddress {
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
      }
      invoiceDate
      invoiceNumber
      userCompany
      userFirstName
      userLastName
      userAddress {
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
      }
      mandates {
        mandateReference
        proFirstName
        proLastName
        internalReference
        items {
          lineId
          name
          price
          fee
          subTotal
        }
      }
      subTotal
      taxes {
        name
        rate
        amount
        taxNumber
      }
      total
    }
  }`,
}

export default {
  queries,
}
