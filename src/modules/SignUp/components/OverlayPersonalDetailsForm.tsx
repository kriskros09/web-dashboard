import React from 'react'
import styled from 'styled-components'

import { Checkbox } from '../../../components/shared/forms/FormElements/Checkbox'
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'

const InputFormRow = styled.div.attrs({
  className: 'lg:flex',
})`
  margin-top: 1rem;
  @media (min-width: 992px) {
    margin: 0.5rem -0.5rem;
    & .input-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-wrapper {
        margin-top: 0;
      }
    }
  }
`

export const OverlayPersonalDetailsForm: React.FC<any> = (props) => {
  const { onChange, errors, values, pageContent, initialValues, setFieldValue } = props

  return (
    <div className="block">
      <InputFormRow>
        <InputComponent
          error={errors['first-name'] as string}
          id="user-firstname"
          label={pageContent?.step_1?.input_1}
          name="first-name"
          placeholder={pageContent?.step_1?.input_1}
          type="text"
          value={initialValues['first-name']}
          disabled
          light
          onChange={(e) => setFieldValue(e.currentTarget.value)}
        />
        <InputComponent
          error={errors['last-name'] as string}
          id="user-lastname"
          label={pageContent?.step_1?.input_2}
          name="last-name"
          placeholder={pageContent?.step_1?.input_2}
          type="text"
          value={values['last-name']}
          disabled
          light
          onChange={onChange}
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          error={errors['email'] as string}
          id="user-email"
          label={pageContent?.step_1?.input_3}
          name="email"
          placeholder={pageContent?.step_1?.input_3}
          type="email"
          value={values['email']}
          light
          onChange={onChange}
        />
        <InputComponent
          error={errors['phone'] as string}
          id="user-phone"
          label={pageContent?.step_1?.input_4}
          name="phone"
          placeholder={pageContent?.step_1?.input_4}
          type="phone"
          value={values['phone']}
          light
          onChange={onChange}
        />
      </InputFormRow>

      <Checkbox
        checked={values['user-agreement']}
        error={errors['user-agreement'] as string}
        id="user-agreement"
        label={pageContent?.step_1?.check_client}
        name="user-agreement"
        light
        onChange={onChange}
      />
    </div>
  )
}
