import React, { FC, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DayPicker, { DateUtils } from 'react-day-picker'
import styled from 'styled-components'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'moment/locale/en-ca'
import 'moment/locale/fr-ca'

// Store
import { useStore } from '../../../../store/models'

//Components
import { ClearIcon } from '../../Icons'

import { FilterType } from './filter'
import { FilterLabel } from './FilterLabel'
import { FilterButtons } from './FilterButtons'

export const DateControl: FC<FilterType> = ({
  label = 'filter name',
  light,
  content,
  getFilterData,
  resetFilter,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [localeState, localeActions] = useStore('Locale')
  const [from, setFrom] = useState<any>()
  let [to, setTo] = useState<any>()

  const [DateRange, setDateRange] = useState<any>({ from: undefined, to: undefined })

  const handleDayClick = (day) => {
    const Newrange = DateUtils.addDayToRange(day, DateRange)

    setFrom(Newrange.from)
    setTo(Newrange.to)
    setDateRange(Newrange)
  }

  const modifiers = { start: from, end: to }

  const showFromMonth = (to: any, from: any) => {
    if (!from) {
      return
    }
  }

  const handleToChange = (to: any) => {
    setTo(to)
    setFrom(from)
    showFromMonth(to, from)
    setDateRange({ from, to })
  }

  const Clear = () => {
    setDateRange({ from: undefined, to: undefined })
    setFrom(undefined)
    setTo(undefined)
  }

  return (
    <div>
      <FilterLabel label={label} light={light} />
      <StyledCalendar className="block lg:hidden" dark>
        <DayPicker
          className="Selectable"
          locale={localeState.language}
          localeUtils={MomentLocaleUtils}
          modifiers={modifiers}
          numberOfMonths={1}
          selectedDays={[from, DateRange]}
          onDayClick={(day) => handleDayClick(day)}
        />
      </StyledCalendar>
      <StyledInputs className="InputFromTo hidden lg:flex">
        <StyledCalendar className="InputFromTo-from" dark={false}>
          <DayPickerInput
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { after: to },
              toMonth: to,
              modifiers,
              numberOfMonths: 1,
              onDayClick: () => to.getInput().focus(),
              locale: localeState.language,
              localeUtils: MomentLocaleUtils,
            }}
            format="LL"
            inputProps={{ name: 'from' }}
            placeholder={content?.appointment_input_1}
            value={from}
            onDayChange={setFrom}
          />
        </StyledCalendar>
        <StyledCalendar className="InputFromTo-to" dark={false}>
          <DayPickerInput
            ref={(el) => (to = el)}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
              locale: localeState.language,
              localeUtils: MomentLocaleUtils,
            }}
            format="LL"
            inputProps={{ name: 'to' }}
            placeholder={content?.appointment_input_2}
            value={to}
            onDayChange={handleToChange}
          />
        </StyledCalendar>
      </StyledInputs>
      <button className="text-xs text-gray-400 flex items-center mt-2" onClick={() => Clear()}>
        <ClearIcon fillColour="gray-200" size={16} /> <span className="pl-1">clear</span>
      </button>

      <FilterButtons
        label={content}
        onCancel={(e) => resetFilter(e)}
        onSubmit={() => getFilterData(DateRange)}
      />
    </div>
  )
}

const StyledInputs = styled.div`
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
      &::placeholder {
        color: #777777;
      }
      &:focus {
        outline-color: var(--color-primary-light);
      }
    }
  }

  .InputFromTo-from {
    margin-right: 0.625rem;
  }
  .InputFromTo-to {
    margin-left: 0.625rem;
  }
`
const StyledCalendar = styled.div.attrs(() => ({}))<{ dark: boolean }>`
  .DayPicker {
    .DayPicker-NavBar {
      display: flex;
      justify-content: space-between;
      padding: 20px;
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
      background-color: ${(props) => (props.dark ? 'transparent' : 'white')};
    }
    .DayPicker-Caption {
      background-color: ${(props) => (props.dark ? 'transparent' : 'white')};
      color: ${(props) => (props.dark ? 'white' : '')};
      text-align: center;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .DayPicker-Weekday {
      color: #dddddd;
      font-size: 8px;
      line-height: 1;
      text-transform: uppercase;
      padding-bottom: 10px;
    }

    .DayPicker-Day {
      color: ${(props) => (props.dark ? 'white' : '')};
      line-height: 1.2;
      border-radius: 0 !important;
    }

    .DayPicker-Day--selected.DayPicker-Day--end:hover,
    .DayPicker-Day--selected.DayPicker-Day--start:hover {
      background-color: var(--color-primary-light);
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
      background-color: var(--color-primary);
    }

    .DayPicker-Day--start {
      background-color: var(--color-primary-light);
      border-top-left-radius: 50% !important;
      border-bottom-left-radius: 50% !important;
      font-weight: 700;
    }
    .DayPicker-Day--end {
      background-color: var(--color-primary-light);
      border-top-right-radius: 50% !important;
      border-bottom-right-radius: 50% !important;
      font-weight: 700;
    }
  }
`
