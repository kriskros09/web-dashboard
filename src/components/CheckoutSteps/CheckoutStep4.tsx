import React, { FC } from 'react'

// Store
import { useStore } from '../../store/models'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Billing } from '../shared/forms/Billing'

type step4Type = {
  previouStep?: (e: React.MouseEvent<HTMLButtonElement>) => void
  pageContent?: any
  nextStep?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const CheckoutStep4: FC<step4Type> = ({ previouStep, pageContent }) => {
  const [orderState] = useStore('Order')
  const [profileState] = useStore('Profiles')

  return (
    <>
      <div>
        <h4 className="text-primary uppercase mb-6">{pageContent?.main_title}</h4>
        <h4 className="text-primary-dark mb-6">{pageContent?.title_1}</h4>
        <div className="text-primary-dark">
          <p className="font-bold">
            {profileState.user.firstName} {profileState.user.lastName}
          </p>
          {profileState.user.addresses
            .filter((add) => add.addressId === orderState?.mandateAddress?.userAddressId)
            .map((address) => (
              <p key={address.addressId}>
                {address.streetNumber} {address.street}, {address.apartment}
                <br />
                {address.city}, {address.region}, {address.country}
                <br />
                {address.postalCode}
              </p>
            ))}
          <button className="underline text-primary mt-6" onClick={previouStep}>
            {' '}
            Change address
          </button>
        </div>
      </div>
    </>
  )
}
