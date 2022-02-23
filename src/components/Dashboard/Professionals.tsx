import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'

// Store
import { getState, useStore } from '../../store/models'
//Component
import UserPic from '../../assets/img/owl-goodowl-mobile.jpg'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ForwardIcon, CarretDown, CarretUp } from '../shared/Icons'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Rating } from '../shared/proprofile/meta/Rating'
import { Modal } from '../../components/shared/Modal'
import { InputComponent } from '../../components/shared/forms/FormElements/Input'
import { Button } from '../shared/Button'
import { EmployeeInviteForm } from '../../modules/Employee/components/EmployeeInvite'
import initialValues from '../../modules/Employee/config/initial-values'
import validationSchema from '../../modules/Employee/config/validation-schema'

type ProfessionalsTypes = {
  textContent: any
}

export const Professionals: React.FC<ProfessionalsTypes> = ({ textContent = '' }) => {
  const [userState] = useStore('User')
  const [dashboardState, dashboardActions] = useStore('Dashboard')
  const [localeState] = useStore('Locale')
  const [, proActions] = useStore('Professionals')
  const [pageState] = useStore('PageContent')

  const isFirm = userState.session?.decodedToken.permissions.includes('firmDashboard')
  const { firmId } = userState
  const { proId } = userState
  const [SortedData, setSortedData] = useState([] as any)
  const [RevenueSortingState, setRevenueSortingState] = useState<string>('asc')
  const [SalesSortingState, setSalesSortingState] = useState<string>('asc')
  const [NameSortingState, setNameSortingState] = useState<string>('asc')
  const [IdSortingState, setIdSortingState] = useState<string>('asc')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [ModalAddEmployee, setModalAddEmployee] = useState<boolean>(false)

  React.useEffect(() => {
    ;(async () => {
      if (firmId && isFirm && localeState.language) {
        await dashboardActions.FirmProfessionalData({
          firmId,
          langId: localeState.language,
          searchName: searchTerm,
        })
      }
    })()
  }, [localeState.language])

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      ;(async () => {
        if (firmId && isFirm && localeState.language) {
          await dashboardActions.FirmProfessionalData({
            firmId,
            langId: localeState.language,
            searchName: searchTerm,
          })
        }
      })()
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [localeState.language, searchTerm])

  React.useEffect(() => {
    if (dashboardState?.dashboard_firm_professionals.length !== 0) {
      setSortedData(dashboardState.dashboard_firm_professionals)
    }
  }, [dashboardState.dashboard_firm_professionals])

  const handleNameSorting = () => {
    if (NameSortingState === 'asc') {
      const sorted = [...SortedData].sort((a, b) => (a.name > b.name ? 1 : -1))
      setNameSortingState('desc')
      setSortedData(sorted)
    } else {
      const sorted = [...SortedData].sort((a, b) => (a.name > b.name ? -1 : 1))
      setNameSortingState('asc')
      setSortedData(sorted)
    }
  }

  const handleIdSorting = () => {
    if (IdSortingState === 'asc') {
      const sorted = [...SortedData].sort((a, b) => (a.proId > b.proId ? 1 : -1))
      setIdSortingState('desc')
      setSortedData(sorted)
    } else {
      const sorted = [...SortedData].sort((a, b) => (a.proId > b.proId ? -1 : 1))
      setIdSortingState('asc')
      setSortedData(sorted)
    }
  }

  const handleRevenueSorting = () => {
    if (RevenueSortingState === 'asc') {
      const sorted = [...SortedData].sort((a, b) => b.revenue - a.revenue)
      setRevenueSortingState('desc')
      setSortedData(sorted)
    } else {
      const sorted = [...SortedData].sort((a, b) => a.revenue - b.revenue)
      setRevenueSortingState('asc')
      setSortedData(sorted)
    }
  }

  const handleSalesSorting = () => {
    if (SalesSortingState === 'asc') {
      const sorted = [...SortedData].sort((a, b) => b.sales - a.sales)
      setSalesSortingState('desc')
      setSortedData(sorted)
    } else {
      const sorted = [...SortedData].sort((a, b) => a.sales - b.sales)
      setSalesSortingState('asc')
      setSortedData(sorted)
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
      // TODO: reset form
      console.log('NO ERROR SHOULD RESET !')
      toast.success('Invitation sent')
      actions.resetForm({ values: '' })
    }
  }

  return (
    <>
      <div className="bg-white py-4 px-5 module">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <p className="text-primary font-medium text-md mb-5 md:mb-0">{textContent.prof_title}</p>
          <div className="flex justify-between flex-wrap">
            <InputComponent
              icon="search"
              label={textContent.prof_search}
              placeholder={textContent.prof_search}
              light
              shadow
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
            <Button
              className="flex items-center bg-primary text-white btn-sm ml-2 mt-4 sm:mt-0"
              iconBefore="add"
              label={textContent.prof_add}
              onClick={() => setModalAddEmployee(!ModalAddEmployee)}
            />
          </div>
        </div>
        <div className="md:hidden mt-5">
          {SortedData?.map((pro) => (
            <div
              key={pro.proId}
              className="border-b border-gray-200 text-gray-600 text-sm flex items-center -mx-2"
            >
              <div className="w-1/5 px-2 py-3">
                <div className="w-8 h-auto rounded-full overflow-hidden m-2">
                  <img alt="kris" src={UserPic} />
                </div>
              </div>
              <div className="w-2/5 px-2 py-3">
                <span className="text-xxs font-medium">{pro.proId}</span>
                <br />
                <span className="font-bold">
                  {pro.profile.firstName} {pro.profile.lastName}
                </span>
                <div>
                  {pro?.professions?.map((profession, k) => (
                    <span key={profession.profId}>
                      {k > 0 ? ', ' : null}
                      {profession.name}
                    </span>
                  ))}
                </div>
                {/* <Rating className="mt-1" rating={pro.rating} /> */}
              </div>
              <div className="w-2/5 px-2 py-3">
                <div className="flex">
                  {/* <span
                  className={`transform rotate mr-1 ${
                    pro.percentage >= 0 ? '-rotate-45' : 'rotate-45'
                  }`}
                >
                  <ForwardIcon fillColour="gray-600" size={12} />
                </span> */}
                  {pro.sales} {textContent.prof_col_6}
                </div>
                {/* <span
                className={`text-xxs italic ${
                  pro.percentage >= 0 ? 'text-primary' : 'text-error'
                }`}
              >
                {pro.percentage >= 0 ? '+' : ''}
                {pro.percentage}% than average
              </span>{' '} */}
                <br />
                $--
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block mt-10">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-gray-400 font-medium py-2 px-1">
                  <div className="flex items-center">
                    <span>{textContent.prof_col_1}</span>
                    <span className="inline-block cursor-pointer" onClick={() => handleIdSorting()}>
                      {IdSortingState === 'asc' ? (
                        <CarretDown fillColour="gray-400" size={20} />
                      ) : (
                        <CarretUp fillColour="gray-400" size={20} />
                      )}
                    </span>
                  </div>
                </th>
                <th className="text-gray-400 font-medium py-2 px-1">
                  <div className="flex items-center">
                    <span>{textContent.prof_col_2}</span>
                    <span
                      className="inline-block cursor-pointer"
                      onClick={() => handleNameSorting()}
                    >
                      {NameSortingState === 'asc' ? (
                        <CarretDown fillColour="gray-400" size={20} />
                      ) : (
                        <CarretUp fillColour="gray-400" size={20} />
                      )}
                    </span>
                  </div>
                </th>
                <th className="text-gray-400 font-medium py-2 px-1 text-left">
                  {textContent.prof_col_3}
                </th>
                <th className="text-gray-400 font-medium py-2 px-1 text-left">
                  {textContent.prof_col_4}
                </th>
                <th className="text-gray-400 font-medium py-2 px-1">
                  <div className="flex items-center">
                    <span>{textContent.prof_col_6}</span>
                    <span
                      className="inline-block cursor-pointer"
                      onClick={() => handleSalesSorting()}
                    >
                      {SalesSortingState === 'asc' ? (
                        <CarretDown fillColour="gray-400" size={20} />
                      ) : (
                        <CarretUp fillColour="gray-400" size={20} />
                      )}
                    </span>
                  </div>
                </th>
                <th className="text-gray-400 font-medium py-2 px-1">
                  <div className="flex items-center">
                    <span>Revenue</span>
                    <span
                      className="inline-block cursor-pointer"
                      onClick={() => handleRevenueSorting()}
                    >
                      {RevenueSortingState === 'asc' ? (
                        <CarretDown fillColour="gray-400" size={20} />
                      ) : (
                        <CarretUp fillColour="gray-400" size={20} />
                      )}
                    </span>
                  </div>
                </th>
                <th className="text-gray-400 font-medium py-2 px-1 text-left">
                  {textContent.prof_col_7}
                </th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-600 font-medium">
              {SortedData.map((pro) => (
                <tr key={pro.proId} className="border-b border-gray-200">
                  <td className="py-4 px-1">{pro.proId}</td>
                  <td className="py-4 px-1">
                    <div className="flex items-center">
                      <div className="w-8 h-auto rounded-full overflow-hidden m-2">
                        <img alt="kris" src={UserPic} />
                      </div>
                      <span>
                        {pro.profile.firstName} {pro.profile.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-1">
                    <span>
                      {pro.professions.map((profession, k) => (
                        <span key={profession.profId}>
                          {k > 0 ? ', ' : null}
                          {profession.name}
                        </span>
                      ))}
                    </span>
                    {/* <Rating className="mt-1" rating={pro.rating} /> */}
                  </td>
                  <td className="py-4 px-1">
                    {pro.addresses[0].streetNumber} {pro.addresses[0].street},{' '}
                    {pro.addresses[0].apartment}
                    <br />
                    {pro.addresses[0].city}, {pro.addresses[0].region} {pro.addresses[0].postalCode}
                  </td>
                  <td className="py-4 px-1">
                    <div className="flex">
                      {/* <span
                      className={`transform rotate ${
                        pro.percentage >= 0 ? '-rotate-45' : 'rotate-45'
                      }`}
                    >
                      <ForwardIcon fillColour="gray-600" size={12} />
                    </span> */}
                      {pro.sales} {textContent.prof_col_6}
                    </div>
                    {/* <span
                    className={`text-xxs italic ${
                      pro.percentage >= 0 ? 'text-primary' : 'text-error'
                    }`}
                  >
                    {pro.percentage >= 0 ? '+' : ''}
                    {pro.percentage}% than average
                  </span> */}
                  </td>
                  <td className="py-4 px-1">$--</td>
                  <td className="py-4 px-1">
                    T.{pro.phone} <br /> {pro.proEmail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Invite Employee */}
      <Modal
        modalClose={() => setModalAddEmployee(!ModalAddEmployee)}
        modalOpen={ModalAddEmployee}
        width="w-full md:w-2/3 xl:w-1/3"
      >
        <div className="bg-gray-200 p-12 text-center">
          <p className="mb-8">{pageState['professionals']?.add_professional.title}</p>
          <Formik
            initialValues={{
              ...initialValues.invite,
            }}
            validationSchema={validationSchema['invite'][0]}
            enableReinitialize
            onSubmit={handleInviteSubmit}
          >
            {({ handleChange, handleBlur, errors, isSubmitting, initialValues, values }) => {
              return (
                <Form>
                  <EmployeeInviteForm
                    errors={errors}
                    initialValues={initialValues}
                    isSubmitting={isSubmitting}
                    pageContent={pageState['professionals']}
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
    </>
  )
}
