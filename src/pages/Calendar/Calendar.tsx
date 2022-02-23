import React, { ReactElement, useState, useRef } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import MomentLocaleUtils from 'react-day-picker/moment'
import DayPicker from 'react-day-picker'
import 'moment/locale/en-ca'
import 'moment/locale/fr-ca'
import styled from 'styled-components'
import i18next from 'i18next'
import 'react-big-calendar/lib/css/react-big-calendar.css'

//Hook
import { useContent } from '../../hooks'
import UseCheckScreen from '../../hooks/ResponsiveDetection'
// Helpers
import { userSessionMapper } from '../../store/helpers/mappers'
// Store
import { useStore, getState } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { Checkbox } from '../../components/shared/forms/FormElements/Checkbox'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Modal } from '../../components/shared/Modal'
import { CalendarIcon, ClearIcon } from '../../components/shared/Icons'
import { Button } from '../../components/shared/Button'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const CALENDAR = 'calendar'
const PAGE_NAMES = [GLOBAL, CALENDAR]

const localizer = momentLocalizer(moment)

const CalendarPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const { proId, firmId } = getState('User')
  const { permissions } = userSessionMapper(getState('User')?.session)
  const isPro = permissions.includes('profCalendar')
  const isFirm = permissions.includes('firmCalendar')

  const [localeState] = useStore('Locale')
  const [appointmentsState, appointmentsActions] = useStore('Appointments')
  const Screen = UseCheckScreen()
  const [filterVisibility, SetFilterVisibility] = useState<boolean>(false)
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [clikedEvent, setClickedEvent] = useState([] as any)
  const [DefaultChecked, setDefaultChecked] = useState<boolean>(true)
  const filterDiv = useRef<HTMLDivElement>(null)
  const [EventsVisibilityList, setEventsVisibilityList] = useState([] as any)
  let AppointmentToDisplay = [] as any

  React.useEffect(() => {
    ;(async () => {
      if (firmId && isFirm) {
        await appointmentsActions.GetFirmAppointments({
          firmId,
          langId: localeState.language,
          dateFrom: '',
          dateTo: '',
        })
      } else if (proId && isPro) {
        await appointmentsActions.GetProAppointments({
          proId,
          langId: localeState.language,
          dateFrom: '',
          dateTo: '',
        })
      }
    })()
  }, [localeState.language])

  React.useEffect(() => {
    if (appointmentsState.appointments.length !== 0) {
      setEventsVisibilityList(appointmentsState.appointments?.map((pro) => pro.proId))
    }
  }, [appointmentsState.appointments])

  const { appointments } = appointmentsState

  //Big Calendar style
  const customStyle = {
    height: '750px',
    backgroundColor: 'white',
    padding: '40px',
  }

  // Style color event on calendar
  const eventStyleGetter = (tasks) => {
    const proColor = appointments
      .filter((pro) => pro.tasks.map((t) => t.taskId).includes(tasks.taskId))
      .map((p) => p.color)

    const backgroundColor = proColor ? proColor : 'unset'

    const style = {
      backgroundColor,
      fontSize: '11px',
      fontWeight: 600,
      padding: '4px 9px',
    }

    return {
      style,
    }
  }

  // Checkboxe visibility
  const handleListVisibilityChange = (id) => {
    if (EventsVisibilityList.includes(id)) {
      const currentEventsVisibilityList = [...EventsVisibilityList]
      const index = currentEventsVisibilityList.indexOf(id)
      setEventsVisibilityList(
        currentEventsVisibilityList
          .slice(0, index)
          .concat(currentEventsVisibilityList.slice(index + 1, currentEventsVisibilityList.length)),
      )
    } else {
      setEventsVisibilityList(EventsVisibilityList.concat(id))
    }
  }

  const handleListVisibilityAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filters = [filterDiv.current]
    setDefaultChecked(!DefaultChecked)

    for (const filter of filters) {
      const inputArray = filter?.querySelectorAll('input[name="pro"]') as NodeListOf<
        HTMLInputElement
      >
      const idArray: string[] = []

      if (e.target.defaultChecked) {
        // e.target.defaultChecked = false

        for (const input of inputArray) {
          input.defaultChecked = false
          input.checked = false

          idArray.length = 0
          EventsVisibilityList.length = 0
          handleListVisibilityChange(idArray)
        }
        handleListVisibilityChange(idArray)
      } else {
        for (const input of inputArray) {
          input.checked = true
          setDefaultChecked(true)

          const index = input.getAttribute('id')

          if (index) {
            if (!EventsVisibilityList.includes(index)) {
              idArray.push(index)
            }
          }
        }
        handleListVisibilityChange(idArray)
      }
    }
  }

  const handleFilterVisibility = () => {
    setDefaultChecked(true)
    setEventsVisibilityList(appointments.map((pro) => pro.proId))
    SetFilterVisibility(!filterVisibility)
  }

  // Appointment to display in calendar
  AppointmentToDisplay = appointments.filter((e) => EventsVisibilityList.includes(e.proId))
  let Appointments = [] as any

  // Reduce appointments array to have all app / tasks on same level
  if (AppointmentToDisplay.length !== 0) {
    Appointments = AppointmentToDisplay.map((pro) => pro.tasks)
      .reduce((prev, current) => [...prev, ...current])
      .map((e) => ({
        taskId: e.taskId,
        title: e.name,
        start: new Date(e.appointDate),
        end: new Date(e.appointDate),
        firstName: e.userFirstName,
        lastName: e.userLastName,
        phone: e.userPhone,
        description: e.mandateDescription,
        law: e.law,
        sector: e.sector,
        price: e.price,
      }))
  }

  console.log('LISTE', Appointments)

  // On calendar event click
  const handleClickEvent = (e) => {
    setModalVisibility(!modalVisibility)
    setClickedEvent(e)
  }

  // MOBILE
  const modifiers = Appointments.map((app) => app.start)
  const [SelectedDay, setSelectedDay] = useState<Date>(new Date())
  const appointmentList = Appointments.filter(
    (a) =>
      moment(a.start).isAfter(SelectedDay, 'day') === false &&
      moment(a.start).isBefore(SelectedDay, 'day') === false,
  )

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
          <AccountHeading title={content.page[CALENDAR].texts.main_title}>
            {{
              button: isFirm ? (
                <div className="bg-gray-300 py-4 px-8">
                  <Button
                    className="bg-white text-gray-300 btn-xs"
                    label="filter"
                    onClick={() => handleFilterVisibility()}
                  />
                </div>
              ) : null,
            }}
          </AccountHeading>
          <div className="flex xl:-mx-8">
            {isFirm && Screen === 'desktop-xl' ? (
              <div ref={filterDiv} className="w-1/5 px-4 hidden xl:block">
                <StyledCheckAll>
                  <Checkbox
                    defaultChecked={DefaultChecked}
                    id="all"
                    label={content.page[CALENDAR].texts.all_text}
                    name="check_all"
                    solid
                    onChange={(e) => handleListVisibilityAll(e)}
                  />
                </StyledCheckAll>
                {appointments.map((pro) => (
                  <StyledCheck key={pro.proId} color={pro.color ? pro.color : ''}>
                    <Checkbox
                      id={pro.proId}
                      label={`${pro.profile.firstName} ${pro.profile.lastName}`}
                      name="pro"
                      defaultChecked
                      solid
                      onChange={() => handleListVisibilityChange(pro.proId)}
                    />
                  </StyledCheck>
                ))}
              </div>
            ) : null}
            <div className={`w-full ${isFirm ? 'xl:w-4/5' : 'xl:w-full'} px-4 hidden md:block`}>
              <StyledCalendar>
                <Calendar
                  culture={i18next.language}
                  defaultDate={moment().toDate()}
                  endAccessor="end"
                  eventPropGetter={(event) => eventStyleGetter(event)}
                  events={Appointments}
                  localizer={localizer}
                  messages={{
                    date: localeState.language === 'en-CA' ? 'Date' : 'Date',
                    time: localeState.language === 'en-CA' ? 'Time' : 'Horaire',
                    event: localeState.language === 'en-CA' ? 'Appointment' : 'Rendez-vous',
                    allDay: localeState.language === 'en-CA' ? 'All Day' : 'Toute la journée',
                    week: content.page[CALENDAR].texts.week_btn,
                    work_week: localeState.language === 'en-CA' ? 'Work Week' : 'Jours ouvrables',
                    day: content.page[CALENDAR].texts.day_btn,
                    month: content.page[CALENDAR].texts.month_btn,
                    previous: content.page[CALENDAR].texts.back_btn,
                    next: content.page[CALENDAR].texts.next_btn,
                    yesterday: localeState.language === 'en-CA' ? 'Yesterday' : 'Hier',
                    tomorrow: localeState.language === 'en-CA' ? 'Tomorrow' : 'Demain',
                    today: content.page[CALENDAR].texts.today_btn,
                    agenda: content.page[CALENDAR].texts.agenda_btn,
                    noEventsInRange:
                      localeState.language === 'en-CA'
                        ? 'There are no events in this range.'
                        : 'Aucun rendez-vous prévu sur cette période',
                    showMore(e) {
                      return '+' + e
                    },
                  }}
                  startAccessor="start"
                  style={customStyle}
                  views={['month', 'week', 'day']}
                  popup
                  onSelectEvent={(e) => handleClickEvent(e)}
                />
              </StyledCalendar>
            </div>
            <div className="w-full xl:w-4/5 px-4 md:hidden">
              <StyledDayPickerCalendar>
                <DayPicker
                  className="Events"
                  locale={localeState.language}
                  localeUtils={MomentLocaleUtils}
                  modifiers={{ app: modifiers }}
                  selectedDays={SelectedDay}
                  onDayClick={(date) => setSelectedDay(date)}
                />
              </StyledDayPickerCalendar>
              <div className="bg-white -mx-6 p-5">
                <p className="text-primary uppercase text-sm font-medium">
                  {moment(SelectedDay).format('dddd DD')}
                </p>
                {appointmentList.length !== 0 ? (
                  appointmentList
                    .sort((a, b) => a.start - b.start)
                    .map((appointment) => (
                      <div key={appointment.taskId} className="flex my-5">
                        <div className="w-1/4">
                          <p className="text-xs text-gray-400">
                            {moment(appointment.start).format('LT')}
                          </p>
                        </div>

                        <div className="flex items-baseline">
                          {appointments
                            .filter((pro) =>
                              pro.tasks.map((t) => t.taskId).includes(appointment.taskId),
                            )
                            .map((p) => (
                              <ColorTag key={p.proId} color={p.color} />
                            ))}
                          <div>
                            <p className="text-xs text-gray-600 leading-base font-bold">
                              {appointment.title}
                            </p>
                            {appointments
                              .filter((pro) =>
                                pro.tasks.map((t) => t.taskId).includes(appointment.taskId),
                              )
                              .map((p) => (
                                <p key={p.proId} className="text-xs leading-base text-gray-600">
                                  {p.profile.firstName} {p.profile.lastName}
                                </p>
                              ))}
                            <p className="text-xs text-gray-600 leading-base font-bold mt-2">
                              {content.page[CALENDAR].details_popup.text_2}:{' '}
                              <span className="font-normal">
                                {appointment.firstName} {appointment.lastName}
                              </span>{' '}
                            </p>
                            <p className="text-xs text-gray-600 leading-base font-bold">
                              {content.page[CALENDAR].details_popup.text_3}:{' '}
                              <span className="font-normal" />{' '}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-300 text-sm italic mt-5">
                    Aucun évènnement à prévoir pour cette date
                  </p>
                )}
              </div>
            </div>
          </div>
          {clikedEvent !== undefined ? (
            <Modal
              modalClose={() => setModalVisibility(!modalVisibility)}
              modalOpen={modalVisibility}
              width="w-full xl:w-1/3"
            >
              <div className="bg-gray-100">
                <div className="popup-header font-bold pt-5 pb-5 pl-8 pr-8 text-white bg-primary-dark">
                  {content.page[CALENDAR].details_popup.main_title}
                </div>
                <div className="p-10 text-primary-dark rounded">
                  <p className="text-primary-dark font-bold">{clikedEvent.title}</p>
                  <div className="tofrom-info text-gray-400 bg-white flex items-center mb-5 py-2 px-5 rounded mt-4">
                    <CalendarIcon fillColour="gray-600" size={24} />
                    <p className="ml-4">{moment(clikedEvent.start).format('ddd DD-MM-YYYY')}</p>
                    <span className="px-2">/</span>
                    <p> {moment(clikedEvent.start).utc().format('LT')}</p>
                  </div>
                  <p className="flex text-primary-dark mb-4">
                    <span className="font-bold w-1/3">
                      {content.page[CALENDAR].details_popup.text_2}
                    </span>
                    <span className="w-2/3">
                      {clikedEvent.firstName} {clikedEvent.lastName}
                    </span>
                  </p>
                  <p className="flex text-primary-dark mb-4">
                    <span className="font-bold w-1/3">
                      {content.page[CALENDAR].details_popup.text_3}
                    </span>
                    <span className="w-2/3">{clikedEvent.phone}</span>
                  </p>
                  <p className="flex text-primary-dark mb-4">
                    <span className="font-bold w-1/3">
                      {content.page[CALENDAR].details_popup.text_4}
                    </span>
                    <span className="w-2/3">
                      {clikedEvent.law} {clikedEvent.sector}
                    </span>
                  </p>
                  <p className="flex text-primary-dark mb-4">
                    <span className="font-bold w-1/3">
                      {content.page[CALENDAR].details_popup.text_5}
                    </span>
                    <span className="w-2/3">{clikedEvent.title}</span>
                  </p>
                  <p className="flex text-primary-dark mb-4">
                    <span className="font-bold w-1/3">Explanation</span>
                    <span className="w-2/3">{clikedEvent.description}</span>
                  </p>
                  <p className="flex text-primary-dark mb-4">
                    <span className="font-bold w-1/3">
                      {content.page[CALENDAR].details_popup.text_6}
                    </span>
                    <span className="w-2/3">{clikedEvent.price}$</span>
                  </p>
                </div>
              </div>
            </Modal>
          ) : null}
        </AccountLayout>
        {isFirm && Screen !== 'desktop-xl' ? (
          <StyledFilterContainer
            className="xl:hidden flex content-start items-center"
            filterVisibility={filterVisibility}
          >
            <button
              className="absolute top-0 right-0 focus:outline-none m-3"
              title="close"
              onClick={() => SetFilterVisibility(!filterVisibility)}
            >
              <ClearIcon fillColour="primary-light" size={24} />
            </button>
            <div ref={filterDiv} className="w-full max-w-md px-4">
              <StyledCheckAll>
                <Checkbox
                  defaultChecked={DefaultChecked}
                  id="allMobile"
                  label="ALL"
                  name="check_all"
                  solid
                  onChange={(e) => handleListVisibilityAll(e)}
                />
              </StyledCheckAll>
              {appointments.map((pro) => (
                <StyledCheck key={pro.proId} color={pro.color ? pro.color : ''}>
                  <Checkbox
                    id={`${pro.proId}`}
                    label={`${pro.profile.firstName} ${pro.profile.lastName}`}
                    name="pro"
                    value={pro.proId}
                    defaultChecked
                    solid
                    onChange={() => handleListVisibilityChange(pro.proId)}
                  />
                </StyledCheck>
              ))}
            </div>
          </StyledFilterContainer>
        ) : null}
      </Layout>
    </Container>
  )
}

