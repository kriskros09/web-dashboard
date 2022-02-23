import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { ClientSignUp } from '../shared/forms/ClientSignUp'

const ClientSteps: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clientStep, setclientStep] = useState<number>(0)
  // setclientStep(1)

  return (
    <>
      <div className={`${clientStep === 0 ? 'block' : 'hidden'}`}>
        <h2 className="normal-case text-primary mb-6">Let's start</h2>
        <ClientSignUp />
      </div>

      <div className={clientStep === 1 ? 'flex flex-col' : 'hidden'}>
        <h2 className="normal-case text-primary mb-6">Almost register...</h2>
        <p className="text-primary-dark font-medium mb-4">
          In order to confirm your registration <strong>click on the link</strong> we sent you by
          email
        </p>
        <p className="text-primary-dark font-medium">
          Thank you for trusting <strong>GoodOwl</strong>
        </p>
        <Link className="btn text-white bg-primary inline-block mt-12 ml-auto mr-0" to="/">
          Close
        </Link>
      </div>
    </>
  )
}

export default ClientSteps
