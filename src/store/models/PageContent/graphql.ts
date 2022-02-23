const queries = {
  GET_PAGE_CONTENT: `
    query($page: String!, $langId: String!) {
      pageContent(page: $page, langId: $langId)
    }
`,

  GET_FAQ: `
  query($langId: String) {
    faqsByCategories(langId: $langId) {
      catId
      texts {
        name
      }
      faqs {
        faqId
        texts {
          question
          answer
        }
      }
    }
  }
  `,
  GET_LEGAL_TEXTS: `
  query($langId: String, $catId: String, $status: Int) {     
    legalTexts (langId: $langId, catId: $catId, status: $status){
      legTxtId
      texts {               
        title               
        text          
      }     
    }
  }
  `,
}

export default {
  queries,
}
