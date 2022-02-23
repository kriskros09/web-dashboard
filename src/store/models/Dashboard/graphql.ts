const queries = {
  GET_PRO_DASHBOARD: `
    query($proId: String!, $firmId: String!, $langId: String!) {
      dashboard_pro(proId: $proId, firmId: $firmId, langId: $langId) {
        name
        addresses {
          streetNumber
          street
          apartment
          city
          countryName
          regionName
          postalCode
        }
        nextTasks {
          taskId
          name
          appointDate
          userFirstName
          userLastName
          userEmail
        }
        sales
        tasks
        saleAvg
        reviews {
          name
          rating
        }
        reviewAvg
        calendar {
          proId
          profile {
            firstName
            lastName
          }
          color
          tasks {
            taskId
            name
            appointDate
            price
            userFirstName
            userLastName
            law
            sector
          }
        }
      }
    }`,

  GET_PRO_CLIENT_DATA: `
    query($proId: String!, $firmId: String!, $scope: Int) {
      dashboard_clients_pro(proId: $proId, firmId: $firmId, scope: $scope) {
        new
        returning
        total
      }
    }`,
  GET_PRO_REVENU_DATA: `
    query($proId: String!, $firmId: String!, $scope: Int!, $langId: String) {
      dashboard_revenue_pro(proId: $proId, firmId: $firmId, scope: $scope, langId: $langId) {
        month
        thisYearRevenue
        lastYearRevenue
        thisYearTransactions
        lastYearTransaction
      }
    }`,

  GET_FIRM_DASHBOARD: `
    query($firmId: String!, $langId: String!) {
      dashboard_firm(firmId: $firmId, langId: $langId) {
        name
        nextTasks {
          taskId
          name
          appointDate
          userFirstName
          userLastName
          userEmail
        }
        sales
        tasks
        saleAvg
        calendar {
          proId
          profile {
            firstName
            lastName
          }
          color
          photo
          tasks {
            taskId
            name
            appointDate
            price
            userFirstName
            userLastName
            law
            sector
          }
        }
      }
    }`,
  GET_FIRM_CLIENT_DATA: `
    query($firmId: String!, $scope: Int) {
      dashboard_clients_firm(firmId: $firmId, scope: $scope) {
        new
        returning
        total
      }
    }`,
  GET_FIRM_REVENU_DATA: `
    query($firmId: String!, $scope: Int!, $langId: String) {
      dashboard_revenue_firm(firmId: $firmId, scope: $scope, langId: $langId) {
        month
        thisYearRevenue
        lastYearRevenue
        thisYearTransactions
        lastYearTransaction
      }
    }`,
  GET_FIRM_PRO: `
    query($firmId: String, $langId: String, $searchName: String) {
      dashboard_firm_professionals(firmId: $firmId, langId: $langId, searchName: $searchName) {
        proId
        profile {
          firstName
          lastName
        }
        phone
        proEmail
        photo
        color
        status
        statusName
        professions {
          profId
          name
        }
        addresses {
          streetNumber
          street
          apartment
          city
          country
          countryName
          region
          regionName
          postalCode
        }
        tasks
        sales
      }
    }`,
}

export default {
  queries,
}
