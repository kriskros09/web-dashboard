import React, { FC } from 'react'

import { InputComponent } from './FormElements/Input'
import { Checkbox } from './FormElements/Checkbox'
import { InputSubmit } from './FormElements/Submit'

type onSubmitType = {
  nextStep?: (e: React.FormEvent<HTMLFormElement>) => void
  pageContent: any
}

export const SignIn: FC<onSubmitType> = ({ nextStep, pageContent }) => {
  return (
    <form action="" className="flex flex-col justify-start" onSubmit={nextStep}>
      <InputComponent
        label={pageContent?.input_3}
        placeholder={pageContent?.input_3}
        type="text"
        light
      />
      <InputComponent
        label={pageContent?.input_4}
        placeholder={pageContent?.input_4}
        type="text"
        light
      />
      <InputComponent
        label={pageContent?.input_5}
        placeholder={pageContent?.input_5}
        type="email"
        light
      />
      <InputComponent
        label={pageContent?.input_6}
        placeholder={pageContent?.input_6}
        type="password"
        light
      />
      <InputComponent
        label={pageContent?.input_7}
        placeholder={pageContent?.input_7}
        type="password"
        light
      />

      <Checkbox id="acceptation" label={pageContent?.check_text} name="acceptation" />
      <InputSubmit
        className="bg-primary text-white md:self-start"
        value={pageContent?.signup_btn}
      />
    </form>
  )
}
