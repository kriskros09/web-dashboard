/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, ReactElement } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import styled from 'styled-components'
import MomentLocaleUtils from 'react-day-picker/moment'
import { Formik, Form } from 'formik'

// Utils
import Utils from '../../utils'
// Hooks
import { useContent } from '../../hooks'
// Store
import { useStore, getState } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { WorkingHours } from '../../modules/Availabilites/components/WorkingHours'
import { VacationsRow } from '../../modules/Availabilites/components/VacationsRow'
import initialValues from '../../modules/Availabilites/config/initial-values'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const AVAILABILITIES = 'availabilities'
const PAGE_NAMES = [GLOBAL, AVAILABILITIES]

const AvailabilityPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })

  const [pageState, pageActions] = useStore('PageContent')
  const pageName = 'availabilities'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')
  const [availabilitiesState, availabilitiesActions] = useStore('Availability')
  const [userState, userActions] = useStore('User')
  const [globalState, globalActions] = useStore('Global')
  const [availableHours, setAvailableHours] = useState([] as any)
  const [vacationsPeriod, setVacationsPeriod] = useState([] as any)

  const { proId } = getState('User')

  React.useEffect(() => {
    ;(async () => {
      if (proId) {
        await availabilitiesActions.getAvailabilities({
          proId,
        })
      }
    })()
  }, [
    proId,
    availabilitiesState.deleteAvailability,
    availabilitiesState.updateAvailability,
    availabilitiesState.createAvailability,
    availabilitiesState.changeAvailabilityStatus,
  ])
  React.useEffect(() => {
    ;(async () => {
      if (proId) {
        await availabilitiesActions.getDaysOff({
          proId,
          orderBy: 'startDate',
        })
      }
    })()
  }, [
    proId,
    availabilitiesState.deleteDayOff,
    availabilitiesState.createDayOff,
    availabilitiesState.updateDayOff,
  ])

  React.useEffect(() => {
    setAvailableHours(availabilitiesState.availabilities)
  }, [availabilitiesState.availabilities])

  React.useEffect(() => {
    setVacationsPeriod(availabilitiesState.daysOff)
  }, [availabilitiesState.daysOff])

  //displays validated working hours / days in calendar
  const ValidatedWorkingHours = availableHours
    .filter((items) => items.status === 1)
    .map((d) => ({ daysOfWeek: Object.keys(d.weekdays).map((key) => d.weekdays[key].dayId) }))

  const ValidatedVacations = vacationsPeriod
    .filter((items) => items.status === 1)
    .map((d) => ({
      from: new Date(d.startDate),
      to: new Date(d.endDate),
    }))
  const selectedDays = [ValidatedWorkingHours[0], ValidatedVacations[0]]

  //styles modifiers for validated working hours / days and vacations in calendar
  const modifiers = {
    working: ValidatedWorkingHours,
    vacations: ValidatedVacations,
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  const availabilitiesStateRefactored = availabilitiesState.availabilities.map((availability) => ({
    ...availability,
    weekdays: Utils.Form.FormatDefaultSelectedWeekdays(availability.weekdays, globalState.weekdays),
    modify: false,
  }))

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
          <AccountHeading title={content.page[AVAILABILITIES].texts.main_title} />
          <div className="w-full bg-white md:py-10 md:px-20">
            <h4 className="hidden md:block text-2xl text-primary mb-6 font-medium text-center">
              {content.page[AVAILABILITIES].availabilities.main_title}
            </h4>

            <Formik
              initialValues={{
                ...initialValues.workingHours,
                availabilities: availabilitiesStateRefactored,
              }}
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
                return (
                  <Form className="flex flex-col justify-start">
                    <WorkingHours
                      errors={errors}
                      initialValues={initialValues}
                      pageContent={content.page[AVAILABILITIES]}
                      setFieldValue={setFieldValue}
                      values={values}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Form>
                )
              }}
            </Formik>

            <div className="flex flex-col xxl:flex-row justify-between mt-8">
              <div className="bg-gray-150 order-1 xxl:order-0 self-start mt-6 xxl:mt-0">
                <StyledCalendar>
                  <DayPicker
                    locale={localeState.language}
                    localeUtils={MomentLocaleUtils}
                    modifiers={modifiers}
                    numberOfMonths={2}
                    selectedDays={selectedDays}
                  />
                </StyledCalendar>
                <div className="flex items-center pl-4 pb-4">
                  <p className="text-xs text-gray-400 font-medium mr-4">
                    <span className="inline-block w-3 h-3 bg-primary rounded-full" />{' '}
                    {content.page[AVAILABILITIES].days_off.text_2}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    <span className="inline-block w-3 h-3 bg-primary-dark rounded-full" />{' '}
                    {content.page[AVAILABILITIES].days_off.text_3}
                  </p>
                </div>
              </div>
              <div className="xxl:w-1/2 order-0 xxl:order-1">
                <Formik
                  initialValues={{
                    ...initialValues.daysOff,
                    daysOff: availabilitiesState.daysOff,
                  }}
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
                    return (
                      <Form className="flex flex-col justify-start">
                        <VacationsRow
                          errors={errors}
                          initialValues={initialValues}
                          pageContent={content.page[AVAILABILITIES]}
                          setFieldValue={setFieldValue}
                          values={values}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form>
                    )
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </AccountLayout>
      </Layout>
    </Container>
  )
}

const StyledCalendar = styled.div`
  .DayPicker {
    @media (min-width: 1440px) {
      width: 100%;
    }
    .DayPicker-NavBar {
      display: flex;
      justify-content: space-between;
      padding: 30px 20px 20px 20px;
      position: absolute;
      width: 100%;
      .DayPicker-NavButton {
        margin: 0 !important;
        position: relative;
        top: unset;
        right: unset;
        left: unset;
      }
    }
    .DayPicker-Month {
      background-color: white;
      margin: 1em;
    }
    .DayPicker-Caption {
      text-align: center;
      font-weight: 600;
      padding-top: 10px;
      padding-bottom: 10px;
      color: #888888;
      font-size: 16px;
    }
    .DayPicker-Weekday {
      color: var(--color-primary);
      font-size: 8px;
      line-height: 1;
      text-transform: uppercase;
      padding-bottom: 10px;
    }

    .DayPicker-Day {
      line-height: 1.2;
      color: #888888;
    }

    .DayPicker-Day--working:not(.DayPicker-Day--outside) {
      background-color: var(--color-primary-light);
      color: var(--color-primary);
      font-weight: 600;
    }
    .DayPicker-Day--vacations:not(.DayPicker-Day--outside) {
      background-color: var(--color-primary-dark);
      color: white;
      font-weight: 600;
    }
  }
`

export default AvailabilityPage
