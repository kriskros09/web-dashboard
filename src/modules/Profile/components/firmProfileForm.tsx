import React, { FC } from 'react'
import styled from 'styled-components'

//Component
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'

import { AddressFields } from './AddressFields'

export const FirmProfileForm: FC<any> = (props) => {
  const { onChange, onBlur, errors, pageContent, values, setFieldValue } = props

  return (
    <>
      <div className="lg:flex justify-start lg:-mx-5">
        <div className="w-full lg:w-2/3 lg:px-5">
          <InputComponent
            error={errors['name']}
            id="firm-name"
            label={pageContent?.firm.input_1}
            name="name"
            placeholder={pageContent?.firm.input_1}
            type="text"
            value={values.name}
            light
            prependLabel
            onBlur={onBlur}
            onChange={onChange}
          />
          <InputComponent
            error={errors['manager']}
            id="firm-manager"
            label={pageContent?.firm.input_2}
            name="manager"
            placeholder={pageContent?.firm.input_2}
            type="text"
            value={values.manager}
            light
            prependLabel
            onBlur={onBlur}
            onChange={onChange}
          />
          <FormRow>
            <InputComponent
              error={errors?.addresses?.[0]?.phone}
              id="firm-phone"
              label={pageContent?.firm.adr_input_8}
              name="phone"
              placeholder={pageContent?.firm.adr_input_8}
              type="phone"
              value={values.addresses[0]?.phone}
              light
              onBlur={onBlur}
              onChange={(e) => setFieldValue(`addresses[0].phone`, e.currentTarget.value)}
            />

            <InputComponent
              error={errors?.addresses?.[0]?.fax}
              id="firm-fax"
              label={pageContent?.firm.adr_input_9}
              name="fax"
              placeholder={pageContent?.firm.adr_input_9}
              type="phone"
              value={values.addresses[0]?.fax}
              light
              onBlur={onBlur}
              onChange={(e) => setFieldValue(`addresses[0].fax`, e.currentTarget.value)}
            />
          </FormRow>
          <FormRow>
            <InputComponent
              error={errors?.taxNumbers?.[0]?.number}
              id="firm-tax1"
              label="GST"
              placeholder="GST"
              type="text"
              value={values.taxNumbers[0]?.number}
              light
              prependLabel
              onChange={(e) => setFieldValue(`taxNumbers[0].number`, e.currentTarget.value)}
            />
            <InputComponent
              error={errors?.taxNumbers?.[1]?.number}
              id="firm-tax2"
              label="QST"
              placeholder="QST"
              type="text"
              value={values.taxNumbers[1]?.number}
              light
              prependLabel
              onChange={(e) => setFieldValue(`taxNumbers[1].number`, e.currentTarget.value)}
            />
          </FormRow>
        </div>
        <div className="w-full mt-5 lg:mt-0 lg:w-1/3 lg:px-5">
          {/* <ImageUpload Inputname="logo" id="firm-logo" setFieldValue={setFieldValue} />*/}
        </div>
      </div>
      {/* ADDRESSES */}
      <AddressFields content={pageContent} />
      <div className="mt-10">
        <h5 className="text-sm text-black mb-6 font-semibold">Payment information</h5>
        <FormRow>
          <InputComponent
            error={errors?.paypalEmail}
            id="payment-email"
            label={pageContent?.firm.input_3}
            name="paypalEmail"
            placeholder={pageContent?.firm.input_3}
            type="email"
            value={values.paypalEmail}
            light
            onBlur={onBlur}
            onChange={onChange}
          />
        </FormRow>
      </div>
    </>
  )
}

const FormRow = styled.div.attrs({
  className: 'lg:flex',
})`
  margin-top: 1rem;
  @media (min-width: 1024px) {
    margin: 1rem -0.5rem;
    & .input-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-wrapper {
        margin-top: 0;
      }
    }
  }
`
