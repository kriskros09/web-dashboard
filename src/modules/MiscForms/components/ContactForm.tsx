/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect, useCallback } from 'react'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import styled from 'styled-components'

// Utils
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { InputSubmit } from '../../../components/shared/forms/FormElements/Submit'
import { Button } from '../../../components/shared/Button'
import { Textarea } from '../../../components/shared/forms/FormElements/Textarea'

export const ContactForm: FC<any> = (props) => {
  const {
    onChange,
    onBlur,
    errors,
    pageContent,
    initialValues,
    values,
    setFieldValue,
    setValues,
    isSubmitting,
  } = props

  const handleReCaptchaVerify = useCallback(
    (token) => {
      setFieldValue('recaptcha', token)
    },
    [setFieldValue],
  )

  return (
    <>
      <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
      <InputFormRow>
        <InputComponent
          error={errors['name'] as string}
          id="contact-name"
          label={pageContent?.form.input_1}
          name="name"
          placeholder={pageContent?.form.input_1}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['email'] as string}
          id="contact-email"
          label={pageContent?.form.input_2}
          name="email"
          placeholder={pageContent?.form.input_2}
          type="email"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <div className="mt-4 lg:mt-0">
        <InputComponent
          error={errors['object'] as string}
          id="contact-object"
          label={pageContent?.form.input_3}
          name="object"
          placeholder={pageContent?.form.input_3}
          type="text"
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <Textarea
          error={errors['message'] as string}
          id="contact-message"
          name="message"
          placeholder={pageContent?.form.input_4}
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      <div className="text-xs text-gray-400 pt-2">
        This site is protected by reCAPTCHA and the Google
        <a className="underline" href="https://policies.google.com/privacy">
          Privacy Policy
        </a>{' '}
        and
        <a className="underline" href="https://policies.google.com/terms">
          {' '}
          Terms of Service
        </a>{' '}
        apply.
      </div>
    </>
  )
}

const InputFormRow = styled.div.attrs({
  className: 'lg:flex',
})`

  @media (min-width: 992px) {
    margin: 0.5rem -0.375rem;
    & .input-wrapper {
      width: 50%;
      padding: 0 0.375rem;
      & + .input-wrapper {
        margin-top: 0;
      }
    }

`
