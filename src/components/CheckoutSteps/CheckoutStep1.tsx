import React, { useState } from 'react'

import { CheckoutClient } from '../../modules/SignUp/views/CheckoutClient'

// Store
import { useStore } from '../../store/models'
// Components
import { Login } from '../shared/forms/Login'

type step1Type = {
  nextStep: (e: React.MouseEvent<HTMLButtonElement>) => void
  showModal: () => void

  pageContent?: any
}

export const CheckoutStep1: React.FC<step1Type> = ({ showModal, nextStep, pageContent }) => {
  const [userState, userActions] = useStore('User')

  const [ReadyForNextStep, setReadyForNextStep] = useState<any>()

  React.useEffect(() => {
    if (
      userState?.userId &&
      userState?.userId !== '' &&
      userState?.session?.token &&
      userState?.session?.tokenExpiration
    ) {
      nextStep(ReadyForNextStep)
    }
  }, [userState.userId, userState.session, ReadyForNextStep])

  const handleLoginForm = (e) => {
    e.preventDefault()
    setReadyForNextStep(e)
    const elements: HTMLFormElement[] = e?.currentTarget?.elements

    if (elements) {
      // Not working on Firefox 83
      // const formValues = Object.entries(elements)
      //   .filter(([key]) => key === 'email' || key === 'password')
      //   .map(([_, element]) => ({
      //     [element.name]: element.value,
      //   }))
      const email = { email: elements['email'].value }
      const password = { password: elements['password'].value }

      const loginData = Object.assign({}, email, password)
      userActions.loginUser(loginData)
    }
  }

  const error = userState?.errors.find((error) => error.view === 'login')

  return (
    <>
      <h4 className="text-primary uppercase mb-6">{pageContent?.main_title}</h4>
      <p className="text-primary-dark md:leading-3 md:text-lg mb-6">{pageContent?.text_1}</p>
      <div>
        <h4 className="text-primary-dark mb-6">{pageContent?.title_1}</h4>
        <Login
          className="justify-start"
          pageContent={pageContent}
          onSubmit={handleLoginForm}
          onSubmitError={error}
        />
      </div>
      <div className="mt-12">
        <CheckoutClient pageContent={pageContent} showModal={showModal} />
      </div>
    </>
  )
}
