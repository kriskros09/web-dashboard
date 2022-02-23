import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

import { useStore, getState } from '../../../store/models'
import initialValues from '../config/initial-values'
import validationSchema from '../config/validation-schema'
import { CheckoutSignUp } from '../components/CheckoutSignUp'

export const CheckoutClient: React.FC<{ pageContent?: any; showModal: () => void }> = ({
  pageContent,
  showModal,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, userActions] = useStore('User')
  const orderDetails = getState('Order').order_details_by_codes
  const signUpUser = async (values, actions) => {
    actions.setSubmitting(true)
    const { recaptcha, ...Values } = values

    // Add info from order to signup values
    const signUpValues = Object.assign(Values, { from: 2, orderDetails })

    await userActions.signUp({ data: signUpValues, type: 'client' })
    const { errors, userId } = getState('User')
    actions.setSubmitting(false)

    if (errors.length > 0) {
      const error = errors.filter((error) => error.view === 'signup')
      toast.error(error)
    } else if (userId !== '') {
      showModal()
      actions.resetForm({})
    }
  }

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await userActions.verifyEmail({ email: values.email })
    const { errors } = getState('User')
    actions.setSubmitting(false)
    const invalidEmailError = errors.find(
      (error) => error.view === 'signup' && error.field === 'email',
    )

    if (invalidEmailError) {
      actions.setFieldError('email', invalidEmailError.message)
    } else {
      signUpUser(values, actions)
    }
  }

  return (
    <div className="block">
      <>
        <h4 className="text-primary-dark mb-6">{pageContent?.title_2}</h4>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
          // language="[optional_language]"
          scriptProps={{
            async: true, // optional, default to false,
            defer: true, // optional, default to false
            appendTo: 'body', // optional, default to "head", can be "head" or "body",
            nonce: undefined, // optional, default undefined
          }}
          useRecaptchaNet
        >
          <Formik
            initialValues={initialValues.client}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={validationSchema.client[0]}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              errors,
              isSubmitting,
              initialValues,
              values,
              setFieldValue,
            }) => {
              console.log(values)

              return (
                <Form className="flex flex-col justify-start">
                  <CheckoutSignUp
                    errors={errors}
                    initialValues={initialValues}
                    isSubmitting={isSubmitting}
                    pageContent={pageContent}
                    setFieldValue={setFieldValue}
                    values={values}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Form>
              )
            }}
          </Formik>
        </GoogleReCaptchaProvider>
      </>
    </div>
  )
}
