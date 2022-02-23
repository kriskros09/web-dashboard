import React, { FC } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Formik, Form } from 'formik'

import { Button } from '../../components/shared/Button'
//MiscForms
import initialValues from '../../modules/MiscForms/config/initial-values'
import validationSchema from '../../modules/MiscForms/config/validation-schema'
import { ContactForm } from '../../modules/MiscForms/components/ContactForm'

type ContactPageType = {
  pageContent?: any
}

export const ContactSection: FC<ContactPageType> = ({ pageContent }) => {
  const onSubmit = (values, actions) => {
    actions.setSubmitting(true)
    // TODO: actions on submit
    console.log('SUBMIT', values)
    actions.setSubmitting(false)
  }

  return (
    <div className="w-full flex-column xl:flex xl:flex-row justify-between bg-white rounded p-5 lg:p-10 mt-10 mb-10">
      <div className="w-full xl:w-4/12 text-center pb-5 xl:pb-0 xl:border-r border-gray-200">
        <h4 className="pb-5 text-primary">GoodOwl</h4>
        <strong className="pb-4">1 833-GOODOWL</strong>
        <a className="block pb-4" href="tel:1 833-466-3695">
          (1 833-466-3695)
        </a>
        <a href="mailto:info@goodowl.com">info@goodowl.com</a>
      </div>
      <div className="w-full xl:w-7/12 text-center xl:text-left">
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
            initialValues={{
              ...initialValues.contact,
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={validationSchema['contact'][0]}
            enableReinitialize
            onSubmit={onSubmit}
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
              return (
                <Form>
                  <h4 className="text-primary pb-4">{pageContent?.form.title}</h4>
                  <ContactForm
                    errors={errors}
                    initialValues={initialValues}
                    isSubmitting={isSubmitting}
                    pageContent={pageContent}
                    setFieldValue={setFieldValue}
                    values={values}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Button
                    className="text-white bg-primary"
                    disabled={isSubmitting}
                    label={pageContent?.form.btn_text}
                    type="submit"
                  />
                </Form>
              )
            }}
          </Formik>
        </GoogleReCaptchaProvider>
      </div>
    </div>
  )
}
