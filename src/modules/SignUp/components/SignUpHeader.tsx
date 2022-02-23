import React from 'react'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'

import { Radio } from '../../../components/shared/forms/FormElements/Radio'

type SignUpHeaderType = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors: any
  shouldDisplay: boolean
  lawyerType: string | boolean | never[] | any
  pageContent?: any
}

export const SignUpHeader: React.FC<SignUpHeaderType> = ({
  onChange,
  errors,
  shouldDisplay = true,
  lawyerType,
  pageContent,
}) => {
  if (!shouldDisplay) return null

  return (
    <RadioFormRow>
      <Radio
        checked={lawyerType === 'firm'}
        label={ReactHtmlParser(pageContent?.step_1?.radio_1)}
        name="lawyer-type"
        value="firm"
        light
        onChange={onChange}
      />
      <Radio
        checked={lawyerType === 'lawyer'}
        label={ReactHtmlParser(pageContent?.step_1?.radio_2)}
        name="lawyer-type"
        value="lawyer"
        light
        onChange={onChange}
      />
      {errors && errors['lawyer-type'] && <small>{errors['lawyer-type']}</small>}
    </RadioFormRow>
  )
}

const RadioFormRow = styled.div.attrs({
  className: 'lg:flex bg-gray-100 -mx-10 px-8 py-4',
})`
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media (min-width: 992px) {
    & .input-group {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-group {
        margin-top: 0;
      }
    }
  }
`
