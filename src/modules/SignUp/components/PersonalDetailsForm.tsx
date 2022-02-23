import React, { useCallback } from 'react'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import styled from 'styled-components'

import { Checkbox } from '../../../components/shared/forms/FormElements/Checkbox'
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'

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

export const PersonalDetailsForm: React.FC<any> = (props) => {
  const { onChange, onBlur, errors, values, pageContent, setFieldValue } = props

  const handleReCaptchaVerify = useCallback(
    (token) => {
      setFieldValue('recaptcha', token)
    },
    [setFieldValue],
  )

  return (
    <div className="block">
      <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
      <InputFormRow>
        <InputComponent
          error={errors['first-name'] as string}
          id="user-firstname"
          label={pageContent?.step_1?.input_1}
          name="first-name"
          placeholder={pageContent?.step_1?.input_1}
          type="text"
          value={values['first-name']}
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['last-name'] as string}
          id="user-lastname"
          label={pageContent?.step_1?.input_2}
          name="last-name"
          placeholder={pageContent?.step_1?.input_2}
          type="text"
          value={values['last-name']}
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          error={errors['email'] as string}
          id="user-email"
          label={pageContent?.step_1?.input_3}
          name="email"
          placeholder={pageContent?.step_1?.input_3}
          type="email"
          value={values['email']}
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['phone'] as string}
          id="user-phone"
          label={pageContent?.step_1?.input_4}
          name="phone"
          placeholder={pageContent?.step_1?.input_4}
          type="phone"
          value={values['phone']}
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <InputFormRow>
        <InputComponent
          error={errors['password'] as string}
          id="user-password"
          label={pageContent?.step_1?.input_5}
          name="password"
          placeholder={pageContent?.step_1?.input_5}
          type="password"
          value={values['password']}
          light
          onBlur={onBlur}
          onChange={onChange}
        />
        <InputComponent
          error={errors['confirm-password'] as string}
          id="user-confirmpassword"
          label={pageContent?.step_1?.input_6}
          name="confirm-password"
          placeholder={pageContent?.step_1?.input_6}
          type="password"
          value={values['confirm-password']}
          light
          onBlur={onBlur}
          onChange={onChange}
        />
      </InputFormRow>
      <div className="text-xs text-gray-400">
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
        label={pageContent?.step_1?.check_client}
        name="user-agreement"
        light
        onChange={onChange}
      />
    </div>
  )
}
