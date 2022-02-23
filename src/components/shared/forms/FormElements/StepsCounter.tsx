import React from 'react'
import cx from 'classnames'

import { Check } from '../../Icons'

const StepsCounter = ({ count, activeStep, isLastStep }) => {
  if (!count || count === 0) return null

  const stepClass = cx('mx-2 font-bold text-md border-4 rounded-full p-4 w-8 h-8 relative', {
    'border-primary bg-primary text-white': activeStep > 0,
    'border-primary-light text-primary-light': activeStep === 1,
  })

  return (
    <>
      {[...Array(count).keys()].map((step, idx) => (
        <div key={`${step}-${idx}`} className={stepClass}>
          <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
            {activeStep > step + 1 || isLastStep ? (
              <Check fillColour="white" size={16} />
            ) : (
              step + 1
            )}
          </span>
        </div>
      ))}
    </>
  )
}

export default StepsCounter
