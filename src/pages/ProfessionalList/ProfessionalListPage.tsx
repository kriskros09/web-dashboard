/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, ReactElement, useRef } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

//Hook
import { useContent } from '../../hooks'
// Utils
import Utils from '../../utils'
// Store
import { getState, useStore } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
//Components
import UserPic from '../../assets/img/owl-goodowl-mobile.jpg'
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { ClearIcon, Edit } from '../../components/shared/Icons'
import { Rating } from '../../components/shared/proprofile/meta/Rating'
import { Modal } from '../../components/shared/Modal'
import { EmployeeProfileForm } from '../../modules/Employee/components/EmployeeProfile'
import initialValues from '../../modules/Employee/config/initial-values'
import validationSchema from '../../modules/Employee/config/validation-schema'
import { EmployeeInviteForm } from '../../modules/Employee/components/EmployeeInvite'
import { EmployeeRemoveForm } from '../../modules/Employee/components/EmployeeRemove'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const PROFESSIONALS = 'professionals'
const PAGE_NAMES = [GLOBAL, PROFESSIONALS]

const ProfessionalListPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })

  const { proId, firmId, userId } = getState('User')
  const [localeState] = useStore('Locale')
  const [pageState] = useStore('PageContent')
  const pageName = 'professionals'
  const [proState, proActions] = useStore('Professionals')

  const [ModalRemove, setModalRemove] = useState<boolean>(false)
  const [ModalAddEmployee, setModalAddEmployee] = useState<boolean>(false)
  const [ModalEditVisibility, setModalEditVisibility] = useState<boolean>(false)
  const [ProEdit, setProEdit] = useState<any>()
  const [EmployeeToRemove, setEmployeeToRemove] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  React.useEffect(() => {
    ;(async () => {
      if (firmId) {
        await proActions.FirmEmployees({
          langId: localeState.language,
          firmId,
          orderBy: 'createdAt',
          status: 1,
          searchName: searchTerm,
        })
      }
    })()
  }, [localeState.language, proState.updateFirmProfessional])

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      ;(async () => {
        if (firmId) {
          await proActions.FirmEmployees({
            langId: localeState.language,
            firmId,
            orderBy: 'createdAt',
            status: 1,
            searchName: searchTerm,
          })
        }
      })()
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [localeState.language, searchTerm])

  const { professionals } = proState
  const handleRemove = (proId) => {
    setModalRemove(!ModalRemove)
    setEmployeeToRemove(proId)
  }

  const handleEditClick = (id) => {
    if (ProEdit !== undefined) {
      setProEdit(undefined)
    } else {
      const pro = professionals.filter((professional) => professional.proId === id)

      setProEdit({ ...pro[0] })
    }
    setModalEditVisibility(!ModalEditVisibility)
  }

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true)

    proActions.UpdateFirmEmployee({
      proId: ProEdit.proId,
      professionalInput: {
        phone: values.phone,
        proEmail: values.proEmail,
        color: values.color,
        photo: values.photo,
        professions: values.professions.map((profession) => ({
          profId: profession.value,
        })),
        modBy: firmId,
      },
    })
    const { errors } = getState('Professionals')

    actions.setSubmitting(false)

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Employee Profile updated')
    }
  }

  const handleInviteSubmit = async (values, actions) => {
    actions.setSubmitting(true)

    await proActions.InviteEmployee({
      firmInviteInput: {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        firmId,
        proId,
        langId: localeState.language,
      },
    })

    const { errors } = getState('Professionals')

    actions.setSubmitting(false)

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      actions.resetForm({})
      toast.success('Invitation sent')
    }
  }

  const handleRemoveSubmit = async (values, actions) => {
    actions.setSubmitting(true)
    await proActions.RemoveEmployee({
      firmRemoveInput: {
        password: values.password,
        confirmPassword: values.confirmPassword,
        firmId,
        proId,
        userId,
        modBy: firmId,
      },
    })
    const { errors } = getState('Professionals')

    actions.setSubmitting(false)

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      actions.resetForm({})
      toast.success('Employee Removed from your firm')
    }
  }

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading
            title={content.page[PROFESSIONALS].texts.main_title}
            search
            onSearch={(e) => setSearchTerm(e.currentTarget.value)}
          >
            {{
              sort: (
                <>
                  <Button
                    className="bg-primary text-white btn-sm ml-5 flex"
                    iconBefore="profile"
                    label={content.page[PROFESSIONALS].texts.add_btn}
                    onClick={() => setModalAddEmployee(!ModalAddEmployee)}
                  />
                </>
              ),
              button: (
                <div>
                  <Button
                    className="bg-primary text-white btn-sm flex ml-8 xl:ml-2 mt-5 mb-5"
                    iconBefore="profile"
                    label={content.page[PROFESSIONALS].texts.add_btn}
                    onClick={() => setModalAddEmployee(!ModalAddEmployee)}
                  />
                </div>
              ),
            }}
          </AccountHeading>
          <div className="flex flex-wrap xl:-mx-5">
            {professionals.map((professional, index) => (
              <div key={professional.proId} className="w-full md:w-1/2 lg:w-1/3 px-5 py-2">
                <div className="bg-white px-5 py-4 md:px-6 md:py-5 shadow-md relative h-full">
                  <div className="absolute flex right-0 top-0">
                    <button
                      className="mt-4 md:mt-5 focus:outline-none"
                      title={content.page[PROFESSIONALS].texts.edit_infobox}
                      onClick={() => handleEditClick(professional.proId)}
                    >
                      <Edit fillColour="gray-300" size={24} />
                    </button>
                    <button
                      className="ml-4 mr-5 mt-4 md:mr-6 md:mt-5 focus:outline-none"
                      title={content.page[PROFESSIONALS].texts.delete_infobox}
                      onClick={() => handleRemove(professional.proId)}
                    >
                      <ClearIcon fillColour="gray-300" size={24} />
                    </button>
                  </div>

                  <div className="flex mt-4 -mx-2 md:-mx-3">
                    <div className="w-1/4 px-2 py-4 md:px-3 flex-shrink-0">
                      <ImageWrapper className="overflow-hidden">
                        <img
                          alt=""
                          className=""
                          src={professional.photo ? professional.photo : UserPic}
                        />
                      </ImageWrapper>
                    </div>
                    <div className="w-3/4 px-2 py-4 md:px-3 flex-shrink-1">
                      <div className="flex items-center">
                        <p className="text-gray-600 font-bold">
                          {professional.profile.firstName} {professional.profile.lastName}
                        </p>
                        <ColorSwatche color={professional.color} />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 mb-2">
                        {professional.professions.map((profession, index) => (
                          <span key={profession.profId}>
                            {index > 0 ? ' - ' : ''}
                            {profession.name}
                          </span>
                        ))}
                        {/* {data[key].profession} - {data[key].Licence} - {data[key].year} */}
                      </p>
                      <div className="border-t border-gray-200 text-gray-400 pt-2 flex flex-col">
                        <p className="font-bold text-sm">{professional.domains}</p>
                        <div className="mt-auto">
                          <p className="text-sm">{professional.phone}</p>
                          <p className="text-sm">{professional.proEmail}</p>
                          <Rating className="mt-2" rating={professional.reviews} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Remove Employee */}
          <Modal
            modalClose={() => setModalRemove(!ModalRemove)}
            modalOpen={ModalRemove}
            width="w-full md:w-2/3 xl:w-1/3"
            light
          >
            <div className="bg-gray-200 p-12 text-center">
              <p className="font-bold mb-8">
                {content.page[PROFESSIONALS].remove_professional.title}
              </p>
              <p className="mb-8">{content.page[PROFESSIONALS].remove_professional.text}</p>
              <Formik
                initialValues={{
                  ...initialValues.remove,
                }}
                validationSchema={validationSchema['remove'][0]}
                enableReinitialize
                onSubmit={handleRemoveSubmit}
              >
                {({ handleChange, handleBlur, errors, isSubmitting, initialValues, values }) => {
                  return (
                    <Form>
                      <EmployeeRemoveForm
                        errors={errors}
                        initialValues={initialValues}
                        isSubmitting={isSubmitting}
                        pageContent={content.page[PROFESSIONALS]}
                        values={values}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </Modal>

          {/* Invite Employee */}
          <Modal
            modalClose={() => setModalAddEmployee(!ModalAddEmployee)}
            modalOpen={ModalAddEmployee}
            width="w-full md:w-2/3 xl:w-1/3"
            light
          >
            <div className="bg-gray-200 p-12 text-center">
              <p className="mb-8">{content.page[PROFESSIONALS].add_professional.title}</p>
              <Formik
                initialValues={{
                  ...initialValues.invite,
                }}
                validationSchema={validationSchema['invite'][0]}
                // enableReinitialize="false"
                onSubmit={handleInviteSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  errors,
                  isSubmitting,
                  initialValues,
                  values,
                  resetForm,
                }) => {
                  console.log('here ======>', values)

                  return (
                    <Form>
                      <EmployeeInviteForm
                        errors={errors}
                        initialValues={initialValues}
                        isSubmitting={isSubmitting}
                        pageContent={content.page[PROFESSIONALS]}
                        values={values}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </Modal>

          {/* Employee Details */}
          {ProEdit !== undefined && ProEdit ? (
            <Modal modalClose={() => handleEditClick(ProEdit[0])} modalOpen={ModalEditVisibility}>
              <div className="bg-white p-10">
                <Formik
                  initialValues={{
                    ...initialValues.employee,
                    ...ProEdit,
                  }}
                  validationSchema={validationSchema['employee'][0]}
                  enableReinitialize
                  onReset={() => handleEditClick(ProEdit[0])}
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
                    resetForm,
                    handleReset,
                    setValues,
                  }) => {
                    console.log('VALUES', values)

                    return (
                      <Form className=" text-center flex flex-col lg:flex-row lg:-mx-5 justify-start">
                        <EmployeeProfileForm
                          errors={errors}
                          handleReset={handleReset}
                          initialValues={initialValues}
                          isSubmitting={isSubmitting}
                          pageContent={content.page[PROFESSIONALS]}
                          resetForm={resetForm}
                          setFieldValue={setFieldValue}
                          setValues={setValues}
                          values={values}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form>
                    )
                  }}
                </Formik>
              </div>
            </Modal>
          ) : null}
        </AccountLayout>
      </Layout>
    </Container>
  )
}

const ColorSwatche = styled.span`
  background-color: ${(props) => props.color || 'unset'};
  width: 12px;
  height: 12px;
  border-radius: 12px;
  display: block;
  margin-left: 0.75rem;
`
const Colorpicked = styled.span`
  background-color: ${(props) => props.color || 'unset'};
  width: 48px;
  height: 48px;
  border-radius: 4px;
  display: block;
  cursor: pointer;
`
const Colorpicker = styled.span`
  background-color: ${(props) => props.color || 'unset'};
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: block;
  margin: 0.25rem;
  cursor: pointer;
`

const CheckboxGroup = styled.div`
  .input-group {
    @media (min-width: 768px) {
      margin-top: 0;
    }

    label {
      color: #888888;
      font-weight: 400;
      font-size: 0.875rem;
    }
  }
`

const FormRow = styled.div.attrs({
  className: 'lg:flex',
})`
  margin-top: 1rem;
  .input-wrapper + .select-wrapper,
  .select-wrapper + .input-wrapper {
    margin-top: 1rem;
  }
  @media (min-width: 992px) {
    margin: 0.5rem -0.5rem;
    & .input-wrapper,
    & .select-wrapper {
      width: 100%;
      padding: 0 0.375rem;
      & + .input-wrapper,
      & + .select-wrapper {
        margin-top: 0;
      }
    }
  }
`

const ImageWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 5rem;
  position: relative;
  @media (min-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
  @media (min-width: 992px) {
    width: 4rem;
    height: 4rem;
  }
  @media (min-width: 1200px) {
    width: 5rem;
    height: 5rem;
  }
  img {
    height: 3rem;
    width: auto;
    max-width: unset;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    @media (min-width: 768px) {
      height: 4rem;
    }
    @media (min-width: 992px) {
      height: 4rem;
    }
    @media (min-width: 1200px) {
      height: 5rem;
    }
  }
`

export default ProfessionalListPage
