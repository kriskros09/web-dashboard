/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

// Store
import { getState } from 'react-model'
import { toast } from 'react-toastify'

import { useStore } from '../../store/models'
// Components
import { RequestDescription } from '../shared/forms/RequestDescription'
import { Button } from '../shared/Button'

type step2Type = {
  nextStep?: (e: React.MouseEvent<HTMLButtonElement>) => void
  pageContent?: any
}

export const CheckoutStep2: FC<step2Type> = ({ nextStep, pageContent }) => {
  const [userState, userActions] = useStore('User')
  const [orderState, orderActions] = useStore('Order')
  const [localeState, _] = useStore('Locale')
  const history = useHistory()

  const [SendRequest, setSendRequest] = useState<boolean>(false)

  const handleSubmit = async (value, actions) => {
    actions.setSubmitting(true)

    if (
      userState?.userId &&
      userState?.userId !== '' &&
      userState?.session?.token &&
      userState?.session?.tokenExpiration &&
      orderState?.order_details &&
      orderState?.order_details !== null &&
      orderState?.order_details_by_codes &&
      orderState?.order_details_by_codes !== null
    ) {
      const orderDate = orderState?.order_details.date
      const orderTime = orderState?.order_details.time
      const appointDateTime = moment(`${orderDate} ${orderTime}`).utc().format()

      await orderActions.placeOrder({
        orderInput: {
          userId: userState?.userId,
          proId: orderState.order_details.proId,
          lawId: orderState.order_details_by_codes.lawId,
          sectId: orderState.order_details_by_codes.sectId,
          servId: orderState.order_details_by_codes.servId,
          appointDate: appointDateTime,
          description: value.description,
          poNumber: '',
          addressId: '',
          langId: localeState.language,
          modBy: userState?.userId,
        },
      })

      actions.setSubmitting(false)

      const { errors } = getState('Order')

      if (errors.length > 0) {
        toast.error('Error, please try again later')
      } else {
        setSendRequest(true)
      }
    }
  }

  const ExitCheckoutProcess = () => {
    if (SendRequest === true) {
      history.push('/')
      orderActions.ResetCheckoutState({
        reset: 'true',
      })
    }
  }

  return (
    <>
      <div className={SendRequest ? 'hidden' : 'block'}>
        <h4 className="text-primary uppercase mb-6">{pageContent?.step_2?.main_title}</h4>
        <h4 className="text-primary-dark mb-6">{pageContent?.step_2?.title_1}</h4>
        <p className="mb-6 mt-2 text-gray-400 text-sm">{pageContent?.step_2?.text_1}</p>
        <Formik
          initialValues={{ description: '', userAgreement: false }}
          validationSchema={Yup.object().shape({
            description: Yup.string().max(600),
            userAgreement: Yup.boolean().oneOf([true], pageContent?.step_2?.error_1),
          })}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, errors, isSubmitting }) => {
            return (
              <Form className="flex flex-col justify-start">
                <RequestDescription
                  errors={errors}
                  pageContent={pageContent?.step_2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Button
                  className="bg-primary text-white md:self-start cursor-pointer hover:text-primary hover:bg-transparent border border-0 border-primary hover:border-1"
                  disabled={isSubmitting}
                  label={pageContent?.step_2?.btn_text}
                  type="submit"
                />
              </Form>
            )
          }}
        </Formik>
      </div>
      <div className={`text-center w-full md:w-10/12 mx-auto ${SendRequest ? 'block' : 'hidden'}`}>
        <h2 className="text-primary mb-12">{pageContent?.step_2_sent?.main_title}</h2>
        <p className="text-base md:text-xl text-primary-dark font-bold mb-4">
          {pageContent?.step_2_sent?.title}
        </p>
        <p className="text-sm md:text-lg text-primary-dark font-medium mb-4">
          {' '}
          {pageContent?.step_2_sent?.text}
        </p>

        <Button
          className="text-white bg-primary mt-8 w-full md:w-auto"
          label={pageContent?.step_2_sent?.btn_text}
          //onClick={nextStep}
          onClick={() => ExitCheckoutProcess()}
        />
      </div>
    </>
  )
}
