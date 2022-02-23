const queries = {
  // GET_PURCHASES: `
  // query($langId: String, $userId: String, $orderBy: String, $search: String, $perPage: Int, $page: Int) {
  //   mandates(langId: $langId, userId: $userId, orderBy: $orderBy, search: $search, perPage: $perPage, page: $page){
  //     mandId
  //     proId
  //     proFirstName
  //     proLastName
  //     mandateNumber
  //     lawId
  //     law
  //     sectId
  //     sector
  //     orderDate
  //     custSubTotal
  //     status
  //     paymentStatus
  //     statusText
  //     paymentStatusText
  //     tasks {
  //       taskId
  //       taskNumber
  //       name
  //       appointDate
  //       status
  //     }
  //     purchaseOrders {
  //       poId
  //     }
  //     receipts {
  //       depId
  //       depositNumber
  //     }
  //     invoices {
  //       invId
  //       invoiceNumber
  //     }

  //   }
  // }
  // `,
  GET_PURCHASES: `
  query($langId: String, $userId: String, $orderBy: String, $search: String, $perPage: Int, $page: Int, $scope: Int) {
    mandatesList(langId: $langId, userId: $userId, orderBy: $orderBy, search: $search, perPage: $perPage, page: $page, scope: $scope){
      listInfo {
        totalItems
        itemsPerPages
        currentPage
        searching
        orderingBy
        currentScope
      }
      mandates {
        mandId
        proId
        proFirstName
        proLastName
        mandateNumber
        lawId
        law
        sectId
        sector
        orderDate
        custSubTotal
        status
        paymentStatus
        statusText
        paymentStatusText
        tasks {
          taskId
          taskNumber
          name
          appointDate
          status
        }
        purchaseOrders {
          poId
        }
        receipts {
          depId
          depositNumber
        }
        invoices {
          invId
          invoiceNumber
        }
      }
    }
  }
  `,
  GET_TODO: `
  query($langId: String, $proId: String, $firmId: String, $orderBy: String, $search: String, $perPage: Int, $page: Int, $scope: Int) {
    mandatesList(langId: $langId, proId: $proId, firmId: $firmId, orderBy: $orderBy, search: $search, perPage: $perPage, page: $page, scope: $scope){
      listInfo {
        totalItems
        itemsPerPages
        currentPage
        searching
        orderingBy
        currentScope
      }
      mandates{
        mandId
        userId
        userFirstName
        userLastName
        proFirstName
        proLastName
        mandateNumber
        lawId
        law
        sectId
        sector
        orderDate
        status
        paymentStatus
        statusText
        paymentStatusText
        description
        mandateReference
        tasks {
          taskId
          taskNumber
          name
          appointDate
          status
        }
      }
    }  
  }
  `,

  GET_PURCHASE_ORDER: `
  query($poId: String!) {
  purchaseOrder(poId: $poId) {
    goAddress {
      streetNumber
      street
      apartment
      city
      country
      region
      postalCode
    }
    orderDate
    mandateNumber
    mandateReference
    internalReference
    userFirstName
    userLastName
    userAddress{
      streetNumber
      street
      apartment
      city
      country
      region
      postalCode
    }
    proFirstName
    proLastName
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
    items {
      lineId
      taskNumber
      name
      price
    }
    custFeePrice
    custSubTotal
    taxes {
      name
      custAmount
    }
    custTotal
  }
}
  `,
}

const mutations = {
  MANDATE_STATUS: `
  mutation($langId: String!, $mandId: String!, $status: Int!, $modBy: String!) {
    mandateStatus(langId: $langId, mandId: $mandId, status: $status, modBy: $modBy) {
      mandId
      status
      statusText
    }
  }`,
  TASK_STATUS: `
  mutation($taskId: String!, $status: Int!, $modBy: String!) {
    taskStatus(taskId: $taskId, status: $status, modBy: $modBy) {
      taskId
      status
    }
  }`,
}

export default {
  queries,
  mutations,
}
