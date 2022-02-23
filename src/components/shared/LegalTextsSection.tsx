import React, { FC } from 'react'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'

import { ArrowRight } from '../../components/shared/Icons'

type LegalTextsType = {
  LegalTextsContent?: any
}

export const LegalTextsSection: FC<LegalTextsType> = ({ LegalTextsContent }) => {
  const [accordeonVisibility, setAccordeonVisibility] = React.useState<any>()

  return (
    <StyledParagraphs>
      <div className="w-full bg-white rounded p-10 mt-10 mb-10">
        {LegalTextsContent.map((legalSection) => (
          <div key={legalSection.legTxtId}>
            <div
              className="flex flex-row justify-between font-semibold text-primary pt-10 pb-2 border-b border-gray-200 border-opacity-80 border-solid cursor-pointer"
              onClick={() =>
                setAccordeonVisibility(
                  accordeonVisibility === `${legalSection.legTxtId}`
                    ? undefined
                    : `${legalSection.legTxtId}`,
                )
              }
            >
              {ReactHtmlParser(legalSection.texts[0].title)}
              <div
                className={`duration-100 transition-transform transform ease-in-out ${
                  accordeonVisibility === `${legalSection.legTxtId}` ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <ArrowRight fillColour="primary" size={25} />
              </div>
            </div>
            <div
              className={`w-full details ${
                accordeonVisibility === `${legalSection.legTxtId}` ? 'block' : 'hidden'
              }`}
            >
              <div className="pt-4">
                <p className="text-medium text-primary-dark">
                  {ReactHtmlParser(legalSection.texts[0].text)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
