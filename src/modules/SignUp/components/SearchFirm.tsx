import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { SelectComponent } from '../../../components/shared/forms/FormElements/Select'
import { dropdownMapper } from '../../../utils/forms'
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { useStore } from '../../../store/models'

const Searchfirm: React.FC<any> = (props): ReactElement => {
  const { errors, onBlur, setFieldValue, values, pageContent } = props
  const [globalState] = useStore('Global')

  return (
    <div className="block">
      <p className="text-md font-bold mb-4">{pageContent?.step_3_pro?.title_2}</p>
      <InputFormRow>
        <SelectComponent
          error={errors['firm-id']}
          icon="search"
          name="firm-id"
          options={dropdownMapper({ value: 'firmId', label: 'name' }, globalState.firms)}
          placeholder={pageContent?.step_3_pro?.input_2}
          value={values['firm-id']}
          dropdown
          outline
          onBlur={onBlur}
          onChange={(e) => setFieldValue('firm-id', e)}
        />
      </InputFormRow>
      <p className="text-md my-6 italic">{pageContent?.step_3_pro?.text_2}</p>
      <p className="text-md font-bold mb-4">{pageContent?.step_3_pro?.title_3}</p>
      <InputFormRow>
        <InputComponent
          error={errors['firm-invite-email']}
          label={pageContent?.step_3_pro?.input_3}
          name="firm-invite-email"
          placeholder={pageContent?.step_3_pro?.input_3}
          type="email"
          value={values['firm-invite-email']}
          light
          onBlur={onBlur}
          onChange={(e) => setFieldValue('firm-invite-email', e.target.value)}
        />
      </InputFormRow>
      <p className="text-gray-300 text-sm font-semibold mt-5 italic">
        {pageContent?.step_3_pro?.text_3}
      </p>
    </div>
  )
}

const InputFormRow = styled.div.attrs({
  className: 'lg:flex',
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

export default Searchfirm
