import React, { FC } from 'react'
import styled from 'styled-components'

import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { AddressFields } from '../components/AddressFields'

export const UserProfileForm: FC<any> = (props) => {
  const { onChange, onBlur, errors, pageContent, values } = props

  return (
    <div>
      <div className="lg:flex justify-start lg:-mx-5">
        <div className="w-full lg:w-2/3 lg:px-5">
          <FormRow>
            <InputComponent
              error={errors['firstName'] as string}
              id="user-first-name"
              label={pageContent?.personal.input_1}
              name="firstName"
              placeholder={pageContent?.personal.input_1}
              type="text"
              value={values.firstName}
              light
              onBlur={onBlur}
              onChange={onChange}
            />

            <InputComponent
              error={errors['lastName'] as string}
              id="user-last-name"
              label={pageContent?.personal.input_2}
              name="lastName"
              placeholder={pageContent?.personal.input_2}
              type="text"
              value={values.lastName}
              light
              onBlur={onBlur}
              onChange={onChange}
            />
          </FormRow>
          <FormRow>
            <InputComponent
              error={errors['email'] as string}
              id="user-email"
              label={pageContent?.personal.input_3}
              name="email"
              placeholder={pageContent?.personal.input_3}
              type="email"
              value={values.email}
              light
              onBlur={onBlur}
              onChange={onChange}
            />
            <InputComponent
              error={errors?.phone}
              id="user-phone"
              label={pageContent?.personal.input_4}
              name="phone"
              placeholder={pageContent?.personal.input_4}
              type="phone"
              value={values?.phone}
              light
              onBlur={onBlur}
              onChange={onChange}
            />
          </FormRow>
          <FormRow>
            <InputComponent
              id="user-birthdate"
              label={pageContent?.personal.input_5}
              name="birthDate"
              placeholder={pageContent?.personal.input_5}
              type="text"
              value={values.birthDate ?? ''}
              light
              onBlur={onBlur}
              onChange={onChange}
            />
          </FormRow>
        </div>
        <div className="w-full mt-5 lg:mt-0 lg:w-1/3 lg:px-5">
          {/* <ImageUpload Inputname="photo" id="user-photo" setFieldValue={setFieldValue} /> */}
        </div>
      </div>
      {/* ADDRESSES */}
      <AddressFields content={pageContent} />
      {/* <FieldArray
        name="addresses"
        render={(arrayHelpers) => (
          <>
            <h5 className="text-lg text-primary mb-6 font-medium">
              {pageContent?.personal.title_2}
            </h5>
            <input
              className="hidden"
              id="user-address-type-1"
              name="type1"
              type="checkbox"
              value={1}
            />
            <StyledFromRow>
              <InputComponent
                error={errors['streetNumber'] as string}
                id="user-streetnumber-perso"
                label={pageContent?.personal.adr_input_1}
                name="streetNumber"
                placeholder={pageContent?.personal.adr_input_1}
                type="text"
                value={values.addresses[0]?.streetNumber}
                light
                onBlur={onBlur}
                onChange={(e) => setFieldValue(`addresses[0].streetNumber`, e.currentTarget.value)}
              />
              <InputComponent
                error={errors['street'] as string}
                id="user-streetname-perso"
                label={pageContent?.personal.adr_input_2}
                name="street"
                placeholder={pageContent?.personal.adr_input_2}
                type="text"
                value={values.addresses[0]?.street}
                light
                onBlur={onBlur}
                onChange={(e) => setFieldValue(`addresses[0].street`, e.currentTarget.value)}
              />
              <InputComponent
                id="user-appnumber-perso"
                label={pageContent?.personal.adr_input_3}
                name="apartment"
                placeholder={pageContent?.personal.adr_input_3}
                type="text"
                value={values.addresses[0]?.apartment}
                light
                onBlur={onBlur}
                onChange={(e) => setFieldValue(`addresses[0].apartment`, e.currentTarget.value)}
              />
              {globalState.countries.length !== 0 ? (
                <SelectComponent
                  defaultSelected={values.addresses[0]?.country}
                  name="country"
                  options={Utils.Form.dropdownMapper(
                    { value: 'countIso', label: 'texts.name' },
                    globalState.countries,
                  )}
                  placeholder={pageContent?.personal.adr_input_4}
                  outline
                  onChange={(e) => setFieldValue(`addresses[0].country`, e.value)}
                />
              ) : null}
            </StyledFromRow>
            <StyledFromRow>
              {globalState.regions.length !== 0 ? (
                <SelectComponent
                  defaultSelected={values.addresses[0]?.region}
                  name="region"
                  options={Utils.Form.dropdownMapper(
                    { value: 'regIso', label: 'texts.name' },
                    globalState.regions,
                  )}
                  placeholder={pageContent?.personal.adr_input_5}
                  outline
                  onChange={(e) => setFieldValue(`addresses[0].region`, e.value)}
                />
              ) : null}
              <InputComponent
                id="user-city-perso"
                label={pageContent?.personal.adr_input_6}
                name="city"
                placeholder={pageContent?.personal.adr_input_6}
                type="text"
                value={values.addresses[0]?.city}
                light
                onBlur={onBlur}
                // onChange={(e) =>
                //   setFieldValue(`addresses[${index}].city`, e.currentTarget.value)
                // }
              />
              <InputComponent
                id="user-zip-perso"
                label={pageContent?.personal.adr_input_7}
                name="postalCode"
                placeholder={pageContent?.personal.adr_input_7}
                type="text"
                value={values.addresses[0]?.postalCode}
                light
                onBlur={onBlur}
                onChange={(e) => setFieldValue(`addresses[0].postalCode`, e.currentTarget.value)}
              />
            </StyledFromRow>
            <Checkbox
              checked={Boolean(values.addresses[0]?.useSame)}
              id="user-usesame"
              label={pageContent?.personal.adr_check_text}
              name="useSame"
              light
              onChange={async () => {
                await setFieldValue(`addresses[0].useSame`, Boolean(!values.addresses[0]?.useSame))

                if (
                  (values.addresses[0]?.useSame === 1 || values.addresses[0]?.useSame === true) &&
                  values['addresses'].length < 1
                ) {
                  console.log('PUSH')
                  arrayHelpers.push({
                    addressId: '',
                    streetNumber: '',
                    street: '',
                    apartment: '',
                    city: '',
                    country: '',
                    region: '',
                    postalCode: '',
                    type: 2,
                    useSame: 0,
                  })
                } else {
                  console.log('REMOVE')

                  arrayHelpers.remove(1)
                }
              }}
            />
            {/* <InputFormRow> */}
      {/* */}
      {/* BILLING ADDRESS
      // <div className={`mt-5 ${values.useSame ? 'hidden' : 'block'}`}>
      //   <h5 className="text-lg text-primary mb-6 font-medium">{pageContent?.personal.title_3}</h5>
      //   <StyledFromRow>
      //     <input
      //       className="hidden"
      //       id="user-address-type-2"
      //       name="type2"
      //       type="checkbox"
      //       value={2}
      //     />

      //     <InputComponent
      //       id="user-streetnumber-billing"
      //       label={pageContent?.personal.adr_input_1}
      //       name="streetNumber2"
      //       placeholder={pageContent?.personal.adr_input_1}
      //       type="text"
      //       value={address2[0]?.streetNumber}
      //       light
      //       onBlur={onBlur}
      //       onChange={(e) =>
      //         setFieldValue(`addresses[${address2Index}].streetNumber`, e.currentTarget.value)
      //       }
      //     />
      //     <InputComponent
      //       id="user-streetname-billing"
      //       label={pageContent?.personal.adr_input_2}
      //       name="street2"
      //       placeholder={pageContent?.personal.adr_input_2}
      //       type="text"
      //       value={address2[0]?.street}
      //       light
      //       onBlur={onBlur}
      //       onChange={(e) =>
      //         setFieldValue(`addresses[${address2Index}].street`, e.currentTarget.value)
      //       }
      //     />
      //     <InputComponent
      //       id="user-appnumber-billing"
      //       label={pageContent?.personal.adr_input_3}
      //       name="apartment2"
      //       placeholder={pageContent?.personal.adr_input_3}
      //       type="text"
      //       value={address2[0]?.apartment}
      //       light
      //       onBlur={onBlur}
      //       onChange={(e) =>
      //         setFieldValue(`addresses[${address2Index}].apartment`, e.currentTarget.value)
      //       }
      //     />
      //     {globalState.countries.length !== 0 ? (
      //       <SelectComponent
      //         defaultSelected={address2[0]?.country}
      //         name="country2"
      //         options={Utils.Form.dropdownMapper(
      //           { value: 'countIso', label: 'texts.name' },
      //           globalState.countries,
      //         )}
      //         placeholder={pageContent?.personal.adr_input_4}
      //         outline
      //         onChange={(e) => setFieldValue(`addresses[${address2Index}].country`, e.value)}
      //       />
      //     ) : null}
      //   </StyledFromRow>
      //   <StyledFromRow>
      //     {globalState.regions.length !== 0 ? (
      //       <SelectComponent
      //         defaultSelected={address2[0]?.region}
      //         name="region2"
      //         options={Utils.Form.dropdownMapper(
      //           { value: 'regIso', label: 'texts.name' },
      //           globalState.regions,
      //         )}
      //         placeholder={pageContent?.personal.adr_input_5}
      //         outline
      //         onChange={(e) => setFieldValue(`addresses[${address2Index}].region`, e.value)}
      //       />
      //     ) : null}
      //     <InputComponent
      //       id="user-city-billing"
      //       label={pageContent?.personal.adr_input_6}
      //       name="city2"
      //       placeholder={pageContent?.personal.adr_input_6}
      //       type="text"
      //       value={address2[0]?.city}
      //       light
      //       onBlur={onBlur}
      //       onChange={(e) =>
      //         setFieldValue(`addresses[${address2Index}].city`, e.currentTarget.value)
      //       }
      //     />
      //     <InputComponent
      //       id="user-zip-billing"
      //       label={pageContent?.personal.adr_input_7}
      //       name="postalCode2"
      //       placeholder={pageContent?.personal.adr_input_7}
      //       type="text"
      //       value={address2[0]?.postalCode}
      //       light
      //       onBlur={onBlur}
      //       onChange={(e) =>
      //         setFieldValue(`addresses[${address2Index}].postalCode`, e.currentTarget.value)
      //       }
      //     />
      //   </StyledFromRow>
      // </div> */}
    </div>
  )
}

const FormRow = styled.div.attrs({
  className: 'lg:flex',
})`
  margin-top: 1rem;
  @media (min-width: 1024px) {
    margin: 1rem -0.5rem;
    & .input-wrapper,
    & .select-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-wrapper {
        margin-top: 0;
      }
    }
  }
`
