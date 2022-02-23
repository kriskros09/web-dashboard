import React, { FC, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'

// Store
import { useStore } from '../../../store/models'
import { ArrowRight } from '../Icons'

const durations = [
  { servId: 'SV0000000001', duration: 1 },
  { servId: 'SV0000000002', duration: 0.5 },
  { servId: 'SV0000000003', duration: 1 },
  { servId: 'SV0000000004', duration: 0.5 },
]

export const Calendar: FC<{
  label?: string
  text?: string
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}> = ({ label = 'Choose your day and time', text = '', onClick }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchState, searchActions] = useStore('Search')

  const SelectedServiceDuration = durations
    .filter((duration) => duration.servId === searchState.currentServId)
    .map((d) => d.duration)

  React.useEffect(() => {
    if (searchState.professionalTile.proId) {
      searchActions.availabilities({
        langId: localeState.language,
        proId: searchState.professionalTile.proId,
      })
    }
  }, [localeState.language, searchState.professionalTile.proId])

  const DatesView = [...searchState.tileAvailabilities]
  const AvailableDatesView = DatesView.filter((date) => date.available === 1)

  const TimetableLength = AvailableDatesView.length

  const [IncrementCounterSup, setIncrementCounterSup] = useState<number>(0)
  const [IncrementCounterInf, setIncrementCounterInf] = useState<number>(2)

  const handleTimetableNextView = () => {
    setIncrementCounterSup(IncrementCounterSup + 3)
    setIncrementCounterInf(IncrementCounterInf + 3)
  }

  const handleTimetablePreviousView = () => {
    setIncrementCounterSup(IncrementCounterSup - 3)
    setIncrementCounterInf(IncrementCounterInf - 3)
  }

  return (
    <div className="calendar mb-6">
      <h5 className="text-white font-bold text-sm mb-5">{label}</h5>
      <div>
        <div className="w-full relative">
          {AvailableDatesView.length === 0 ? (
            <div className="text-sm font-semibold leading-small text-error">
              Aucune Disponibilité pour cette selection
            </div>
          ) : (
            <>
              <button
                className="absolute transform rotate-180 top-0 focus:outline-none mt-1 -ml-6"
                disabled={IncrementCounterSup === 0 ? true : false}
                onClick={() => handleTimetablePreviousView()}
              >
                <ArrowRight fillColour="white" size={24} />
              </button>
              <CalendarContainer>
                <div className="justify-start -mx-3 flex">
                  {AvailableDatesView.map((i, index) => (
                    <div
                      key={i.date}
                      className={`w-1/3 text-center flex-col justify-start px-3 ${
                        index <= IncrementCounterInf && index >= IncrementCounterSup
                          ? 'flex'
                          : 'hidden'
                      }`}
                    >
                      <p className="leading-small flex flex-col mb-3">
                        <span className="text-white uppercase text-sm font-semibold inline-block leading-small">
                          {i.short}
                        </span>

                        <span className="text-gray-600 uppercase text-sm font-semibold inline-block whitespace-no-wrap">
                          {moment(i.date).format('DD MMM')}
                        </span>
                      </p>
                      <div>
                        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                        {i.hours.map((hour, index) => (
                          <div key={hour.time} className="mb-2">
                            <StyledInput
                              disabled={
                                hour.available === 0 ||
                                (SelectedServiceDuration[0] === 1 &&
                                  i.hours[index + 1] &&
                                  i.hours[index + 1]?.available === 0)
                                  ? true
                                  : false
                              }
                              id={`${i.date}-${hour.time}`}
                              name="time"
                              type="radio"
                              value={`${i.date}T${hour.time}`}
                              onClick={onClick}
                            />
                            <label htmlFor={`${i.date}-${hour.time}`}>{hour.time}</label>
                          </div>
                        ))}
                        {/* {handleTimetable(parseInt(i.endTime), parseInt(i.startTime)).map((h) => (
                      <div key={h} className="mb-2">
                        <StyledInput
                          id={`${i.date}-${h}`}
                          name="time"
                          type="radio"
                          value={`${moment(i.date).format('DD-MMM-YYYY')}T${moment(
                            h.toString(),
                            'h',
                          ).format('HH:mm')}`}
                        />
                        <label htmlFor={`${i.date}-${h}`}>
                          {moment(h.toString(), 'h').format('HH:mm')}
                        </label>
                      </div>
                    ))} */}
                      </div>
                    </div>
                  ))}
                </div>
              </CalendarContainer>
              <button
                className="absolute top-0 right-0 focus:outline-none mt-1 -mr-6"
                disabled={IncrementCounterInf === TimetableLength ? true : false}
                onClick={() => handleTimetableNextView()}
              >
                <ArrowRight fillColour="white" size={24} />
              </button>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600 font-medium mt-5">{text}</p>
      </div>
    </div>
  )
}

const StyledInput = styled.input`
  appearance: none;
  position: absolute;

  &:checked {
    & + label {
      background-color: var(--color-primary-dark);
      color: white;
    }
  }
  &:disabled {
    & + label {
      opacity: 0.7;
    }
  }
  & + label {
    background-color: white;
    color: #777777;
    font-weigth: 600;
    font-size: 14px;
    padding: 7px 5px;
    display: block;
    border-radius: 4px;
    @media (min-width: 1440px) {
      padding: 15px 20px;
    }
  }
`

const CalendarContainer = styled.div`
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background-color: transparent; /* Optional: just make scrollbar invisible */
    scrollbar-width: none;
    display: none;
  }
`
