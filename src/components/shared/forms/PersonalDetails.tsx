import React, { FC } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

// Store
import { useStore } from '../../../store/models'
// Utils
import { Button } from '../Button'
import initialValues from '../../../modules/Profile/config/initial-values'
import formModel from '../../../modules/Profile/config/form-model'
import validationSchema from '../../../modules/Profile/config/validation-schema'
import { UserProfileForm } from '../../../modules/Profile/components/userProfileForm'
import { UserFormAddressDataMapper } from '../../../utils/forms'

type FormType = {
  pageContent?: any
  isViewed: boolean
}

export const PersonalDetails: FC<FormType> = ({ isViewed, pageContent }) => {
  const [profileState, profileActions] = useStore('Profiles')
  const [userState] = useStore('User')
  const [localeState] = useStore('Locale')
  const initValues = React.useMemo(
    () =>
      Object.keys(profileState.user).reduce((mapped, key) => {
        if (typeof initialValues.user[key] !== 'undefined') {
          mapped[key] = profileState.user[key]
        }

        return mapped
      }, initialValues.user),
    [profileState.user, initialValues.user],
  )

  React.useEffect(() => {
    const { userId } = userState

    if (userId && localeState.language) {
      profileActions.UserProfileInfo({
        userId,
      })
    }
  }, [localeState.language, profileState.updateAddress, profileState.createAddress, isViewed])

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    const { addresses, errors, photo, userId, ...user } = values
    const stateAddresses = profileState.user.addresses

    // Check if we need to delete some
    const addressesToDelete = stateAddresses.filter((stateAddress) =>
      addresses.find(
        (formAddress) =>
          formAddress.addressId !== stateAddress.addressId && stateAddress.type === 2,
      ),
    )

    await profileActions.UserProfileForm({
      userId: userState.userId,
      profileInput: {
        ...user,
        photo,
        status: 1,
        modBy: userState.userId,
      },
    })

    await addresses.forEach(async (address) => {
      const { addressId } = address
      const mappedData = UserFormAddressDataMapper(address, formModel.user.fields)
      console.log('ICI=======.', Number(address.useSame))

      if (typeof addressId !== 'undefined' && addressId !== '') {
        await profileActions.ProfileAddressUpdate({
          addressId,
          addressInput: {
            ...mappedData,
            useSame: address.type === 1 ? Number(address.useSame) : 0,
            modBy: userState.userId,
            ownerId: userState.userId,
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
            ownerId: userState.userId,
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
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema.user[0]}
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
        return (
          <Form className="flex flex-col justify-start">
            <UserProfileForm
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
