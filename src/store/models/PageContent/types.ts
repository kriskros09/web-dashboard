export type State = {
  global: null
  faqsByCategories: Faq[]
  legalTexts: LegalTexts[]
}

export type Texts = {
  name: string
}

export type FaqTexts = {
  faqId: string
  catId: string
  texts: Texts[]
}

export type LegalTexts = {
  legTxtId: string
  catId: string
  texts: Texts[]
}

export type Faq = {
  catId: string
  texts: Texts[]
  faqs: FaqTexts[]
}

export type ActionParams = {
  PageContent: {
    page: string
    langId: string
  }

  FaqContent: {
    langId: string
  }
  LegalTextsContent: {
    langId: string
    catId: string
    status: number
  }
}
