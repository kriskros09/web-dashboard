import React, { FC, useCallback } from 'react'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'

import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { Checkbox } from '../../../components/shared/forms/FormElements/Checkbox'
import { InputSubmit } from '../../../components/shared/forms/FormElements/Submit'

export const CheckoutSignUp: FC<any> = (props) => {
  const { onChange, onBlur, errors, values, pageContent, isSubmitting, setFieldValue } = props

  const handleReCaptchaVerify = useCallback(
    (token) => {
      setFieldValue('recaptcha', token)
    },
    [setFieldValue],
  )

  return (
    <>
      <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
      <InputComponent
        error={errors['first-name'] as string}
        label={pageContent?.input_3}
        name="first-name"
        placeholder={pageContent?.input_3}
        type="text"
        value={values['first-name']}
        light
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['last-name'] as string}
        label={pageContent?.input_4}
        name="last-name"
        placeholder={pageContent?.input_4}
        type="text"
        value={values['last-name']}
        light
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['email'] as string}
        label={pageContent?.input_5}
        name="email"
        placeholder={pageContent?.input_5}
        type="email"
        value={values['email']}
        light
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['phone'] as string}
        label="phone"
        name="phone"
        placeholder="phone"
        type="phone"
        value={values['phone']}
        light
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['password'] as string}
        label={pageContent?.input_6}
        name="password"
        placeholder={pageContent?.input_6}
        type="password"
        value={values['password']}
        light
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['confirm-password'] as string}
        label={pageContent?.input_7}
        name="confirm-password"
        placeholder={pageContent?.input_7}
        type="password"
        value={values['confirm-password']}
        light
        onBlur={onBlur}
        onChange={onChange}
      />
      <div className="text-xs text-gray-400 pt-5">
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
      <Checkbox
        checked={values['user-agreement']}
        error={errors['user-agreement'] as string}
        id="user-agreement"
        label={pageContent?.check_text}
        name="user-agreement"
        light
        onChange={onChange}
      />
      <InputSubmit
        className="bg-primary text-white md:self-start"
        disabled={isSubmitting}
        value={pageContent?.signup_btn}
      />
    </>
  )
}
