import React from 'react'
// import DayPicker from 'react-day-picker'
import styled from 'styled-components'
import 'react-day-picker/lib/style.css'
import { FieldArray } from 'formik'
import { toast } from 'react-toastify'
import moment from 'moment'

// Store
import { useStore, getState } from '../../../store/models'
// Utils
import Utils from '../../../utils'
// Components
import { SelectMultiComponent } from '../../../components/shared/forms/FormElements/SelectMulti'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CalendarIcon, Edit, Bin, CheckboxIcon } from '../../../components/shared/Icons'
import { Toggle } from '../../../components/shared/forms/FormElements/Toggle'
import { Button } from '../../../components/shared/Button'
import { SelectComponent } from '../../../components/shared/forms/FormElements/Select'

export const WorkingHours: React.FC<any> = (props) => {
  const { pageContent, values, setFieldValue } = props

  const [globalState] = useStore('Global')
  const [userState] = useStore('User')
  const [, availabilitiesActions] = useStore('Availability')

  const { proId } = userState
  const { userId } = userState

  const today = new Date()

  const AvailabilityInDb = (availId) => {
    const tempAvailId = !availId.includes('TEMP')

    return tempAvailId
  }

  //start date and expiry date not in us
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const [CalendarVisibility, setCalendarVisibility] = useState<number>(0)
  // const handleClick = (e: MouseEvent) => {
  //   if ((fromEl.current as any).contains(e.target)) {
  //     // inside click
  //     return
  //   }

  //   // outside click
  //   if ((toEl.current as any).contains(e.target)) {
  //     // inside click
  //     return
  //   }
  //   // outside click
  //   setCalendarVisibility(0)
  // }
  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClick)

  //   return () => {
  //     document.removeEventListener('mousedown', handleClick)
  //   }
  // }, [])

  const handleRemoveAvailability = async (availId: string) => {
    await availabilitiesActions.RemoveAvailability({
      availId,
    })

    const { errors } = getState('Availability')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Availability removed succesfully')
    }
  }

  const handleUpdateAvailability = async (
    availId: string,
    days: any,
    startTime: string,
    endTime: string,
    status: number,
  ) => {
    console.log('TIME', startTime)
    await availabilitiesActions.UpdateAvailability({
      proId,
      availId,
      availabilityInput: {
        weekdays: days.map((day) => ({ dayId: day.value })),
        startTime,
        endTime,
        startDate: moment.utc(today).format(),
        status,
        modBy: userId,
      },
    })

    const { errors } = getState('Availability')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Availability Updated !')
    }
  }

  const handleCreateAvailability = async (
    days: any,
    startTime: string,
    endTime: string,
    status: number,
  ) => {
    await availabilitiesActions.CreateAvailability({
      proId,
      availabilityInput: {
        weekdays: days.map((day) => ({ dayId: day.value })),
        startTime,
        endTime,
        startDate: moment.utc(today).format(),
        status,
        modBy: userId,
      },
    })
    const { errors } = getState('Availability')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Availability Created !')
    }
  }

  const handleUpdateAvailabilityStatus = async (availId: string, status: number) => {
    await availabilitiesActions.UpdateAvailabilityStatus({
      availId,
      status,
    })
    const { errors } = getState('Availability')

    if (errors.length > 0) {
      toast.error(errors[0].message)
    } else {
      toast.success('Availability Updated !')
    }
  }

  return (
    <FieldArray
      name="availabilities"
      render={(arrayHelpers) => (
        <>
          <div className="flex justify-between items-center bg-primary md:bg-transparent p-4 md:p-0">
            <p className="text-md text-white md:text-primary-dark font-bold">
              {pageContent?.avail_edit.title}
            </p>
            <Button
              className="bg-white md:bg-primary text-primary md:text-white btn-xs md:btn-sm"
              label={pageContent?.availabilities.btn_text}
              onClick={() => {
                arrayHelpers.push({
                  availId: `TEMP-${Math.floor(Math.random() * 1000)}`,
                  weekdays: '',
                  startTime: '',
                  endTime: '',
                  status: 0,
                  modify: true,
                })
              }}
            />
          </div>
          <div className="md:border md:border-b-0 border-gray-200 mt-4">
            <div className="hidden md:flex justify-between items-center py-4 px-5 bg-gray-150 border-b border-gray-200 uppercase text-primary-dark text-sm font-bold">
              <div className="w-2/6 px-2">{pageContent?.avail_edit.text_1}</div>
              <div className="w-1/6 px-2">{pageContent?.avail_edit.text_2}</div>
              <div className="w-1/6 px-2">{pageContent?.avail_edit.text_3}</div>
              {/* <div className="w-1/6 px-2 hidden">START</div>
                <div className="w-1/6 px-2 hidden">EXPIRY</div> */}
              <div className="w-1/6 px-2">ACTION</div>
            </div>
            {values['availabilities'].map((value, index) => (
              <div
                key={value.availId}
                className="border-b border-gray-200 flex flex-wrap md:flex-nowrap justify-between py-4 px-4 md:px-5"
              >
                <div className="w-full md:w-2/6 px-2">
                  {!value.modify ? (
                    <div className="text-primary-dark font-medium">
                      {value.weekdays.map((day, index) => (
                        <span key={day.label}>
                          {index > 0 ? ', ' : null}
                          {day.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <SelectMultiComponent
                      options={Utils.Form.dropdownMapper(
                        { value: 'dayId', label: 'texts.name' },
                        globalState.weekdays,
                      )}
                      placeholder="Select Days"
                      value={value.weekdays}
                      outline
                      onChange={(e) => setFieldValue(`availabilities[${index}].weekdays`, e)}
                    />
                  )}
                </div>
                <div className="w-1/2 md:w-1/6 px-2 mt-4 md:mt-0">
                  {!value.modify ? (
                    <div className="text-primary-dark font-medium">{value.startTime}</div>
                  ) : (
                    <>
                      {/* <InputComponent
                      label="Hour"
                      name="startTime"
                      placeholder="Hour"
                      type="time"
                      value={value.startTime}
                      light
                      onChange={(e) =>
                        setFieldValue(`availabilities[${index}].startTime`, e.currentTarget.value)
                      }
                    /> */}
                      <SelectComponent
                        name="startTime"
                        options={Utils.Form.timeDropdownMapper()}
                        placeholder="Hour"
                        value={Utils.Form.timeDropdownMapper().find(
                          (option) => option.value === value.startTime,
                        )}
                        outline
                        onChange={(e) =>
                          setFieldValue(`availabilities[${index}].startTime`, e.value)
                        }
                      />
                    </>
                  )}
                </div>
                <div className="w-1/2 md:w-1/6 px-2 mt-4 md:mt-0">
                  {!value.modify ? (
                    <div className="text-primary-dark font-medium">{value.endTime}</div>
                  ) : (
                    <>
                      {/* <InputComponent
                      label="Hour"
                      name="endTime"
                      placeholder="Hour"
                      type="time"
                      value={value.endTime}
                      light
                      onChange={(e) =>
                        setFieldValue(`availabilities[${index}].endTime`, e.currentTarget.value)
                      }
                    /> */}
                      <SelectComponent
                        name="endTime"
                        options={Utils.Form.timeDropdownMapper()}
                        placeholder="Hour"
                        value={Utils.Form.timeDropdownMapper().find(
                          (option) => option.value === value.endTime,
                        )}
                        outline
                        onChange={(e) => setFieldValue(`availabilities[${index}].endTime`, e.value)}
                      />
                    </>
                  )}
                </div>

                {/* start date and expiry date not in use*/}
                {/* <div ref={fromEl} className="relative w-1/6 px-2 hidden">
                      {Boolean(value.status) ? (
                        <div className="text-primary-dark font-medium">{fromDay ? fromDay : 'select a day'}</div>
                      ) : (
                        <>
                          <div className="btn btn-xs cursor-pointer" onClick={() => setCalendarVisibility(1)}>
                            <CalendarIcon fillColour="gray-500" size={24} />
                          </div>
                          <div
                            className={`calendar absolute bg-white ${
                              CalendarVisibility === 1 ? 'block' : 'hidden'
                            }`}
                          >
                            <StyledInputs>
                              <DayPicker selectedDays={new Date(fromDay)} onDayClick={onChangeStartDate} />
                            </StyledInputs>
                          </div>
                        </>
                      )}
                    </div>
                    <div ref={toEl} className="relative w-1/6 px-2 hidden">
                      {Boolean(value.status) ? (
                        <div className="text-primary-dark font-medium">{toDay ? toDay : 'select a day'}</div>
                      ) : (
                        <>
                          <div className="btn btn-xs cursor-pointer" onClick={() => setCalendarVisibility(2)}>
                            <CalendarIcon fillColour="gray-500" size={24} />
                          </div>
                          <div
                            className={`calendar absolute bg-white ${
                              CalendarVisibility === 2 ? 'block' : 'hidden'
                            }`}
                          >
                            <StyledInputs>
                              <DayPicker selectedDays={new Date(toDay)} onDayClick={onChangeExpiryDate} />
                            </StyledInputs>
                          </div>
                        </>
                      )}
                    </div> */}
                <ActionsRow className="flex flex-nowrap md:flex-wrap xl:flex-nowrap items-center w-1/6 px-2 mt-4 md:mt-0">
                  {!value.modify ? (
                    <button
                      className="btn btn-xs p-1 mx-1 bg-gray-500 flex-shrink-0"
                      title={pageContent?.texts.action_infobox_1?.edit_text}
                      onClick={() => setFieldValue(`availabilities[${index}].modify`, true)}
                    >
                      <Edit fillColour="white" size={24} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-xs p-1 mx-1 bg-primary"
                      disabled={
                        value.weekdays.length > 0 && value.startTime !== '' && value.endTime !== ''
                          ? false
                          : true
                      }
                      title="Save"
                      onClick={() => {
                        setFieldValue(`availabilities[${index}].modify`, !value.modify)

                        if (AvailabilityInDb(value.availId)) {
                          handleUpdateAvailability(
                            value.availId,
                            value.weekdays,
                            value.startTime,
                            value.endTime,
                            value.status,
                          )
                        } else {
                          handleCreateAvailability(
                            value.weekdays,
                            value.startTime,
                            value.endTime,
                            value.status,
                          )
                        }
                      }}
                    >
                      <CheckboxIcon fillColour="white" size={24} />
                    </button>
                  )}
                  <button
                    className="btn btn-xs p-1 mx-1 bg-primary-dark flex-shrink-0"
                    title={pageContent?.texts.action_infobox_1?.delete_text}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()

                      arrayHelpers.remove(index)

                      if (AvailabilityInDb(value.availId)) {
                        handleRemoveAvailability(value.availId)
                      }
                    }}
                  >
                    <Bin fillColour="white" size={24} />
                  </button>
                  <Toggle
                    checked={Boolean(value.status)}
                    id={`toggle-${value.availId}`}
                    toggle={() => {
                      if (AvailabilityInDb(value.availId)) {
                        handleUpdateAvailabilityStatus(value.availId, Number(!value.status))
                        setFieldValue(`availabilities[${index}].status`, Number(!value.status))
                      } else {
                        toast.error('Save Availability first')
                      }
                    }}
                  />
                </ActionsRow>
              </div>
            ))}
          </div>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledInputs = styled.div`
  .DayPicker {
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
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
      background-color: var(--color-primary-light);
      color: var(--color-primary);
      font-weight: 600;
    }
  }
`
