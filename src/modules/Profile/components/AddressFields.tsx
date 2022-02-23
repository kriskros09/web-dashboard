import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { useFormikContext, FieldArray } from 'formik'

// Store
import { useStore } from '../../../store/models'
// Components
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { SelectComponent } from '../../../components/shared/forms/FormElements/Select'
import { Checkbox } from '../../../components/shared/forms/FormElements/Checkbox'
// Utils
import Utils from '../../../utils'

export const AddressFields = ({ content }): ReactElement<'FieldArray'> => {
  const { values, setFieldValue, errors, setFieldError } = useFormikContext() as any

  const [globalState] = useStore('Global')
  const countryOptions = Utils.Form.dropdownMapper(
    { value: 'countIso', label: 'texts.name' },
    globalState.countries,
  )
  const regionOptions = Utils.Form.dropdownMapper(
    { value: 'regIso', label: 'texts.name' },
    globalState.regions,
  )

  React.useEffect(() => {
    const updatedAddresses = [...values.addresses]

    // TODO: this should be moved to the action and mapped as default values
    if (updatedAddresses.length === 0) {
      updatedAddresses.push({
        addressId: '',
        apartment: '',
        city: '',
        country: '',
        phone: '',
        postalCode: '',
        region: '',
        street: '',
        streetNumber: '',
        type: 1,
        useSame: false,
      })
    }

    if (updatedAddresses.length > 0) {
      if (!values.addresses?.[0]?.useSame && typeof values.addresses[1] === 'undefined') {
        updatedAddresses.push({
          addressId: '',
          apartment: '',
          city: '',
          country: '',
          phone: '',
          postalCode: '',
          region: '',
          street: '',
          streetNumber: '',
          type: 2,
          useSame: false,
        })
      } else if (Boolean(values.addresses?.[0]?.useSame) && values.addresses.length > 1) {
        updatedAddresses.forEach((_, idx) => {
          if (idx > 0) {
            setFieldError(`addresses${idx}`, undefined)
          }
        })

        updatedAddresses.splice(1)
      }
    }

    setFieldValue('addresses', updatedAddresses)
  }, [values.addresses?.[0]?.useSame])

  return (
    <FieldArray
      name="friends"
      render={() => (
        <div className="block">
          {values.addresses.map((address, idx) => {
            if (typeof address === 'undefined') return null

            return (
              <>
                <h5 className="text-lg text-primary mb-6 font-medium mt-5">
                  {content?.firm[`title_${idx + 2}`]}
                </h5>
                <StyledFromRow>
                  <InputComponent
                    error={errors?.addresses?.[idx]?.streetNumber}
                    label={content?.firm.adr_input_1}
                    placeholder={content?.firm.adr_input_1}
                    type="text"
                    value={address?.streetNumber}
                    light
                    onChange={(e) =>
                      setFieldValue(`addresses[${idx}].streetNumber`, e.currentTarget.value)
                    }
                  />
                  <InputComponent
                    error={errors?.addresses?.[idx]?.street}
                    label={content?.firm.adr_input_2}
                    placeholder={content?.firm.adr_input_2}
                    type="text"
                    value={address?.street}
                    light
                    onChange={(e) =>
                      setFieldValue(`addresses[${idx}].street`, e.currentTarget.value)
                    }
                  />
                  <InputComponent
                    error={errors.addresses?.[idx]?.apartment}
                    label={content?.firm.adr_input_3}
                    placeholder={content?.firm.adr_input_3}
                    type="text"
                    value={address?.apartment}
                    light
                    onChange={(e) =>
                      setFieldValue(`addresses[${idx}].apartment`, e.currentTarget.value)
                    }
                  />
                  {globalState.countries.length !== 0 && (
                    <SelectComponent
                      error={errors.addresses?.[idx]?.country}
                      options={countryOptions}
                      placeholder={content?.firm.adr_input_4}
                      value={countryOptions.find((option) => option.value === address?.country)}
                      outline
                      onChange={(e) => setFieldValue(`addresses[${idx}].country`, e.value)}
                    />
                  )}
                </StyledFromRow>
                <StyledFromRow>
                  <SelectComponent
                    error={errors.addresses?.[idx]?.region}
                    options={regionOptions}
                    placeholder={content?.firm.adr_input_5}
                    value={regionOptions.find((option) => option.value === address?.region)}
                    outline
                    onChange={(e) => setFieldValue(`addresses[${idx}].region`, e.value)}
                  />
                  <InputComponent
                    error={errors.addresses?.[idx]?.city}
                    label={content?.firm.adr_input_6}
                    placeholder={content?.firm.adr_input_6}
                    type="text"
                    value={address?.city}
                    light
                    onChange={(e) => setFieldValue(`addresses[${idx}].city`, e.currentTarget.value)}
                  />
                  <InputComponent
                    error={errors.addresses?.[idx]?.postalCode}
                    label={content?.firm.adr_input_7}
                    placeholder={content?.firm.adr_input_7}
                    type="text"
                    value={address?.postalCode}
                    light
                    onChange={(e) =>
                      setFieldValue(`addresses[${idx}].postalCode`, e.currentTarget.value)
                    }
                  />
                </StyledFromRow>
                {idx === 0 && (
                  <Checkbox
                    checked={address?.useSame}
                    id="firm-hasBillingAddress"
                    label={content?.personal?.adr_check_text}
                    name={`addresses[${idx}].useSame`}
                    light
                    onChange={() =>
                      setFieldValue(`addresses[${idx}].useSame`, Boolean(!address?.useSame))
                    }
                  />
                )}
              </>
            )
          })}
        </div>
      )}
    />
  )
}

const StyledFromRow = styled.div.attrs({
  className: 'lg:flex -mx-2',
})`
  margin-top: 1rem;
  .input-wrapper {
    flex-basis: auto;
    padding: 0 0.375rem;
    &:first-of-type {
      flex-shrink: 1;
    }
    &:nth-child(2) {
      flex-grow: 1;
    }
    &:nth-child(3) {
      flex-shrink: 1;
    }
  }
  .input-wrapper + .input-wrapper,
  .select-wrapper + .input-wrapper,
  .input-wrapper + .select-wrapper {
    margin-top: 1rem;
    @media (min-width: 1024px) {
      margin: 0;
    }
  }

  .select-wrapper {
    flex-basis: auto;
    flex-grow: 1;
    padding: 0 0.375rem;
    min-width: 200px;
    margin-top: 1rem;
    @media (min-width: 1024px) {
      margin: 0;
    }
  }
`
