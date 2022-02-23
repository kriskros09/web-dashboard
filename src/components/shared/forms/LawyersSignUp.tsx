import React, { FC } from 'react'
import styled from 'styled-components'

import { InputComponent } from './FormElements/Input'
import { Checkbox } from './FormElements/Checkbox'
import { Radio } from './FormElements/Radio'

type LawyersSignUpType = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  signupType: string | unknown
}

export const LawyersSignUp: FC<LawyersSignUpType> = ({ onChange, signupType }) => {
  return (
    <>
      <RadioFormRow>
        <Radio
          id="admin"
          label="I'm a firm  Administrator"
          name="lawyers_type"
          value="firm"
          light
          onChange={onChange}
        />
        <Radio
          id="employee"
          label="I'm an Employee"
          name="lawyers_type"
          value="professional"
          light
          onChange={onChange}
        />
      </RadioFormRow>
      <InputFormRow>
        <InputComponent
          label="First name"
          name={`${signupType}.1.first_name`}
          placeholder="First name"
          type="text"
          light
        />
        <InputComponent
          label="Last name"
          name={`${signupType}.1.last_name`}
          placeholder="Last name"
          type="text"
          light
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          label="Email"
          name={`${signupType}.1.email`}
          placeholder="Email"
          type="email"
          light
        />
        <InputComponent
          label="Phone"
          name={`${signupType}.1.phone`}
          placeholder="Phone"
          type="phone"
          light
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          label="password"
          name={`${signupType}.1.password`}
          placeholder="password"
          type="password"
          light
        />
        <InputComponent
          label="Confirm password"
          name={`${signupType}.1.confirm_password`}
          placeholder="Confirm password"
          type="password"
          light
        />
      </InputFormRow>
      {/* TODO: change names as the form validation depends on this */}
      <Checkbox
        id="acceptation-1"
        label="I confirm I have never been convicted etc .."
        name={`${signupType}.1.accept-name1`}
        light
      />
      <Checkbox
        id="acceptation-2"
        label="I confirm I will bid on tasks for which I have the necessary experience and knowledge, as required by the Codes of Ethics applicable to my profession"
        name={`${signupType}.1.accept-name2`}
        light
      />
      <Checkbox
        id="acceptation-3"
        label="I accept the Term and Conditions of the GoodOwl platform"
        name={`${signupType}.1.accept-name3`}
        light
      />
    </>
  )
}

const RadioFormRow = styled.div.attrs({
  className: 'lg:flex bg-gray-100 -mx-10 px-8 py-4',
})`
  margin-top: 1rem;
  margin-bottom: 1rem;
  @media (min-width: 992px) {
    & .input-group {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-group {
        margin-top: 0;
      }
    }
  }
`
const InputFormRow = styled.div.attrs({
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
