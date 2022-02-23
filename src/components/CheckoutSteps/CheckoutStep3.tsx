import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'

// Store
import { useStore, getState } from '../../store/models'
import { Button } from '../shared/Button'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Billing } from '../shared/forms/Billing'
import { Radio } from '../shared/forms/FormElements/Radio'
import { Edit, Bin } from '../shared/Icons'

type step3Type = {
  // nextStep?: (e: React.MouseEvent<HTMLButtonElement>) => void
  nextStep: (e: React.FormEvent<HTMLFormElement>) => void
  pageContent?: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CheckoutStep3: FC<step3Type> = ({ nextStep, pageContent }) => {
  const [userState] = useStore('User')
  const [orderState, orderActions] = useStore('Order')
  const [profileState, profileActions] = useStore('Profiles')
  const [Address, setAddress] = useState('')
  const [AddressToUpdate, setAddressToUpdate] = useState('')
  const { userId } = userState

  React.useEffect(() => {
    profileActions.UserProfileInfo({
      userId,
    })
  }, [
    userId,
    profileState.deleteAddress,
    profileState.updateAddress,
    profileState.createAddress,
    AddressToUpdate,
  ])

  const handleNextStep = async (e) => {
    await orderActions.MandateAddress({
      mandId: orderState.mandId,
      userAddressId: Address,
      modBy: userState.userId,
    })

    nextStep(e)
  }

  const handleDeleteAddress = async (addressId) => {
    await profileActions.ProfileDeleteAddress({
      addressId,
    })

    const { errors } = getState('Profiles')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    }
  }

  return (
    <>
      <div>
        <h4 className="text-primary uppercase mb-6">{pageContent?.main_title}</h4>
        <h4 className="text-primary-dark mb-6">{pageContent?.title_1}</h4>
        {profileState?.user.addresses.length !== 0 && AddressToUpdate === '' ? (
          profileState?.user.addresses
            .filter((a) => a.type === 1 || a.type === 2)
            .map((address) => (
              <div key={address.addressId} className="flex mb-8 items-center">
                <Radio
                  defaultChecked={
                    address.addressId === userState?.session?.decodedToken.billingAdress
                      ? true
                      : false
                  }
                  id={address.addressId}
                  label={
                    <div>
                      <p>
                        {address.streetNumber} {address.street} {address.apartment}
                      </p>
                      <p>
                        {address.city} {address.region}, {address.postalCode}
                      </p>
                    </div>
                  }
                  name="address"
                  onChange={() => setAddress(address.addressId)}
                />
                <button
                  className="ml-8 focus:outline-none"
                  onClick={() => setAddressToUpdate(address.addressId)}
                >
                  <Edit fillColour="gray-300" size={24} />
                </button>
                {address.type !== 1 ? (
                  <button
                    className="ml-4 mr-5 md:mr-6 focus:outline-none"
                    onClick={() => handleDeleteAddress(address.addressId)}
                  >
                    <Bin fillColour="gray-300" size={24} />
                  </button>
                ) : null}
              </div>
            ))
        ) : (
          <>
            <Billing
              AddressId={AddressToUpdate}
              hideForm={() => setAddressToUpdate('')}
              pageContent={pageContent}
            />
          </>
        )}
        <Button
          className="bg-primary text-white self-start"
          disabled={
            Address !== '' || userState?.session?.decodedToken.billingAdress !== '' ? false : true
          }
          label={pageContent?.next_btn}
          onClick={(e) => handleNextStep(e)}
        />
      </div>
    </>
  )
}
