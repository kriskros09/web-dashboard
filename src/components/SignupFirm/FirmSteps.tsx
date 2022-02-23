import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../shared/Button'

type Types = {
  inline?: boolean

  dark?: boolean
}

const FirmSteps: FC<Types> = () => {
  const [firmStep, setfirmStep] = useState<number>(0)

  return (
    <div className="w-8/12 bg-white text-center mt-8 mb-8 p-10 rounded">
      <div className={firmStep === 0 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary">
          Would you like to sign up
          <br />
          on GoodOwl as: Firm
        </h2>

        <Button
          className="text-white bg-primary"
          label="Register"
          onClick={() => setfirmStep(firmStep + 1)}
        />
      </div>
      <div className={firmStep === 1 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary">2</h2>
        <Button
          className="capitalize text-white bg-primary"
          label="Next"
          onClick={() => setfirmStep(firmStep + 1)}
        />
      </div>
      <div className={firmStep === 2 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary">3</h2>
        <Button
          className="capitalize text-white bg-primary"
          label="Next"
          onClick={() => setfirmStep(firmStep + 1)}
        />
      </div>
      <div className={firmStep === 3 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary">4</h2>
        <Button
          className="capitalize text-white bg-primary"
          label="Next"
          onClick={() => setfirmStep(firmStep + 1)}
        />
      </div>
      <div className={firmStep === 4 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary">5</h2>
        <Button
          className="capitalize text-white bg-primary"
          label="Next"
          onClick={() => setfirmStep(firmStep + 1)}
        />
      </div>
      <div className={firmStep === 5 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary">6</h2>
        <Button
          className="capitalize text-white bg-primary"
          label="Next"
          onClick={() => setfirmStep(firmStep + 1)}
        />
      </div>
      <div className={firmStep === 6 ? 'block' : 'hidden'}>
        <h2 className="normal-case text-primary">Almost register...</h2>
        <Link className="btn text-white bg-primary" to="/">
          Close
        </Link>
      </div>
    </div>
  )
}

export default FirmSteps
