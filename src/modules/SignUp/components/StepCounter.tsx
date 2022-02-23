import React from 'react'

import { Check } from '../../../components/shared/Icons'

const StepsCounter: React.FC<{
  activeStep: number
  stepsCount: number
  shouldDisplay: boolean
}> = ({ activeStep, stepsCount, shouldDisplay = true }) => {
  const [count, setCount] = React.useState(stepsCount)

  React.useEffect(() => {
    setCount(stepsCount)
  }, [stepsCount])

  if (!shouldDisplay) return null

  return (
    <div className="flex mb-5 xl:mb-0 xl:absolute xl:right-0 xl:mr-10">
      {[...Array(count).keys()].map((step, idx) => (
        <div
          key={`${step}-${idx}-step`}
          className={`mx-2 font-bold text-md border-4 rounded-full p-4 w-8 h-8 relative ${
            activeStep === idx || activeStep > idx
              ? 'border-primary bg-primary text-white'
              : 'border-primary-light text-primary-light'
          }`}
        >
          <span className="block absolute l-1/2 t-1/2 transform translate -translate-y-1/2 -translate-x-1/2">
            {activeStep > idx ? <Check fillColour="white" size={16} /> : idx + 1}
          </span>
        </div>
      ))}
    </div>
  )
}

export default StepsCounter
