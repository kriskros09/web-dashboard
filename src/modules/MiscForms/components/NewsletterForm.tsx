/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

// Utils
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { InputSubmit } from '../../../components/shared/forms/FormElements/Submit'
import { Button } from '../../../components/shared/Button'
import { Textarea } from '../../../components/shared/forms/FormElements/Textarea'

export const NewsletterForm: FC<any> = (props) => {
  const { onChange, onBlur, errors, pageContent, values } = props

  return (
    <>
      <InputComponent
        error={errors['newsletter_email'] as string}
        id="newsletter-email"
        label={pageContent?.footer_4.field}
        name="newsletter_email"
        placeholder={pageContent?.footer_4.field}
        type="email"
        value={values.newsletter_email}
        light
        onBlur={onBlur}
        onChange={onChange}
      />
    </>
  )
}