export default CalendarPage

const StyledFilterContainer = styled.div<{ filterVisibility: boolean }>`
  background-color: white;
  position: absolute;
  top: 0;
  height: 100vh;
  transition: transform 0.3s ease-in-out;
  transform: ${({ filterVisibility }) =>
    filterVisibility ? 'translateX(0)' : 'translateX(-100%)'};
  width: 90vw;
  z-index: 50;
  @media (min-width: 748px) {
    width: 60vw;
  }

  .check-all {
    background-color: unset;
    label {
      color: #454545 !important;
    }
  }
`

const StyledCalendar = styled.div`
  .rbc-toolbar {
    @media (max-width: 767px) {
      flex-direction: column;
      span {
        margin-bottom: 20px;
      }
    }
    .rbc-toolbar-label {
      font-size: 18px;
      color: #454545;
      font-weight: 500;
    }

    .rbc-btn-group {
      border-color: #dddddd;
      button {
        border: 1px solid #dddddd;
        color: #888888;
        font-size: 12px;

        &:focus {
          outline: none;
        }

        &.rbc-active {
          background-color: unset;
          box-shadow: unset;
          color: var(--color-primary);
        }
      }
    }
  }
  .rbc-header {
    text-transform: uppercase;
    color: #888888;
    font-weight: 700;
    font-size: 11px;
    padding: 16px 0;
  }
  .rbc-header + .rbc-header {
    border-left: 0;
  }

  .rbc-today {
    background-color: var(--color-primary-light);
  }
  .rbc-time-view {
    .rbc-event {
      border: 0;
    }
    .rbc-time-slot {
      color: #454545;
      font-size: 12px;
      border-top: 0;
    }

    .rbc-current-time-indicator {
      background-color: var(--color-primary);
      width: 100%;
      transform: translateX(-50%);
      right: unset;
      left: 50%;
      &:before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 100px;
        background-color: var(--color-primary);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .rbc-month-view {
    .rbc-month-row {
      .rbc-off-range-bg {
        background-color: unset;
      }
      .rbc-row {
        .rbc-date-cell {
          font-size: 14px;
          padding-right: 15px;
          padding-top: 10px;
          color: #454545;
        }

        .rbc-show-more {
          font-weight: 500;
          color: #777777;
        }

        .rbc-off-range {
          color: #bbbbbb;
        }
      }
    }
  }
`
const StyledCheckAll = styled.div.attrs(() => ({
  className: 'bg-gray-300 p-3 pl-4 mb-1 check-all',
}))`
  .input-group {
    margin-top: 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    label {
      color: white;
      font-weight: 700;
      text-transform: uppercase;
    }
    input {
      margin-right: 0;
    }
  }
`

const StyledCheck = styled.div.attrs(() => ({
  className: 'text-xs bg-white p-3 pl-4 mb-1',
}))<{ color?: string }>`
position: relative;
  .input-group {
    margin-top: 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    &:before {
      content:"";
      width 8px;
      height: 100%;
      position: absolute;
      top:0;
      left:0;
      background-color: ${(props) => (props.color ? props.color : 'unset')};
    }
    label {
      color: #888888;
      font-weight: 500;
    }
    input {
      margin-right: 0;
    }
  }
`

const StyledDayPickerCalendar = styled.div`
text-align:center;
margin-top: 1em;
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
  margin: 1em;
}
.DayPicker-Months {
  background-color: white;
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
  &:focus {
    outline: none;
  }
}

.DayPicker-Day--app:not(.DayPicker-Day--outside) {
  background-color: var(--color-primary-light);
  border-radius: 100%;
  color: var(--color-primary);
  font-weight: 700;
}
.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
  background-color: var(--color-primary);
  border-radius: 100%;
  color: white;
  font-weight: 700;
}
 
}
`

const ColorTag = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  margin-right: 16px;
`
