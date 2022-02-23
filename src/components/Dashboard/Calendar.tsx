import React, { useState } from 'react'
import DayPicker from 'react-day-picker'
import styled from 'styled-components'

import UserPic from '../../assets/img/owl-goodowl-mobile.jpg'

import 'react-day-picker/lib/style.css'

type CalendarTypes = {
  title: string
  calendar: any
}

export const Calendar: React.FC<CalendarTypes> = ({ title = 'Calendar', calendar }) => {
  const [EmployeesEventsVisibility, setEmployeesEventVisibility] = useState<string[]>([])
  //const [Appointments, setAppointments] = useState([] as any)

  console.log('EMPLOYEE VISIBILITY', EmployeesEventsVisibility)
  console.log('DATA', calendar)

  React.useEffect(() => {
    if (calendar && calendar !== undefined) {
      setEmployeesEventVisibility(calendar.map((pro) => pro.proId))
    }
  }, [calendar])
  let Appointments = [] as any

  const getProId = (id) => {
    const pro = calendar
      ?.filter((prof) => prof.tasks.map((t) => t.taskId).includes(id))
      .map((p) => ({
        proId: p.proId,
        photo: p.photo ? p.photo : UserPic,
        profile: { firstname: p.profile.firstName, lastName: p.profile.lastName },
      }))

    return pro[0]
  }

  // Reduce appointments array to have all app / tasks on same level
  if (calendar?.length !== 0) {
    Appointments = calendar
      ?.map((pro) => pro.tasks)
      .reduce((prev, current) => [...prev, ...current])
      .map((e) => ({
        ...getProId(e.taskId),
        taskId: e.taskId,
        name: e.name,
        date: new Date(e.appointDate),
        firstName: e.userFirstName,
        lastName: e.userLastName,
        law: e.law,
        sector: e.sector,
      }))
  }

  const handleChange = (e) => {
    const checkedEmployee = e.target.value

    if (EmployeesEventsVisibility.includes(checkedEmployee)) {
      const currentEmployeesEventsVisibility = [...EmployeesEventsVisibility]
      const index = currentEmployeesEventsVisibility.indexOf(checkedEmployee)
      setEmployeesEventVisibility(
        currentEmployeesEventsVisibility
          .slice(0, index)
          .concat(
            currentEmployeesEventsVisibility.slice(
              index + 1,
              currentEmployeesEventsVisibility.length,
            ),
          ),
      )
    } else {
      setEmployeesEventVisibility(EmployeesEventsVisibility.concat(checkedEmployee))
    }
  }

  const EventFiltered = Appointments?.filter(
    (item) => EmployeesEventsVisibility?.indexOf(item.proId) !== -1,
  )

  const modifiers = EventFiltered?.map((event) => event.date)

  function renderDay(day: Date) {
    const dates = day.toLocaleDateString()
    const eventDisplay = EventFiltered?.filter((item) => item.date.toLocaleDateString() === dates)
    const eventsCount = eventDisplay?.length

    return (
      <StyledDay>
        <div className={`group ${eventsCount > 0 ? 'event' : null}`}>
          <div
            className={`day-date relative ${
              eventsCount > 0 ? 'single-event' : eventsCount > 1 ? 'multiple-event' : null
            }`}
          >
            <span>{day.getDate()}</span>

            {eventsCount > 1 ? (
              <span className="count absolute  bg-primary border border-white rounded-full text-white text-xxs">
                {eventsCount}
              </span>
            ) : null}
          </div>

          {eventsCount > 0 ? (
            <div className="absolute flex bg-gray-200 p-2 tooltip rounded">
              {eventDisplay.map((event) => (
                <div
                  key={event.taskId}
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '1.5rem',
                    border: '1px #ffffff solid',
                    backgroundImage: `url(${event.photo})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                    margin: '0.25rem',
                  }}
                  title={`${event.name} ${event.firstName} ${event.lastName}`}
                />
                // <ImageWrapperTooltip
                //   key={event.taskId}
                //   className="overflow-hidden m-1 border border-white"
                // >
                //   <img
                //     alt={`${event.profile.firstName} ${event.profile.lastName}`}
                //     src={event.photo}
                //     title={`${event.name} ${event.firstName} ${event.lastName}`}
                //   />
                // </ImageWrapperTooltip>
              ))}
            </div>
          ) : null}
        </div>
      </StyledDay>
    )
  }

  return (
    <div className="bg-white py-4 px-5 module h-full">
      <p className="text-primary font-medium text-md">{title}</p>
      <StyledCalendar>
        <DayPicker className="Events" modifiers={{ event: modifiers }} renderDay={renderDay} />
      </StyledCalendar>
      <div className="flex border-t border-gray-150 pt-5 flex-wrap">
        {calendar?.map((pro) => (
          <div key={pro.proId} className="flex flex-col items-center">
            <label htmlFor={pro.proId}>
              <ImageWrapper className="overflow-hidden m-2">
                <img
                  alt={`${pro.profile.firstName} ${pro.profile.lastName}`}
                  src={pro?.photo ? pro.photo : UserPic}
                  title={`${pro.profile.firstName} ${pro.profile.lastName}`}
                />
              </ImageWrapper>
            </label>
            <input
              checked={EmployeesEventsVisibility.includes(pro.proId)}
              id={pro.proId}
              name={pro.proId}
              type="checkbox"
              value={pro.proId}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const StyledCalendar = styled.div`
text-align:center;
margin-top: 1em;
.DayPicker {
  @media(max-width: 1690px) and (min-width: 1024px ){
    font-size: 0.85rem;
  }
}
.DayPicker-NavBar {
  display: flex;
  justify-content: space-between;
  padding: 30px 5px 20px 5px;
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
  margin: 1em 0;
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
    .tooltip {
      visibility: visible;
    }
  }
}

.DayPicker-Day--event:not(.DayPicker-Day--outside) {
  background-color: var(--color-primary-light);
  border-radius: 100%;
  color: var(--color-primary);
  font-weight: 700;
  .day-date{
    color: var(--color-primary);

  }
}
.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
  background-color: var(--color-primary);
  border-radius: 100%;
  color: white;
  font-weight: 700;
}
 
}
`
const StyledDay = styled.div`
  position: relative;
  .event {
    .day-date {
      color: var(--color-primary);
      .count {
        top: -10px;
        width: 18px;
        height: 18px;
        line-height: 15px;
      }
    }
  }

  .tooltip {
    visibility: hidden;
    top: -65px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    box-shadow: 0px 2px 10px #00000027;
    &:after {
      content: '';
      height: 10px;
      width: 10px;
      background-color: #dddddd;
      position: absolute;
      left: 50%;
      bottom: -10px;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  .day-date {
    color: #888888;
    padding: 1px;
  }
`

const ImageWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  position: relative;
  img {
    height: 2rem;
    width: auto;
    max-width: unset;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`
