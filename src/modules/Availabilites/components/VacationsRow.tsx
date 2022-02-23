import React from 'react'
import styled from 'styled-components'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { FieldArray } from 'formik'
import { toast } from 'react-toastify'
import moment from 'moment'

import 'react-day-picker/lib/style.css'

// Store
import { useStore, getState } from '../../../store/models'
import { Bin } from '../../../components/shared/Icons'
import { Toggle } from '../../../components/shared/forms/FormElements/Toggle'
import { Button } from '../../../components/shared/Button'

type WorkingHours = {
  fromDay: string
  toDay: string
  activated: boolean
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void
  VacationsActivation?: React.ChangeEventHandler<HTMLInputElement>
  onChangeFromDate?: (day: Date) => void
  onChangeToDate?: (day: Date) => void
}

export const VacationsRow: React.FC<any> = (props) => {
  const { pageContent, values, setFieldValue } = props

  const [userState] = useStore('User')
  const [, availabilitiesActions] = useStore('Availability')

  const { proId } = userState
  const { userId } = userState

  // FOR ALL DAY PICKERS
  // const [from, setFrom] = useState<any>(fromDay ? new Date(fromDay) : null)
  // let [to, setTo] = useState<any>(toDay ? new Date(toDay) : null)
  // const showFromMonth = (to: any, from: any) => {
  //   if (!from) {
  //     return
  //   }
  // }

  // const handleToChange = (to: any) => {
  //   setTo(to)
  //   setFrom(from)
  //   showFromMonth(to, from)
  //   onChangeFromDate(from)
  //   onChangeToDate(to)
  // }

  const DaysOffInDb = (dayOffId) => {
    const tempdayOffId = !dayOffId.includes('TEMP')

    return tempdayOffId
  }

  const handleRemoveDaysOff = async (dayOffId: string) => {
    await availabilitiesActions.RemoveDaysOff({
      dayOffId,
    })

    const { errors } = getState('Availability')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Vacations removed succesfully')
    }
  }

  const handleCreateDaysOff = async (startDate: string, endDate: string) => {
    await availabilitiesActions.CreateDaysOff({
      proId,
      dayOffInput: {
        startDate: moment.utc(startDate).format(),
        endDate: moment.utc(endDate).format(),
        status: 1,
        modBy: userId,
      },
    })

    const { errors } = getState('Availability')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Vacations created succesfully')
    }
  }

  const handleUpdateDaysOff = async (dayOffId: string, startDate: string, endDate: string) => {
    await availabilitiesActions.UpdateDaysOff({
      proId,
      dayOffId,
      dayOffInput: {
        startDate: moment.utc(startDate).format(),
        endDate: moment.utc(endDate).format(),
        status: 1,
        modBy: userId,
      },
    })

    const { errors } = getState('Availability')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Vacations updated succesfully')
    }
  }

  return (
    <FieldArray
      name="daysOff"
      render={(arrayHelpers) => (
        <>
          <div className="flex justify-between items-center mb-4 bg-primary-dark md:bg-transparent p-4 md:p-0">
            <p className="text-md text-white md:text-primary-dark font-bold">
              {' '}
              {pageContent?.days_off.title}
            </p>
            <Button
              className="bg-white md:bg-primary text-primary-dark md:text-white btn-xs md:btn-sm"
              label="Add vacations"
              onClick={() => {
                arrayHelpers.push({
                  dayOffId: `TEMP-${Math.floor(Math.random() * 1000)}`,
                  startDate: new Date(),
                  endDate: new Date(),
                  status: 1,
                })
              }}
            />
          </div>
          {values['daysOff'].map((value, index) => (
            <div
              key={value.dayOffId}
              className="flex flex-wrap items-center justify-between mt-2 p-4 md:p-0"
            >
              <StyledInputs className="InputFromTo w-full md:w-auto flex">
                <div className="InputFromTo-from w-1/2 md:w-auto">
                  <DayPickerInput
                    dayPickerProps={{
                      // selectedDays: [from, { from, to }],
                      // disabledDays: { after: to },
                      // toMonth: to,
                      numberOfMonths: 1,
                      // onDayClick: () => to.getInput().focus(),
                    }}
                    format="LL"
                    inputProps={{ name: 'startDate' }}
                    placeholder="From"
                    value={moment(value.startDate).format('L')}
                    onDayChange={(e) => {
                      setFieldValue(`daysOff[${index}].startDate`, e)

                      if (DaysOffInDb(value.dayOffId)) {
                        handleUpdateDaysOff(value.dayOffId, e.toString(), value.endDate)
                      }
                    }}
                  />
                </div>
                <div className="InputFromTo-to w-1/2 md:w-auto">
                  <DayPickerInput
                    // ref={(el) => (to = el)}
                    dayPickerProps={{
                      // selectedDays: [from, { from, to }],
                      // disabledDays: { before: from },
                      // modifiers,
                      // month: from,
                      // fromMonth: from,
                      numberOfMonths: 1,
                    }}
                    format="LL"
                    inputProps={{ name: 'endDate' }}
                    placeholder="To"
                    value={moment(value.endDate).format('L')}
                    onDayChange={(e) => {
                      setFieldValue(`daysOff[${index}].endDate`, e)

                      if (DaysOffInDb(value.dayOffId)) {
                        handleUpdateDaysOff(value.dayOffId, value.startDate, e.toString())
                      }
                    }}
                  />
                </div>
              </StyledInputs>

              <ActionsRow className="flex items-center px-2 mt-4 md:mt-0">
                <button
                  className="btn btn-xs p-1 mx-1 bg-primary-dark"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    arrayHelpers.remove(index)

                    if (DaysOffInDb(value.dayOffId)) {
                      handleRemoveDaysOff(value.dayOffId)
                    }
                  }}
                >
                  <Bin fillColour="white" size={24} />
                </button>
                {!DaysOffInDb(value.dayOffId) ? (
                  <Toggle
                    toggle={() => {
                      handleCreateDaysOff(value.startDate, value.endDate)
                    }}
                  />
                ) : null}
              </ActionsRow>
            </div>
          ))}
        </>
      )}
    />
  )
}

const ActionsRow = styled.div`
  button {
    margin-top: 0;
  }
`

const StyledInputs = styled.div`
  margin: 0 -0.625rem;
  .DayPickerInput {
    input {
      border: 1px solid #dddddd;
      padding: 0.55rem 0.6875rem;
      line-height: 1.125rem;
      border-radius: 4px;
      font-weight: 600;
      line-height: 1.125rem;
      font-size: 0.875rem;
      color: var(--color-primary-dark);
      max-width: 100%;
      &::placeholder {
        color: #777777;
      }
      &:focus {
        outline-color: var(--color-primary-light);
      }
    }
  }

  .InputFromTo-from {
    padding: 0 0.625rem;
    .DayPickerInput {
      max-width: 100%;
    }
  }
  .InputFromTo-to {
    padding: 0 0.625rem;
    .DayPickerInput {
      max-width: 100%;
    }
  }

  .DayPicker {
    width: 100%;
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

    .DayPicker-Day--selected {
      background-color: var(--color-primary-dark);
      color: white;
      font-weight: 600;
    }
  }
`
