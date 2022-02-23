import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { InputComponent } from './FormElements/Input'
import { InputSubmit } from './FormElements/Submit'

type FormType = {
  className?: string
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onSubmitError?: any
  pageContent?: any
}
export const Login: FC<FormType> = ({ className = '', onSubmit, onSubmitError, pageContent }) => {
  return (
    <form className={`form flex flex-col ${className}`} onSubmit={onSubmit}>
      {onSubmitError ? (
        <FormError className="form-error text-error p-2 font-medium mb-4">
          {onSubmitError.message}
        </FormError>
      ) : null}
      <InputComponent
        id="email"
        label={pageContent?.input_1}
        name="email"
        placeholder={pageContent?.input_1}
        type="text"
        light
      />
      <InputComponent
        id="password"
        label={pageContent?.input_2}
        name="password"
        placeholder={pageContent?.input_2}
        type="password"
        light
      />
      <InputSubmit
        className="bg-primary text-white md:self-start cursor-pointer"
        value={pageContent?.btn_text}
      />
      <p className="text-primary-dark font-medium mt-4">
        <Link to="/forgot-password">{pageContent?.text_2}</Link>
      </p>
    </form>
  )
}

const FormError = styled.span`
  background-color: rgba(255, 0, 0, 0.4);
`
