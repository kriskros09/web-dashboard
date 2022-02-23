import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { useStore } from '../../store/models'
import { Button } from '../shared/Button'

type step5Type = {
  nextStep?: (e: React.MouseEvent<HTMLButtonElement>) => void
  pageContent?: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CheckoutStep5: FC<step5Type> = ({ nextStep, pageContent }) => {
  const [, orderActions] = useStore('Order')

  const history = useHistory()

  const ExitCheckoutProcess = () => {
    history.push('/purchase')
    orderActions.ResetCheckoutState({
      reset: 'true',
    })
  }

  return (
    <>
      <div className="text-center w-full md:w-10/12 mx-auto">
        <h2 className="text-primary mb-12">{pageContent?.main_title}</h2>
        <p className="text-base md:text-xl text-primary-dark font-bold mb-4">
          {' '}
          {pageContent?.text}
        </p>

        <Button
          className="text-white bg-primary mt-8 w-full md:w-auto"
          label={pageContent?.btn_text}
          onClick={() => ExitCheckoutProcess()}
        />
      </div>
    </>
  )
}
