import React from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

// Store
import { useStore } from '../../../store/models'
//Component
import { Button } from '../Button'
import { FirmProfileForm } from '../../../modules/Profile/components/firmProfileForm'
import initialValues from '../../../modules/Profile/config/initial-values'
import validationSchema from '../../../modules/Profile/config/validation-schema'
import formModel from '../../../modules/Profile/config/form-model'
import { FirmFormDataMapper, UserFormAddressDataMapper } from '../../../utils/forms'

type FirmDetailsType = {
  pageContent?: any
  isViewed: boolean
}

export const FirmDetails: React.FC<FirmDetailsType> = ({ pageContent, isViewed }) => {
  const [profileState, profileActions] = useStore('Profiles')
  const [userState] = useStore('User')
  const [localeState] = useStore('Locale')
  const initValues = React.useMemo(
    () =>
      Object.keys(profileState.firm).reduce((mapped, key) => {
        if (typeof initialValues.firm[key] !== 'undefined') {
          mapped[key] = profileState.firm[key]
        }

        return mapped
      }, initialValues.firm),
    [profileState.firm, initialValues.firm],
  )

  React.useEffect(() => {
    const { firmId } = userState

    if (firmId && isViewed && localeState.language) {
      profileActions.FirmProfileInfo({
        firmId,
      })
    }
  }, [localeState.language, isViewed, profileState.updateAddress, profileState.createAddress])

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    const { addresses } = values
    const stateAddresses = profileState.firm.addresses

    // Check if we need to delete some
    const addressesToDelete = stateAddresses.filter((stateAddress) =>
      addresses.find(
        (formAddress) =>
          formAddress.addressId !== stateAddress.addressId && stateAddress.type === 2,
      ),
    )
    const mappedData = FirmFormDataMapper(values, formModel.firm.fields)

    await profileActions.FirmProfileForm({
      firmId: profileState.firm.firmId,
      firmInput: {
        ...mappedData,
        status: 1,
        logo: '/logo',
        langId: profileState.firm.langId,
        modBy: userState.userId,
      },
    })

    await addresses.forEach(async (address) => {
      const { addressId } = address
      const mappedData = UserFormAddressDataMapper(address, formModel.user.fields)

      if (typeof addressId !== 'undefined' && addressId !== '') {
        await profileActions.ProfileAddressUpdate({
          addressId,
          addressInput: {
            ...mappedData,
            useSame: address.type === 1 ? Number(address.useSame) : 0,
            modBy: userState.userId,
            ownerId: userState.firmId,
            status: 1,
          },
        })
      } else {
        await profileActions.ProfileAddressCreation({
          addressInput: {
            ...mappedData,
            useSame: address.type === 1 ? Number(address.useSame) : 0,
            status: 1,
            modBy: userState.userId,
            ownerId: userState.firmId,
          },
        })
      }
    })

    // clean up
    if (addressesToDelete.length > 0) {
      await addressesToDelete.forEach(async ({ addressId }) => {
        await profileActions.ProfileDeleteAddress({
          addressId,
        })
      })
    }

    actions.setSubmitting(false)
    toast.success('Your information is successfully saved')
  }

  return (
    <Formik
      initialValues={{ ...initValues }}
      validateOnChange={false}
      validationSchema={validationSchema.firm[0]}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        errors,
        isSubmitting,
        initialValues,
        values,
        setFieldValue,
      }) => {
        console.log(' VAL =====>', values)

        return (
          <Form className="flex flex-col justify-start">
            <FirmProfileForm
              errors={errors}
              initialValues={initialValues}
              pageContent={pageContent}
              setFieldValue={setFieldValue}
              values={values}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <div className="lg:flex mt-10">
              <Button
                className="bg-primary text-white"
                disabled={isSubmitting}
                label={pageContent?.texts.save_btn}
                type="submit"
              />
              {/* <Button
                className="border border-primary text-primary mt-4 lg:ml-4"
                label={pageContent?.texts.cancel_btn}
              /> */}
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
