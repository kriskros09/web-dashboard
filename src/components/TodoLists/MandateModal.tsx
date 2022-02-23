import React, { FC, useState } from 'react'
import styled from 'styled-components'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DayPicker from 'react-day-picker'

// Store
import { useStore } from '../../store/models'
//Components
import { Modal } from '../shared/Modal'
import { InputComponent } from '../shared/forms/FormElements/Input'
import { Textarea } from '../shared/forms/FormElements/Textarea'
import { Checkbox } from '../shared/forms/FormElements/Checkbox'
import {
  Document,
  Profile,
  Description,
  ListCheck,
  Schedule,
  Stack,
  Tag,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CheckboxIcon,
  ArrowRight,
  ClearIcon,
} from '../shared/Icons'
import { Button } from '../shared/Button'
import { SelectComponent } from '../shared/forms/FormElements/Select'

const reminderOptions = [
  { value: '1d', label: '1 day before' },
  { value: '2d', label: '2 days before' },
  { value: '3d', label: '3 days before' },
  { value: '1w', label: '1 week before' },
  { value: '2w', label: '2 weeks before' },
  { value: 'end', label: 'At the deadline' },
]

type MandateModalType = {
  mandate: any
  show?: boolean
  // pageContent?: any
  SetHideMandate?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const MandateModal: FC<MandateModalType> = ({ mandate = 0, show, SetHideMandate }) => {
  // Progress bar
  const progression = 33

  const [tasks, setTasks] = useState(mandate.tasks)

  const handleAddRowTask = () => {
    setTasks(
      tasks.concat([
        {
          taskId: 'TA00000000',
          taskNumber: 1,
          name: 'New task',
          appointDate: '',
          status: 1,
        },
      ]),
    )
  }

  //Due date setting popup
  const [dueDateVisibility, setDueDate] = useState<boolean>(false)
  const [taskDueDateToEdit, SetTaskDueDateToEdit] = useState<string>()

  const handleEditDueDateClick = (taskId) => {
    setDueDate(!dueDateVisibility)

    if (taskDueDateToEdit !== undefined) {
      SetTaskDueDateToEdit(undefined)
    } else {
      SetTaskDueDateToEdit(taskId)
    }
  }

  const [selectedDueDate, setSelectedDueDate] = useState<Date>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageState, pageActions] = useStore('PageContent')

  const { mandate_details } = pageState['todo_list']

  return (
    <Modal modalClose={SetHideMandate} modalOpen={show} width="w-screen md:w-full lg:w-3/4">
      <div className="mx-auto relative w-full bg-white">
        <div className="bg-primary-dark px-10 py-3 text-white text-md font-bold uppercase">
          {mandate_details.main_title}
        </div>
        <div className="p-6 md:py-8 md:px-10">
          <div>
            <InputFormRow>
              <div className="flex items-center">
                <Profile fillColour="primary-dark" size={28} />
                <span className="md:hidden text-primary-dark font-bold px-2">Client</span>
              </div>
              <InputComponent
                id={`email-${mandate.mandId}`}
                label={mandate_details.input_1}
                placeholder={mandate_details.input_1}
                light
              />
              <InputComponent
                id={`name-${mandate.mandId}`}
                label={mandate_details.input_2}
                placeholder={mandate_details.input_2}
                value={`${mandate.userFirstName} ${mandate.userLastName}`}
                disabled
                light
              />
            </InputFormRow>
            <SingleInputFormRow className="lg:flex items-center">
              <div className="flex items-center">
                <Document fillColour="primary-dark" size={28} />
                <span className="md:hidden text-primary-dark font-bold px-2">
                  {mandate_details.input_3}
                </span>
              </div>
              <InputComponent
                id={`title-${mandate.mandId}`}
                label={mandate_details.input_3}
                placeholder={mandate_details.input_3}
                light
              />
            </SingleInputFormRow>
            <SingleInputFormRow className="md:flex items-start">
              <div className="flex items-center">
                <Description fillColour="primary-dark" size={24} />
                <span className="text-primary-dark font-bold px-2 md:hidden">
                  {mandate_details.title_1}
                </span>
              </div>

              <div className="w-full">
                <span className="text-primary-dark font-bold px-2 hidden md:inline">
                  {mandate_details.title_1}
                </span>
                <Textarea
                  id={`description-${mandate.mandId}`}
                  placeholder={mandate_details.input_4}
                  value={mandate.description}
                  light
                  onChange={(e) => console.log(e)}
                />
              </div>
            </SingleInputFormRow>
          </div>
          <div className="flex text-sm text-gray-400 font-bold -mx-3 px-3 py-3">
            <div className="flex items-center w-full md:w-2/6 pr-3">
              <ListCheck fillColour="gray-400" size={24} />
              <span className="ml-3">{mandate_details.task_col_1}</span>
            </div>
            <div className="items-center w-1/6 px-3 hidden md:flex">
              <Schedule fillColour="gray-400" size={24} />
              <span className="ml-3">{mandate_details.task_col_2}</span>
            </div>
            <div className="items-center w-1/6 px-3 hidden md:flex">
              <Stack fillColour="gray-400" size={24} />
              <span className="ml-3">{mandate_details.task_col_3}</span>
            </div>
            <div className="items-center w-1/6 px-3 hidden md:flex">
              <Tag fillColour="gray-400" size={24} />
              <span className="ml-3">{mandate_details.task_col_4}</span>
            </div>
            {/* <div className="items-center w-1/6 pl-3 hidden md:flex">
              <CheckboxIcon fillColour="gray-400" size={24} />
              <span className="ml-3">Case settle</span>
            </div> */}
          </div>
          {/* PROGRESS BAR */}
          <StyledProgressBar progress={progression}>
            <span className="text-xxs text-primary font-bold mr-3">{progression}%</span>
            <div className="progress-wrapper bg-gray-150">
              <div className="progress bg-primary" />
            </div>
          </StyledProgressBar>
          {/* TASKS ROWS */}
          <div className="px-3 -mx-9 md:-mx-3">
            {tasks.map((task) => (
              <div
                key={task.taskId}
                className="flex flex-wrap items-center border-b border-gray-200 py-3"
              >
                <div className="w-full md:w-2/6 py-2 md:py-0 pl-3 md:pl-0 pr-3 flex justify-between ">
                  <CheckboxWrapper>
                    <Checkbox
                      id={task.taskId}
                      label={task.name}
                      name="description"
                      value={task.taskId}
                      light
                    />
                  </CheckboxWrapper>
                  <div className="md:hidden">
                    <ArrowRight fillColour="gray-400" size={24} />
                  </div>
                </div>
                <div className="w-full flex justify-between md:w-1/6 py-2 md:py-0 px-3 bg-gray-150 md:bg-white border-b border-gray-200 md:border-0">
                  <button
                    className="hidden md:block"
                    onClick={() => handleEditDueDateClick(task.taskId)}
                  >
                    <Schedule fillColour="gray-400" size={24} />
                  </button>
                  <div className="flex items-center px-3 md:hidden text-sm text-gray-400">
                    <Schedule fillColour="gray-400" size={24} />
                    <span className="ml-3">20-06-2019</span>
                  </div>
                  <Button
                    className="bg-white text-gray-400 border border-gray-50 block md:hidden btn-xs"
                    label="select"
                    onClick={() => handleEditDueDateClick(task.taskId)}
                  />
                </div>
                <div className="w-full flex justify-between md:w-1/6 py-2 md:py-0 px-3 bg-gray-150 md:bg-white border-b border-gray-200 md:border-0">
                  <div className="flex items-center px-3 md:hidden text-sm text-gray-400">
                    <Stack fillColour="gray-400" size={24} />
                    <span className="ml-3">{mandate_details.task_col_3}</span>
                  </div>
                  <SmallInputWrapper>
                    <InputComponent label="amount" placeholder="0$" type="number" light />
                  </SmallInputWrapper>
                </div>
                <div className="w-full flex justify-between md:w-1/6 py-2 md:py-0 px-3 bg-gray-150 md:bg-white border-b border-gray-200 md:border-0">
                  <div className="flex items-center px-3 md:hidden text-sm text-gray-400">
                    <Tag fillColour="gray-400" size={24} />
                    <span className="ml-3">{mandate_details.task_col_4}</span>
                  </div>
                  <p
                    className={`font-bold ${
                      task.status === 3
                        ? 'text-primary-dark'
                        : task.status === 1
                        ? 'text-primary-middle'
                        : task.status === 4
                        ? 'text-primary'
                        : 'text-gray-300'
                    }`}
                  >
                    {task.status === 1 ? 'Awaiting payment' : 'Paid'}
                  </p>
                </div>
                {/* <div className="w-full flex justify-between md:w-1/6 py-2 md:py-0 pl-3 bg-gray-150 md:bg-white border-b border-gray-200 md:border-0">
                <div className="flex items-center px-3 md:hidden text-sm text-gray-400">
                  <CheckboxIcon fillColour="gray-400" size={24} />
                  <span className="ml-3">Case Settled</span>
                </div>
                <CheckboxWrapper>
                  <Checkbox id="completed" label="" name="completed" light />
                </CheckboxWrapper>
              </div>  */}
              </div>
            ))}
          </div>

          <div className="items-center py-3 hidden md:flex">
            <div className="w-2/6">
              <Button
                className="text-gray-400 bg-gray-200 flex"
                iconBefore="add"
                label="Add a task"
                onClick={() => handleAddRowTask()}
              />
            </div>
            <div className="w-1/6 px-3 text-right">
              <span>Total</span>
            </div>
            <div className="w-1/6 px-3">
              <SmallInputWrapper>
                <InputComponent label="total" placeholder="0$" type="number" disabled light />
              </SmallInputWrapper>
            </div>
          </div>
          <div className="md:hidden">
            <div className="bg-gray-150 flex justify-between -mx-6 py-2 px-3">
              <div className="flex items-center pr-3 md:hidden text-sm text-gray-400 font-bold">
                <Stack fillColour="gray-400" size={24} />
                <span className="ml-3">Total Amount</span>
              </div>
              <SmallInputWrapper>
                <InputComponent label="amount" placeholder="0$" type="number" solid />
              </SmallInputWrapper>
            </div>
            <Button
              className="text-gray-400 bg-gray-200 flex btn-sm mt-4"
              iconBefore="add"
              label="Add a task"
              onClick={() => handleAddRowTask()}
            />
          </div>
        </div>
      </div>
      {/* SET DUE DATE */}
      <div
        className={`absolute top-0 right-0 h-full bg-gray-150 z-20 w-full lg:w-auto ${
          dueDateVisibility ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-primary px-10 py-3 text-white text-md font-bold uppercase">
          CHANGE DUE DATE FOR TASK {taskDueDateToEdit}
        </div>
        <button
          className="absolute top-0 right-0 focus:outline-none m-3 z-10"
          title="close"
          onClick={() => handleEditDueDateClick(taskDueDateToEdit)}
        >
          <ClearIcon fillColour="primary-light" size={24} />
        </button>
        <div className="px-6 py-10">
          <p className="text-sm font-bold text-gray-400">Date</p>
          <InputFormRow>
            <br />
            <DayPickerInput onDayChange={(day) => setSelectedDueDate(day)} />
          </InputFormRow>
          <InputFormRow>
            <InputComponent
              label="Start time"
              labelClass="text-sm text-gray-400 font-bold"
              placeholder="Start time"
              type="time"
              solid
            />
            <InputComponent
              label="End time"
              labelClass="text-sm text-gray-400 font-bold"
              placeholder="Start time"
              type="time"
              solid
            />
          </InputFormRow>
          <StyledCalendar>
            <DayPicker numberOfMonths={1} selectedDays={selectedDueDate} />
          </StyledCalendar>
          <SelectComponent
            defaultSelected="10"
            options={reminderOptions}
            placeholder="Set reminder"
            searchable={false}
            dropdown
          />

          <div className="flex mt-8">
            <Button className="bg-primary text-white mr-1" label="save" />
            <Button className="bg-gray-300 text-white" label="remove" />
          </div>
        </div>
      </div>
    </Modal>
  )
}

const InputFormRow = styled.div.attrs({
  className: 'lg:flex items-center',
})`
  margin-top: 1rem;
  & .input-wrapper {
    margin-top: 0.5rem;
  }
  @media (min-width: 992px) {
    margin: 0.75rem -0.5rem;
    & .input-wrapper {
      width: 50%;
      margin-top: 0;
      padding: 0 0.375rem;
      & + .input-wrapper {
        margin-top: 0;
      }
    }
  }

  .DayPickerInput {
    input {
      border: 0;
      line-height: 1.125rem;
      padding: 0.875rem 1.1875rem;
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
`

const StyledCalendar = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  .DayPicker {
    background-color: white;

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
const SingleInputFormRow = styled.div`
  margin-top: 1rem;
  & .input-wrapper {
    margin-top: 0.5rem;
  }
  @media (min-width: 992px) {
    margin: 0.75rem -0.5rem;
  }

  .input-wrapper {
    width: 100%;
    padding: 0 0.375rem;
  }
`
const SmallInputWrapper = styled.div`
  .input {
    padding: 4px 5px;
    max-width: 80px;
  }
`
const CheckboxWrapper = styled.div`
  .input-group {
    margin-top: 0;
  }
`

const StyledProgressBar = styled.div.attrs({
  className: 'flex items-center',
})<{ progress: number }>`
  .progress-wrapper,
  .progress {
    height: 10px;
    border-radius: 10px;
  }

  .progress-wrapper {
    width: 100%;
  }

  .progress {
    width: ${(props) => props.progress}%;
  }
`
