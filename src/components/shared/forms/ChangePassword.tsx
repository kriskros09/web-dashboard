import React, { FC } from 'react'
import { Formik, Form } from 'formik'
import { string, object, ref } from 'yup'
import { toast } from 'react-toastify'

import i18next from '../../../i18n'
// Store
import { useStore, getState } from '../../../store/models'
import { Button } from '../Button'

import { InputComponent } from './FormElements/Input'

type FormType = {
  className?: string
  pageContent?: any
}

const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/

const validationSchema = object().shape({
  password: string()
    .min(8, i18next.t('translation:formError.min_8'))
    .matches(passwordRegEx, i18next.t('translation:formError.passwordRegex'))
    .required(i18next.t('translation:formError.required')),

  confirmPassword: string()
    .required(i18next.t('translation:formError.required'))
    .oneOf([ref('password'), null], i18next.t('translation:formError.passwordMatching')),
})

export const ChangePassword: FC<FormType> = ({ className = '', pageContent }) => {
  const [, userActions] = useStore('User')
  const { userId } = getState('User')

  const handleSubmit = async (values, actions) => {
    if (userId !== '') {
      const { password, confirmPassword } = values
      await userActions.updatePassword({ userId, password, confirmPassword })
      const { errors } = getState('User')

      const hasError = errors.find((error) => error.view === 'password-reset')

      if (hasError?.message) {
        const { message } = hasError
        toast.error(message)
      } else {
        actions.setSubmitting(false)
        toast.success('Password changed !')
        actions.resetForm({})
      }
    }
  }

  return (
    // <form className={`form flex flex-col ${className}`}>
    //   <InputComponent
    //     label={pageContent?.change_email.input_1}
    //     placeholder={pageContent?.change_email.input_1}
    //     type="password"
    //     light
    //   />
    //   <InputComponent
    //     label={pageContent?.change_email.input_2}
    //     placeholder={pageContent?.change_email.input_2}
    //     type="password"
    //     light
    //   />
    //   <InputComponent
    //     label={pageContent?.change_email.input_3}
    //     placeholder={pageContent?.change_email.input_3}
    //     type="password"
    //     light
    //   />
    //   <div className="lg:flex mt-10">
    //     <InputSubmit className="bg-primary text-white" value={pageContent?.texts.save_btn} />
    //     <Button
    //       className="border border-primary text-primary mt-4 lg:ml-4"
    //       label={pageContent?.texts.cancel_btn}
    //     />
    //   </div>
    // </form>
    <Formik
      enableReinitialize={false}
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, errors, isSubmitting, values }) => (
        <Form className={`form flex flex-col ${className}`}>
          <InputComponent
            error={errors['password']}
            label={pageContent?.change_email.input_2}
            name="password"
            placeholder={pageContent?.change_email.input_2}
            type="password"
            value={values.password}
            light
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <InputComponent
            error={errors['confirmPassword']}
            label={pageContent?.change_email.input_3}
            name="confirmPassword"
            placeholder={pageContent?.change_email.input_3}
            type="password"
            value={values.confirmPassword}
            light
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="lg:flex mt-10">
            <Button
              className="bg-primary text-white md:self-start cursor-pointer"
              disabled={isSubmitting}
              label={pageContent?.texts.save_btn}
              type="submit"
            />
            <Button
              className="border border-primary text-primary mt-4 lg:ml-4"
              label={pageContent?.texts.cancel_btn}
              type="reset"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}
