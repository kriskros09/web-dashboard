import React, { useState } from 'react'
import DayPicker from 'react-day-picker'
import styled from 'styled-components'
import MomentLocaleUtils from 'react-day-picker/moment'

// Store
import { useStore } from '../../store/models'
import 'react-day-picker/lib/style.css'

type CalendarTypes = {
  title: string
  tasks: any
}

export const CalendarPro: React.FC<CalendarTypes> = ({ title = 'Calendar', tasks }) => {
  const [localeState] = useStore('Locale')
  const [Appointments, setAppointments] = useState([] as any)

  React.useEffect(() => {
    if (tasks && tasks.length !== 0) {
      setAppointments(tasks)
    }
  }, [tasks])

  const modifiers = Appointments.map((event) => new Date(event.appointDate))

  function renderDay(day: Date) {
    const dates = day.toLocaleDateString()
    const eventDisplay = Appointments.filter((item) => item.appointDate === dates)
    const eventsCount = eventDisplay.length

    return (
      <StyledDay>
        <div className={`relative group ${eventsCount > 0 ? 'event' : null}`}>
          <div
            className={`day-date relative ${
              eventsCount > 0 ? 'single-event' : eventsCount > 1 ? 'multiple-event' : null
            }`}
          >
            <span>{day.getDate()}</span>

            {eventsCount > 1 ? (
              <span className="count absolute bg-primary border border-white rounded-full text-white text-xxs">
                {eventsCount}
              </span>
            ) : null}
          </div>

          {eventsCount > 0 ? (
            <div className="absolute flex bg-gray-200 p-2 tooltip rounded">
              {eventDisplay.map((event, i) => (
                <div
                  key={i}
                  className="w-6 h-auto rounded-full overflow-hidden m-1 border border-white"
                >
                  <img alt={event.name} className="w-full" src={event.image} title={event.name} />
                </div>
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
        <DayPicker
          className="Events"
          locale={localeState.language}
          localeUtils={MomentLocaleUtils}
          modifiers={{ event: modifiers }}
          renderDay={renderDay}
        />
      </StyledCalendar>
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
    opacity: 0;
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
