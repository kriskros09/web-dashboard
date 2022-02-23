import React, { FC, ReactElement, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'

import { useStore } from '../../store/models'
import { Button } from '../shared/Button'

const CARD_ELEMENT_OPTIONS = {
  // iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#003057',
      fontFamily: 'sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#003057' },
      '::placeholder': { color: '#BBBBBB' },
    },
    invalid: {
      // iconColor: '#ffc7ee',
      // color: '#ffc7ee',
    },
  },
}

const CheckoutForm = () => {
  const [stripeError, setStripeError] = React.useState<undefined | any>(undefined)
  const stripe = useStripe()
  const elements = useElements()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderState, orderActions] = useStore('Order')
  const { mandId, taskId } = orderState

  const [NotAccepted, setNotAccepted] = useState<boolean>(false)

  if (!stripe || !elements) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) as any,
    })

    if (error) {
      setStripeError(error)
    } else if (!error && typeof stripeError !== undefined) {
      setStripeError(undefined)
    }

    if (!error && paymentMethod) {
      // this should be an action
      console.log('Success:', paymentMethod)
      const { card } = paymentMethod

      if (card) {
        console.log(card.brand)
        await orderActions.recordPayment({
          mandId,
          taskId,
          payMethod: card.brand,
        })
      } else {
        toast.error('Card type undefined')
      }
    }
  }

  const handleChange = (cardEvent) => {
    const { error, brand } = cardEvent
    setNotAccepted(false)

    if (brand === 'amex') {
      setNotAccepted(true)
      setStripeError(undefined)
    } else if (error) {
      setStripeError(error)
    } else if (!error && typeof stripeError !== undefined) {
      setStripeError(undefined)
    }
  }

  const hasError = typeof stripeError !== undefined

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="border border-gray-100 rounded-sm p-2"
        options={CARD_ELEMENT_OPTIONS}
        onChange={handleChange}
      />
      <p>{hasError && <small className="text-error">{stripeError?.message}</small>}</p>
      <p>
        {NotAccepted && (
          <small className="text-error">Nous n'acceptons pas cette méthode de paiement</small>
        )}
      </p>

      <Button
        className="btn bg-primary-dark text-white hover:bg-primary"
        disabled={!stripe || NotAccepted}
        label="Pay"
        type="submit"
      />
    </form>
  )
}

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_API_KEY}`)

export const PaymentDetails: React.FC<any> = ({ pageContent }): ReactElement<'Fragment'> => {
  return (
    <>
      <div>
        <h4 className="text-primary-dark mb-6">{pageContent?.title_2}</h4>
        {/* <p className="text-primary-dark">{pageContent?.text_1}</p> */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </>
  )
}
