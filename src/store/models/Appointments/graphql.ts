const queries = {
  GET_PRO_APPOINTMENTS: `
    query($langId: String!, $proId: String!, $dateFrom: String, $dateTo: String)  {
      appointmentsPro(langId: $langId, proId: $proId, dateFrom: $dateFrom, dateTo: $dateTo) {
        proId
        color
        profile {
          firstName
          lastName
        }
        tasks {
          taskId
          name
          appointDate
          price
          userFirstName
          userLastName
          userPhone
          mandateDescription
          law
          sector
        }
      }
    }`,
  GET_FIRM_APPOINTMENTS: `
    query($langId: String!, $firmId: String!, $dateFrom: String, $dateTo: String)  {
      appointmentsFirm(langId: $langId, firmId: $firmId, dateFrom: $dateFrom, dateTo: $dateTo) {
        proId
        color
        profile {
          firstName
          lastName
        }
        tasks {
          taskId
          name
          appointDate
          price
          userFirstName
          userLastName
          userPhone
          mandateDescription
          law
          sector
        }
      }
    }`,
}

export default {
  queries,
}
