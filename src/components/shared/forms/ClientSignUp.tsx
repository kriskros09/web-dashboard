import React, { FC } from 'react'
import styled from 'styled-components'

import { InputComponent } from './FormElements/Input'
import { Checkbox } from './FormElements/Checkbox'
import { InputSubmit } from './FormElements/Submit'

export const ClientSignUp: FC = () => {
  return (
    <form action="" className="flex flex-col justify-start">
      <FormRow>
        <InputComponent label="First name" placeholder="First name" type="text" />
        <InputComponent label="Last name" placeholder="Last name" type="text" />
      </FormRow>
      <FormRow>
        <InputComponent label="Email" placeholder="Email" type="email" />
        <InputComponent label="Phone" placeholder="Phone" type="phone" />
      </FormRow>
      <FormRow>
        <InputComponent label="password" placeholder="password" type="password" />
        <InputComponent label="Confirm password" placeholder="Confirm password" type="password" />
      </FormRow>

      <Checkbox
        id="acceptation"
        label="Our mission is to rebuild trust between the professionals and their communities, by giving access to the public to standardized tasks and the ability to choose the best professionals for their needs. I also accept GoodOwl’s Terms and Conditions"
        name="acceptation"
      />
      <InputSubmit className="bg-primary text-white md:self-end" value="Next" />
    </form>
  )
}

const FormRow = styled.div.attrs({
  className: 'lg:flex',
})`
  margin-top: 1rem;
  @media (min-width: 992px) {
    margin: 0.5rem -0.5rem;
    & .input-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-wrapper {
        margin-top: 0;
      }
    }
  }
`
