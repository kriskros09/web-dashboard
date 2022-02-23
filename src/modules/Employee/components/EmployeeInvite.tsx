/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react'
import { Formik, Form } from 'formik'

// Utils
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { InputSubmit } from '../../../components/shared/forms/FormElements/Submit'
import { Button } from '../../../components/shared/Button'

export const EmployeeInviteForm: FC<any> = (props) => {
  const { onChange, onBlur, errors, pageContent, values, isSubmitting, resetForm } = props

  return (
    <>
      <InputComponent
        error={errors['firstName']}
        id="inviteFirstName"
        label={pageContent?.add_professional.input_1}
        name="firstName"
        placeholder={pageContent?.add_professional.input_1}
        type="text"
        value={values.firstName}
        solid
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['lastName']}
        id="inviteLastName"
        label={pageContent?.add_professional.input_2}
        name="lastName"
        placeholder={pageContent?.add_professional.input_2}
        type="text"
        value={values.lastName}
        solid
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['email']}
        id="inviteEmail"
        label={pageContent?.add_professional.input_3}
        name="email"
        placeholder={pageContent?.add_professional.input_3}
        type="email"
        value={values.email}
        solid
        onBlur={onBlur}
        onChange={onChange}
      />
      <div className="sm:flex-col md:flex-row md:flex">
        <InputSubmit
          className="bg-primary w-full text-white w-1/2 mr-2"
          disabled={isSubmitting}
          value={pageContent?.add_professional.btn_text}
        />
        <Button className="bg-white w-full text-primary w-1/2" label="Annuler" type="reset" />
      </div>
    </>
  )
}
