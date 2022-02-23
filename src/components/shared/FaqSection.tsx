import React, { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'

import { ArrowRight } from '../../components/shared/Icons'

type FaqsType = {
  faqsContent?: any
}

export const FaqSection: FC<FaqsType> = ({ faqsContent }) => {
  const [accordeonVisibility, setAccordeonVisibility] = React.useState<any>()

  return (
    <StyledParagraphs>
      {faqsContent.map((faqCategory) => (
        <div key={faqCategory.catId} className="w-full bg-white rounded p-10 mt-10 mb-10">
          <h4 className="text-primary">{faqCategory.texts[0].name}</h4>
          {faqCategory.faqs.map((question) => (
            <div key={question.faqId}>
              <div
                className="flex flex-row justify-between font-semibold text-primary pt-10 pb-2 border-b border-gray-200 border-opacity-80 border-solid cursor-pointer"
                onClick={() =>
                  setAccordeonVisibility(
                    accordeonVisibility === `${question.faqId}-${question.faqId}`
                      ? undefined
                      : `${question.faqId}-${question.faqId}`,
                  )
                }
              >
                {ReactHtmlParser(question.texts[0].question)}
                <div
                  className={`duration-100 transition-transform transform ease-in-out ${
                    accordeonVisibility === `${question.faqId}-${question.faqId}`
                      ? 'rotate-90'
                      : 'rotate-0'
                  }`}
                >
                  <ArrowRight fillColour="primary" size={25} />
                </div>
              </div>
              <div
                className={`w-full details ${
                  accordeonVisibility === `${question.faqId}-${question.faqId}` ? 'block' : 'hidden'
                }`}
              >
                <div className="pt-4">
                  <p className="text-medium text-primary-dark">
                    {ReactHtmlParser(question.texts[0].answer)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </StyledParagraphs>
  )
}

const StyledParagraphs = styled.div`
  p {
    margin-bottom: 20px;
  }
  ul {
    margin-bottom: 20px;

    list-style: disc;
    padding-left: 20px;
  }
`
