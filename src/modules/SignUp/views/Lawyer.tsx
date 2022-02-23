import React from 'react'
import { Formik, Form } from 'formik'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import cx from 'classnames'

import { useStore, getState } from '../../../store/models'
import { Button } from '../../../components/shared/Button'
import { PersonalDetailsForm } from '../components/PersonalDetailsForm'
import { ProfessionalDetailsForm } from '../components/ProfessionalDetailsform'
import initialValues from '../config/initial-values'
import validationSchema from '../config/validation-schema'
import formModel from '../config/form-model'
import { Confirmation } from '../views/Confirmation'
import { SignUpHeader } from '../components/SignUpHeader'
import StepsCounter from '../components/StepCounter'
import SelectFirm from '../components/SelectFirm'
import SearchFirm from '../components/SearchFirm'
import { InviteEmployeesForm } from '../components/InviteEmployeesForm'
import { FirmDetailsForm } from '../components/FirmDetailsForm'
import { lawyerSignUpFormDataMapper } from '../../../utils/forms'
import { firmSignUpFormDataMapper } from '../../../utils/forms'

export const Lawyer: React.FC<{ pageContent?: any }> = ({ pageContent }) => {
  const selectFirmStep = pageContent?.step_3_pro?.main_title
  const searchFirmStep = pageContent?.step_4_firm?.main_title
  const firmDetailsStep = pageContent?.step_3_firm?.main_title
  const inviteEmployeesStep = 'Invite Employees'
  const defaultSteps = [pageContent?.step_1?.main_title_pro, pageContent?.step_2?.main_title]

  const config = {
    lawyer: [PersonalDetailsForm, ProfessionalDetailsForm, SelectFirm, SearchFirm],
    firm: [PersonalDetailsForm, ProfessionalDetailsForm, FirmDetailsForm, InviteEmployeesForm],
  }
  const renderStepContent = (step, props, options) => {
    const { config } = options

    if (config[step]) {
      return React.createElement(config[step], props)
    }

    return <div>Not Found</div>
  }

  const {
    lawyer: { formId },
  } = formModel
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_user, userActions] = useStore('User')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_global, globalActions] = useStore('Global')
  const [activeStep, setActiveStep] = React.useState(0)
  const [steps, setSteps] = React.useState(defaultSteps)
  const [shouldSearchFirms, setShouldSearchFirms] = React.useState(false)
  const [displayConfirmation, setDisplayConfirmation] = React.useState(false)
  const [signUpType, setSignUpType] = React.useState('firm')

  React.useEffect(() => {
    if (shouldSearchFirms && !steps.includes(searchFirmStep) && activeStep === 2) {
      setSteps(steps.concat([searchFirmStep]))
    }
  }, [shouldSearchFirms])

  React.useEffect(() => {
    console.log('=====', signUpType)
    let updatedSteps: string[] = []

    if (signUpType === 'lawyer') {
      updatedSteps = [...defaultSteps, searchFirmStep]
    }

    if (signUpType === 'firm') {
      updatedSteps = [
        ...steps.filter(
          (step) => ![searchFirmStep, selectFirmStep, inviteEmployeesStep].includes(step),
        ),
        ...[firmDetailsStep, inviteEmployeesStep],
      ]
    }
    setSteps(updatedSteps)
  }, [signUpType])

  const submitForm = async (signUpInput, actions) => {
    actions.setSubmitting(true)
    console.log('SIGN UP VALUES', signUpInput)
    await userActions.signUp({ data: signUpInput, type: signUpType })
    const { errors } = getState('User')
    actions.setSubmitting(false)

    if (errors.length > 0) {
      console.log(errors)
    } else {
      setDisplayConfirmation(true)
    }
  }

  const handlePersonalInformationForm = async (values, actions) => {
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
      globalActions.getFirmsByEmail({ email: values.email })
      setActiveStep(activeStep + 1)
      actions.setSubmitting(false)
    }
    actions.setSubmitting(false)
  }

  const handleProfessionalInformationForm = (values, actions) => {
    actions.setSubmitting(false)

    // lawyer
    if (values['lawyer-type'] === 'lawyer') {
      if (getState('Global').firmsByEmail.length > 0) {
        // add optional step
        steps.splice(1, 1, selectFirmStep)
        setActiveStep(activeStep + 1)
      } else {
        if (steps[selectFirmStep]) {
          steps.splice(steps.indexOf(selectFirmStep), 1)
        }
        setActiveStep(3)
      }
    }

    // firm
    if (values['lawyer-type'] === 'firm') {
      setActiveStep(activeStep + 1)
    }
  }

  const handleFirmSelectionForm = (values, actions) => {
    if (values['firm-id'] === 'other') {
      setActiveStep(activeStep + 1)
      actions.setSubmitting(false)
    } else {
      const mappedData = lawyerSignUpFormDataMapper(values, formModel.lawyer.fields)
      delete mappedData['firm-invite-email']
      delete mappedData['year']

      submitForm(mappedData, actions)
    }
  }

  const handleFirmSearchform = (values, actions) => {
    const mappedData = lawyerSignUpFormDataMapper(values, formModel.lawyer.fields)
    delete mappedData['year']

    if (mappedData['firm-id'] === 'other') {
      delete mappedData['firm-id']
    }

    submitForm(mappedData, actions)
  }

  const handleFirmDetailsForm = (values, actions) => {
    setActiveStep(activeStep + 1)
    actions.setSubmitting(false)
  }

  const handleFirmInvitationForm = (values, actions) => {
    //setActiveStep(activeStep + 1)
    const mappedData = firmSignUpFormDataMapper(values, formModel.lawyer.fields)

    submitForm(mappedData, actions)
  }

  const handleSubmit = (values, actions) => {
    const handlers = {
      lawyer: [
        handlePersonalInformationForm,
        handleProfessionalInformationForm,
        handleFirmSelectionForm,
        handleFirmSearchform,
      ],
      firm: [
        handlePersonalInformationForm,
        handleProfessionalInformationForm,
        handleFirmDetailsForm,
        handleFirmInvitationForm,
      ],
    }

    return handlers[signUpType][activeStep](values, actions)
  }
  // }

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)

      if (
        signUpType === 'lawyer' &&
        activeStep === 3 &&
        getState('Global').firmsByEmail.length === 0
      )
        setActiveStep(activeStep - 2)
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
          <StepsCounter
            activeStep={activeStep}
            shouldDisplay={steps.length > 1}
            stepsCount={steps.length}
          />
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
              enableReinitialize={false}
              initialValues={initialValues.lawyer}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={validationSchema[signUpType][activeStep]}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                errors,
                isSubmitting,
                values,
                setFieldValue,
                setErrors,
              }) => {
                console.log('VALUES Lawyer', values)
                console.log('ERRORS Lawyer', errors)

                return (
                  <Form className="flex flex-col justify-start" id={formId}>
                    <SignUpHeader
                      errors={errors}
                      lawyerType={values['lawyer-type']}
                      pageContent={pageContent}
                      shouldDisplay={activeStep === 0}
                      onChange={(e) => {
                        setSignUpType(e.target.value)
                        handleChange(e)
                      }}
                    />
                    {methods.renderStepContent(
                      activeStep,
                      {
                        onChange: handleChange,
                        onBlur: handleBlur,
                        setFieldValue,
                        errors,
                        values,
                        setShouldSearchFirms,
                        pageContent,
                        setErrors,
                        // requiresLicence: values['lawyer-type'] === 'firm',
                      },
                      { config: config[signUpType] },
                    )}
                    <div
                      className={cx('mt-32 flex flex-col md:flex-row', {
                        'items-end justify-end': activeStep === 0,
                        'items-start md:justify-between md-align-center': activeStep > 0,
                      })}
                    >
                      <Button
                        className="text-gray-300 border border-gray-300 btn-icon"
                        disabled={isSubmitting}
                        iconBefore="back"
                        label={pageContent?.global?.back_btn}
                        shouldDisplay={activeStep > 0}
                        onClick={handleBackStep}
                      />
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
