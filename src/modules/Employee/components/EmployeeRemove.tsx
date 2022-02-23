/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react'

// Utils
import { InputComponent } from '../../../components/shared/forms/FormElements/Input'
import { InputSubmit } from '../../../components/shared/forms/FormElements/Submit'
import { Button } from '../../../components/shared/Button'

export const EmployeeRemoveForm: FC<any> = (props) => {
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

  return (
    <>
      {/* <InputComponent
        error={errors['email']}
        id="removeEmail"
        label={pageContent?.remove_professional.input_1}
        name="email"
        placeholder={pageContent?.remove_professional.input_1}
        type="email"
        solid
        onBlur={onBlur}
        onChange={onChange}

      /> */}
      <InputComponent
        error={errors['password']}
        id="removePassword"
        label={pageContent?.remove_professional.input_1}
        name="password"
        placeholder={pageContent?.remove_professional.input_1}
        type="password"
        value={values.password}
        solid
        onBlur={onBlur}
        onChange={onChange}
      />
      <InputComponent
        error={errors['confirmPassword']}
        id="removeConfirmPassword"
        label={pageContent?.remove_professional.input_2}
        name="confirmPassword"
        placeholder={pageContent?.remove_professional.input_2}
        type="password"
        value={values.confirmPassword}
        solid
        onBlur={onBlur}
        onChange={onChange}
      />
      <div className="sm:flex-col md:flex-row md:flex">
        <InputSubmit
          className="bg-primary text-white w-full w-1/2 mr-2"
          disabled={isSubmitting}
          value={pageContent?.remove_professional.btn_text_1}
        />
        <Button className="bg-white text-primary w-full w-1/2" label="cancel" type="reset" />
      </div>
    </>
  )
}
