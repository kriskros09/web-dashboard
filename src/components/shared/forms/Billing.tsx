import React, { FC } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

// Store
import { useStore, getState } from '../../../store/models'
// Utils
import Utils from '../../../utils'
import { Button } from '../Button'
import validationSchema from '../../../modules/Profile/config/validation-schema'

import { SelectComponent } from './FormElements/Select'
import { InputComponent } from './FormElements/Input'
type BillingType = {
  // onSend?: (e: React.MouseEvent<HTMLButtonElement>) => void
  hideForm: () => void
  pageContent?: any
  AddressId?: string
}

export const Billing: FC<BillingType> = ({ hideForm, pageContent, AddressId = '' }) => {
  const [userState] = useStore('User')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')
  const [profileState, profileActions] = useStore('Profiles')
  const { userId } = userState

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)

    if (AddressId !== '') {
      await profileActions.ProfileAddressUpdate({
        addressId: AddressId,
        addressInput: {
          ownerId: userId,
          type: profileState.user.addresses
            .filter((address) => address.addressId === AddressId)
            .map((a) => a.type)[0],
          useSame: profileState.user.addresses
            .filter((address) => address.addressId === AddressId)
            .map((a) => a.useSame)[0],
          streetNumber: values.streetNumber,
          street: values.street,
          apartment: values.apartment,
          city: values.city,
          country: values.country,
          region: values.region,
          postalCode: values.postalCode,
          modBy: userId,
          status: 1,
        },
      })

      const { errors } = getState('Profiles')

      actions.setSubmitting(false)

      if (errors.length > 0) {
        toast.error(errors[0].message)
      } else {
        hideForm()
      }
    } else {
      await profileActions.ProfileAddressCreation({
        addressInput: {
          ownerId: userId,
          type: 1,
          useSame: 1,
          streetNumber: values.streetNumber,
          street: values.street,
          apartment: values.apartment,
          city: values.city,
          country: values.country,
          region: values.region,
          postalCode: values.postalCode,
          modBy: userId,
          status: 1,
        },
      })

      const { errors } = getState('Profiles')

      actions.setSubmitting(false)

      if (errors.length > 0) {
        toast.error(errors[0].message)
      } else {
        hideForm()
      }
    }
  }

  return (
    <Formik
      initialValues={{
        streetNumber: '',
        street: '',
        apartment: '',
        city: '',
        region: '',
        country: '',
        postalCode: '',
        ...profileState.user.addresses.filter((address) => address.addressId === AddressId)[0],
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema['address'][0]}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, errors, isSubmitting, values, setFieldValue }) => {
        console.log('BILLING', values)

        return (
          <Form className="flex flex-col justify-start">
            <StyledForm className="flex flex-col justify-start">
              {/* <InputComponent label="First name" placeholder="First name" type="text" light />
              <InputComponent label="Last name" placeholder="Last name" type="text" light /> */}
              <InputComponent
                error={errors['streetNumber']}
                id="streetNumber"
                label={pageContent?.input_1}
                name="streetNumber"
                placeholder={pageContent?.input_1}
                type="text"
                value={values.streetNumber}
                light
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <InputComponent
                error={errors['street']}
                id="street"
                label={pageContent?.input_2}
                name="street"
                placeholder={pageContent?.input_2}
                type="text"
                value={values.street}
                light
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <InputComponent
                error={errors['apartment']}
                id="apartment"
                label={pageContent?.input_3}
                name="apartment"
                placeholder={pageContent?.input_3}
                type="text"
                value={values.apartment}
                light
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <InputComponent
                error={errors['city']}
                id="city"
                label={pageContent?.input_6}
                name="city"
                placeholder={pageContent?.input_6}
                type="text"
                value={values.city}
                light
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <SelectComponent
                error={errors['region']}
                name="region"
                options={Utils.Form.dropdownMapper(
                  { value: 'regIso', label: 'texts.name' },
                  globalState.regions,
                )}
                placeholder={pageContent?.input_5}
                value={Utils.Form.dropdownMapper(
                  { value: 'regIso', label: 'texts.name' },
                  globalState.regions,
                ).find((option) => option.value === values.region)}
                outline
                onChange={(e) => setFieldValue('region', e.value)}
              />
              <SelectComponent
                error={errors['country']}
                name="country"
                options={Utils.Form.dropdownMapper(
                  { value: 'countIso', label: 'texts.name' },
                  globalState.countries,
                )}
                placeholder={pageContent?.input_4}
                value={Utils.Form.dropdownMapper(
                  { value: 'countIso', label: 'texts.name' },
                  globalState.countries,
                ).find((option) => option.value === values.country)}
                outline
                onChange={(e) => {
                  setFieldValue('country', e.value)
                  setFieldValue('zip-code-country-ref', e.value)
                }}
              />
              <InputComponent
                error={errors['postalCode']}
                id="postalCode"
                label={pageContent?.input_7}
                name="postalCode"
                placeholder={pageContent?.input_7}
                type="text"
                value={values.postalCode}
                light
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </StyledForm>
            <div className="lg:flex mt-10 mb-8">
              <Button
                className="bg-primary text-white"
                disabled={isSubmitting}
                label={pageContent?.save_btn}
                type="submit"
              />
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

const StyledForm = styled.div`
  .input-wrapper + .select-wrapper {
    margin-top: 1rem;
  }

  .select-wrapper + .select-wrapper {
    margin-top: 1rem;
  }

  .select-wrapper + .input-wrapper {
    margin-top: 1rem;
  }
`
