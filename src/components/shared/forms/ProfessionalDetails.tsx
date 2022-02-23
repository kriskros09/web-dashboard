import React, { FC } from 'react'
import { Formik, Form } from 'formik'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Yup from 'yup'
import { toast } from 'react-toastify'

// Utils
import Utils from '../../../utils'
// Store
import { useStore } from '../../../store/models'
// Component
import { Button } from '../Button'
import initialValues from '../../../modules/Profile/config/initial-values'
import formModel from '../../../modules/Profile/config/form-model'
import { ProFormDataMapper } from '../../../utils/forms'
import validationSchema from '../../../modules/Profile/config/validation-schema'
import { ProProfileForm } from '../../../modules/Profile/components/proProfileForm'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { pro } = formModel

type FormType = {
  pageContent?: any
  isViewed: boolean
}

export const ProfessionalDetails: FC<FormType> = ({ pageContent, isViewed }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')
  const [profileState, profileActions] = useStore('Profiles')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userState, userActions] = useStore('User')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')
  const { languages } = profileState.pro
  const { professions } = profileState.pro
  const defaultlang = Utils.Form.FormatDefaultSelectedLangs(languages, globalState.languages)
  const defaultprof = Utils.Form.FormatDefaultSelectedProfs(professions, globalState.professions)
  React.useEffect(() => {
    const { proId } = userState

    if (proId && isViewed && localeState.language) {
      profileActions.ProProfileInfo({
        proId,
      })
    }
  }, [localeState.language, profileState.createLicence, isViewed])

  const handleSubmit = async (values, actions) => {
    const { licences, photo } = values
    actions.setSubmitting(true)
    const mappedData = ProFormDataMapper(values, formModel.pro.fields)

    await profileActions.ProProfileForm({
      proId: profileState.pro.proId,
      professionalInput: {
        ...mappedData,
        status: 1,
        photo,
        userId: userState.userId,
        modBy: userState.userId,
      },
    })
    console.log('LICENCES ======>>>>>>>>>>', licences)
    licences.map((licence) => {
      const { licId, ...licenceInfo } = licence

      if (!licId.includes('TEMP')) {
        console.log('UPDATE', licence)
        profileActions.ProLicenceUpdate({
          licId,
          licenceInput: {
            ...licenceInfo,
            status: 1,
            proId: profileState.pro.proId,
            modBy: userState.userId,
          },
        })
      } else if (
        licId.includes('TEMP') &&
        licence.year !== '' &&
        licence.country !== '' &&
        licence.region !== '' &&
        licence.licence !== ''
      ) {
        profileActions.ProLicenceCreation({
          licenceInput: {
            ...licenceInfo,
            status: 1,
            proId: profileState.pro.proId,
            modBy: userState.userId,
          },
        })
      }
    })

    actions.setSubmitting(false)
    toast.success('Your information is successfully saved')
  }

  return (
    <Formik
      initialValues={{
        ...initialValues.pro,
        ...profileState.pro,
        languages: defaultlang,
        professions: defaultprof,
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema.pro[0]}
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
        console.log('V ===========>', values)

        return (
          <Form className="flex flex-col justify-start">
            <ProProfileForm
              errors={errors}
              initialValues={initialValues}
              pageContent={pageContent}
              setFieldValue={setFieldValue}
              values={values}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <div className="lg:flex mt-10">
              <Button
                className="bg-primary text-white"
                disabled={isSubmitting}
                label={pageContent?.texts.save_btn}
                type="submit"
              />
              {/* <Button
                className="border border-primary text-primary mt-4 lg:ml-4"
                label={pageContent?.texts.cancel_btn}
              /> */}
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
