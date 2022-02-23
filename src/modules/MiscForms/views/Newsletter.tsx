import React from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

import initialValues from '../config/initial-values'
import validationSchema from '../config/validation-schema'
import { NewsletterForm } from '../components/NewsletterForm'
import { Button } from '../../../components/shared/Button'

export const Newsletter: React.FC<any> = (props) => {
  const { pageContent } = props

  const onSubmit = (values, actions) => {
    actions.setSubmitting(true)
    console.log('SUBMIT', values)
    actions.setSubmitting(false)
    actions.resetForm({})
    toast.success('Vous êtes bien inscri a notre infolettre')
  }

  const url =
    'https://goodowl.us19.list-manage.com/subscribe/post?u=8750c33e200c7b2e9ed5a5e5a&amp;id=dc90f8600b'

  return (
    <>
      <h6 className="text-sm leading-2 text-white font-bold pb-3 hidden md:block">
        {pageContent?.footer_4.title}
      </h6>

      <MailchimpSubscribe
        render={({ subscribe }) => (
          <Formik
            initialValues={{
              ...initialValues.newsletter,
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={validationSchema['newsletter'][0]}
            enableReinitialize
            onSubmit={(values, actions) => {
              onSubmit(values, actions)
              subscribe({ EMAIL: values.newsletter_email })
            }}
          >
            {({ handleChange, handleBlur, errors, isSubmitting, initialValues, values }) => {
              return (
                <Form className="hidden md:block">
                  <NewsletterForm
                    errors={errors}
                    initialValues={initialValues}
                    isSubmitting={isSubmitting}
                    pageContent={pageContent}
                    values={values}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Button
                    className="text-primary-dark bg-primary mt-2"
                    disabled={isSubmitting}
                    label={pageContent?.footer_4.btn_text}
                    type="submit"
                  />
                </Form>
              )
            }}
          </Formik>
        )}
        url={url}
      />

      {/* {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
            {status === "error" && <div style={{ color: "red" }}>error</div>}
            {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>} */}
    </>
  )
}
