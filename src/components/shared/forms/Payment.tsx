import React, { FC } from 'react'

import { Button } from '../Button'

type PaymentType = {
  //light?: bolean
}

export const Payment: FC<PaymentType> = () => {
  return (
    <div>
      <h4>Biling Address</h4>
      <div className="">Billing info</div>
      <a href="">Change address</a>
      <div>
        <h2>THANK YOU FOR YOUR PAYEMENT</h2>
        <p>You will receive an answer to your request by email within 24 hours.</p>
        <p>
          {' '}
          If the request is accepted you will be required to make your deposit (payment) in our
          trust account. You will receive further instructions by email. Thank you for trusting
          GoodOwl.
        </p>
        <p> You can now safely close this window and leave the GoodOwl website.</p>

        <Button label="Close" onClick={(e) => console.log('Event: ', e)} />
      </div>
    </div>
  )
}
