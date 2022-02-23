import React from 'react'
import styled from 'styled-components'
import { FieldArray } from 'formik'

import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { AddIcon, ClearIcon } from '../../../components/shared/Icons'

export const InviteEmployeesForm: React.FC<any> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onBlur, setFieldValue, errors, values, onChange, pageContent } = props

  return (
    <>
      <p className="font-medium text-primary-dark mb-4">{pageContent?.step_4_firm?.text}</p>
      <FieldArray
        name="employees-invite-emails"
        render={(arrayHelpers) => (
          <>
            {/* <InputFormRow> */}
            {values['employees-invite-emails'].map((value, index) => (
              <InputFormRow key={value.id}>
                <InputComponent
                  id={`employees-invite-emails-${index}`}
                  label={pageContent?.step_4_firm?.input}
                  name={`employees-invite-emails.${index}`}
                  placeholder={pageContent?.step_4_firm?.input}
                  type="email"
                  value={values['employees-invite-emails'][index].value}
                  light
                  onChange={(e) =>
                    setFieldValue(`employees-invite-emails[${index}].value`, e.currentTarget.value)
                  }
                />

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    arrayHelpers.remove(index)
                  }}
                >
                  <ClearIcon fillColour="grey-100" size={20} />
                </button>
              </InputFormRow>
            ))}
            {/* </InputFormRow> */}
            <StyledAddFieldInput
              onClick={() => {
                console.log(values['employees-invite-emails'])
                arrayHelpers.push({ value: '', id: `id-${Math.floor(Math.random() * 1000)}` })
              }}
            >
              <p className="flex items-center text-primary font-semibold text-sm">
                {' '}
                <span className="block bg-primary w-6 h-6 rounded-full">
                  <AddIcon fillColour="white" size={20} />
                </span>{' '}
                {pageContent?.step_4_firm?.add_link}
              </p>
            </StyledAddFieldInput>
          </>
        )}
      />
    </>
  )
}

const InputFormRow = styled.div.attrs({
  className: 'flex',
})`
  margin-top: 1rem;
  & .select-wrapper + .select-wrapper {
    margin-top: 0.5rem;
  }
  @media (min-width: 992px) {
    margin: 0.5rem -0.5rem;
    & .select-wrapper,
    & .input-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .select-wrapper,
      & + .input-wrapper {
        margin-top: 0;
      }
    }
  }
`

const StyledAddFieldInput = styled.div`
  margin-top: 25px;
  cursor: pointer;
  & span {
    padding: 2px;
    margin-right: 15px;
  }
`
