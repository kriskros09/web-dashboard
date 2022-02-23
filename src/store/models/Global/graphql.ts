const queries = {
  GET_FIRMS_BY_EMAIL: `
  query($email: String!) {
    suggestedFirms(email: $email) {
      firmId
      name
      addresses {
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
      }
    }
  }
  `,
  GET_ALL_FIRMS: `
  query($status: Int, $orderBy: String) {
    firms(status: $status, orderBy: $orderBy) {
      firmId
      name
      addresses {
        streetNumber
        street
        apartment
        city
        country
        region
        postalCode
      }
    }
  }
  
  `,
}

const mutations = {
  NEWSLETTER_SUBSCRIPTION: `
  mutation ($newsletterInput: NewsletterInput) {  
    createNewsletter(newsletterInput: $newsletterInput){
      nlId
      langId
      emailcreatedAt
    }
  }
  `,
}

export default {
  queries,
  mutations,
}
