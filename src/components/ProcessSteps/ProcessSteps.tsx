import React from 'react'

import { Step } from './Step'

type stepsType = {
  steps?: any
}

export const ProcessSteps: React.FC<stepsType> = ({ steps }) => {
  return (
    <div className="container w-full text-center flex flex-col lg:flex-row justify-center">
      <Step idx={1} stepText={steps?.step_text_1} stepTitle={steps?.step_title_1} />
      <Step idx={2} stepText={steps?.step_text_2} stepTitle={steps?.step_title_2} />
      <Step idx={3} stepText={steps?.step_text_3} stepTitle={steps?.step_title_3} />
      <Step idx={4} stepText={steps?.step_text_4} stepTitle={steps?.step_title_4} />
      <Step idx={5} stepText={steps?.step_text_5} stepTitle={steps?.step_title_5} />
    </div>
  )
}
