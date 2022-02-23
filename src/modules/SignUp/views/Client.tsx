import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Formik, Form } from 'formik'

import { useStore, getState } from '../../../store/models'
import { Button } from '../../../components/shared/Button'
import { PersonalDetailsForm } from '../components/PersonalDetailsForm'
import initialValues from '../config/initial-values'
import validationSchema from '../config/validation-schema'
import { Confirmation } from '../views/Confirmation'

const renderStepContent = (content, step, props) => {
  switch (step) {
    case 0:
      return <PersonalDetailsForm {...props} pageContent={content} />
    default:
      return <div>Not Found</div>
  }
}

export const Client: React.FC<{ pageContent?: any }> = ({ pageContent }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, userActions] = useStore('User')
  const [activeStep] = React.useState(0)
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false)

  const steps = [pageContent?.step_1?.main_title_client]
  const signUpUser = async (values, actions) => {
    actions.setSubmitting(true)
    const { recaptcha, ...rest } = values
    await userActions.signUp({ data: rest, type: 'client' })
    const { errors, userId } = getState('User')
    actions.setSubmitting(false)

    if (errors.length > 0) {
      const error = errors.filter((error) => error.view === 'signup')
      console.log(error) // nothing to do for now
    } else if (userId !== '') {
      setDisplayConfirmation(true)
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

  const methods = {
    renderStepContent,
  }

  return (
    <div className="block">
      {displayConfirmation ? (
        <Confirmation pageContent={pageContent} />
      ) : (
        <>
          <h2 className="normal-case text-primary mb-5">{steps[activeStep]}</h2>
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
              validationSchema={validationSchema.client[activeStep]}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, errors, isSubmitting, values, setFieldValue }) => {
                console.log('VALUES Client', values)
                console.log('ERRORS Client', errors)

                return (
                  <Form className="flex flex-col justify-start">
                    {methods.renderStepContent(pageContent, activeStep, {
                      onChange: handleChange,
                      onBlur: handleBlur,
                      errors,
                      setFieldValue,
                      values,
                    })}
                    <div className="mt-32 flex flex-col md:flex-row items-end justify-end">
                      <Button
                        className="text-white bg-primary mt-8 md:mt-0 md:self-end btn-icon"
                        disabled={isSubmitting}
                        iconAfter="next"
                        label={pageContent?.global?.next_btn}
                        type="submit"
                      />
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </GoogleReCaptchaProvider>
        </>
      )}
    </div>
  )
}
