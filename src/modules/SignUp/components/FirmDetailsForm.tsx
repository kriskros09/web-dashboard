import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { useStore } from '../../../store/models'
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { SelectComponent } from '../../../components/shared/forms/FormElements/Select'
import { Tooltip } from '../../../components/shared/Tooltip'
import { dropdownMapper } from '../../../utils/forms'
import { Checkbox } from '../../../components/shared/forms/FormElements/Checkbox'

export const FirmDetailsForm: React.FC<any> = (props): ReactElement => {
  const { onBlur, setFieldValue, errors, values, onChange, pageContent } = props
  const [globalState] = useStore('Global')

  return (
    <>
      <InputFormRow>
        <InputComponent
          error={errors['firm-name']}
          label={pageContent?.step_3_firm?.input_1_1}
          name="firm-name"
          placeholder={pageContent?.step_3_firm?.input_1_1}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['firm-street-number']}
          label={pageContent?.step_3_firm?.input_1_2}
          name="firm-street-number"
          placeholder={pageContent?.step_3_firm?.input_1_2}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          error={errors['firm-street-name']}
          label={pageContent?.step_3_firm?.input_1_3}
          name="firm-street-name"
          placeholder={pageContent?.step_3_firm?.input_1_3}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['firm-apartment']}
          label={pageContent?.step_3_firm?.input_1_4}
          name="firm-apartment"
          placeholder={pageContent?.step_3_firm?.input_1_4}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <InputFormRow>
        <SelectComponent
          error={errors['firm-country']}
          name="firm-country"
          options={dropdownMapper(
            { value: 'countIso', label: 'texts.name' },
            globalState.countries,
          )}
          placeholder={pageContent?.step_3_firm?.input_1_5}
          value={values['firm-country']}
          dropdown
          outline
          onBlur={onBlur}
          onChange={(e) => {
            setFieldValue('firm-country', e)
            setFieldValue('zip-code-country-ref', e.value)
          }}
        />
        <SelectComponent
          error={errors['firm-region']}
          name="firm-region"
          options={dropdownMapper({ value: 'regIso', label: 'texts.name' }, globalState.regions)}
          placeholder={pageContent?.step_3_firm?.input_1_6}
          value={values['firm-region']}
          dropdown
          outline
          onBlur={onBlur}
          onChange={(e) => setFieldValue('firm-region', e)}
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          error={errors['firm-city']}
          label="City"
          name="firm-city"
          placeholder={pageContent?.step_3_firm?.input_1_7}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['firm-postal-code']}
          label={pageContent?.step_3_firm?.input_1_8}
          name="firm-postal-code"
          placeholder={pageContent?.step_3_firm?.input_1_8}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          error={errors['firm-phone']}
          label={pageContent?.step_3_firm?.input_1_9}
          name="firm-phone"
          placeholder={pageContent?.step_3_firm?.input_1_9}
          type="phone"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['firm-fax']}
          label={pageContent?.step_3_firm?.input_1_10}
          name="firm-fax"
          placeholder={pageContent?.step_3_firm?.input_1_10}
          type="phone"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <p className="font-bold text-md mt-8 mb-4">{pageContent?.step_3_firm?.title_2}</p>
      <InputFormRow>
        <InputComponent
          error={errors['payment-email']}
          label={pageContent?.step_3_firm?.input_2_1}
          name="payment-email"
          placeholder={pageContent?.step_3_firm?.input_2_1}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <Tooltip>{pageContent?.step_3_firm?.paypal_infobox}</Tooltip>
      </InputFormRow>
      <p className="font-bold text-md mt-8 mb-4">{pageContent?.step_3_firm?.title_3}</p>
      <InputFormRow>
        <InputComponent
          error={errors['firm-tax-tps']}
          label="TPS"
          name="firm-tax-tps"
          placeholder="TPS"
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['firm-tax-tvq']}
          label="TVQ"
          name="firm-tax-tvq"
          placeholder="TVQ"
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <p className="italic">{pageContent?.step_3_firm?.text}</p>
      <Checkbox
        checked={values['firm-tax-omit-agreement']}
        error={errors['firm-tax-omit-agreement']}
        id="firm-tax-omit-agreement"
        label={pageContent?.step_3_firm?.check_text}
        name="firm-tax-omit-agreement"
        light
        onChange={onChange}
      />
    </>
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
