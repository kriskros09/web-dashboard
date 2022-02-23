import React, { FC, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'

// Store
import { useStore } from '../../store/models'
//Components
import { Button } from '../shared/Button'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Check, Edit } from '../shared/Icons'
import { ClickableTooltip } from '../shared/ClickableTooltip'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MandateModal } from '../../components/TodoLists/MandateModal'
import { Checkbox } from '../shared/forms/FormElements/Checkbox'
import { Pagination } from '../shared/pagination/Pagination'

type TodoTypes = {
  pageContent?: any
  ItemPerPage: number
  SortingState: string
  searchTerm: string
  scope: number
}
export const MyTasks: React.FC<TodoTypes> = ({
  pageContent,
  ItemPerPage,
  SortingState,
  searchTerm,
  scope,
}) => {
  const [showModaleMandate, SetShowModaleMandate] = useState<boolean>(false)
  const [mandateToEdit, SetMandateToEdit] = useState<number>()
  const [mandateIsUpdating, SetMandateIsUpdating] = useState<string>('')
  const [taskToUpdate, SetTaskToUpdate] = useState({ taskId: '', status: 1 })
  const [userState] = useStore('User')
  const [localeState] = useStore('Locale')
  const [todoListsState, todoListsActions] = useStore('Mandates')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { proId } = userState

  console.log('CURRENT', currentPage)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditMandateClick = (mandate) => {
    SetShowModaleMandate(!showModaleMandate)

    if (mandateToEdit !== undefined) {
      SetMandateToEdit(undefined)
    } else {
      SetMandateToEdit(mandate)
    }
  }

  React.useEffect(() => {
    todoListsActions.TodoLists({
      langId: localeState.language,
      proId,
      firmId: '',
      perPage: ItemPerPage,
      orderBy: SortingState,
      search: searchTerm,
      page: currentPage,
      scope,
    })
  }, [
    localeState.language,
    ItemPerPage,
    SortingState,
    todoListsState.mandateStatus,
    taskToUpdate,
    currentPage,
    scope,
  ])

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      todoListsActions.TodoLists({
        langId: localeState.language,
        proId,
        firmId: '',
        perPage: ItemPerPage,
        orderBy: SortingState,
        search: searchTerm,
        page: currentPage,
        scope,
      })
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [localeState.language, searchTerm])

  const changeMandateStatus = (mandId, status) => {
    SetMandateIsUpdating(mandId)

    todoListsActions.MandateStatus({
      langId: localeState.language,
      mandId,
      modBy: proId,
      status,
    })
  }

  const changeTaskStatus = (taskId, currentStatus) => {
    todoListsActions.TaskStatus({
      taskId,
      modBy: proId,
      status: currentStatus !== 4 ? 4 : 1,
    })

    SetTaskToUpdate({ taskId, status: currentStatus !== 4 ? 4 : 1 })
  }

  return (
    <>
      <div className="bg-white">
        {/* MOBILE DISPLAY */}
        <div className="w-full xl:hidden">
          {todoListsState.data.map((mandate, index) => (
            <div
              key={mandate.mandId}
              className={`text-primary-dark p-4 -mx-2 relative border-l-8 ${
                index % 2 ? 'bg-white' : 'bg-gray-100'
              } ${
                mandate.status === 3
                  ? 'border-primary-dark'
                  : mandate.status === 1
                  ? 'border-primary-middle'
                  : mandate.status === 2
                  ? 'border-primary'
                  : 'border-gray-300'
              }`}
            >
              <p
                className={`font-bold text-base mb-3 ${
                  mandate.status === 3
                    ? 'text-primary-dark'
                    : mandate.status === 1
                    ? 'text-primary-middle'
                    : mandate.status === 2
                    ? 'text-primary'
                    : 'text-gray-300'
                }`}
              >
                {mandate.statusText}

                <span className="font-light italic">
                  {mandate.paymentStatus === 1 ? ' - Awaiting payment' : null}
                </span>
              </p>
              <div className="text-sm">
                <p className="text-sm">
                  <span className="font-bold uppercase">{pageContent?.col_1}:</span>
                  {mandate.mandId}
                </p>
                <p className="text-sm">
                  <span className="font-bold capitalize">{pageContent?.col_2}: </span>
                  {mandate.userFirstName} {mandate.userLastName}
                </p>
                <p className="text-sm">
                  <span className="font-bold capitalize">{pageContent?.col_3}: </span>
                  {moment(mandate.orderDate).format('D MMM YYYY')}
                </p>
                <p className="text-sm">
                  <span className="font-bold capitalize">{pageContent?.col_4}: </span>
                  {moment(mandate.tasks[0].appointDate).format('D MMM YYYY')}
                  <br />
                  {moment(mandate.tasks[0].appointDate).format('LT')}
                </p>
                <p className="text-sm">
                  <span className="font-bold capitalize">{pageContent?.col_5}: </span>
                  {mandate.law} - {mandate.sector}
                </p>
                <div>
                  <span className="font-bold capitalize">{pageContent?.col_6}: </span>
                  <span className="font-semibold mb-2">{/* {purchases[key].task} */}</span>
                  <ul className="text-sm font-medium">
                    {mandate.tasks
                      .slice()
                      .sort((a, b) => (a.taskNumber > b.taskNumber ? 1 : -1))
                      .map((t) => (
                        <li key={t.taskId} className="flex items-center">
                          {mandate.status === 3 && mandate.paymentStatus === 3 ? (
                            <Checkbox
                              checked={t.status !== 4 ? false : true}
                              id={t.taskId}
                              label={t.name}
                              name={t.taskId}
                              value={t.taskId}
                              onChange={() => changeTaskStatus(t.taskId, t.status)}
                            />
                          ) : (
                            <>
                              <span className="flex-shrink-0">
                                <Check
                                  fillColour={t.status < 4 ? 'gray-300' : 'primary'}
                                  size={14}
                                />
                              </span>
                              <span className="inline-block ml-1 flex-shrink">{t.name}</span>
                            </>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  {mandate.status === 3 && mandate.paymentStatus === 3 ? (
                    <Button
                      className="bg-primary-dark text-white btn-sm mr-1 w-1/2 mt-10"
                      disabled={mandate.tasks.every((t) => t.status === 4) ? false : true}
                      isLoading={mandateIsUpdating === mandate.mandId && todoListsState.isLoading}
                      label={pageContent?.complete_btn}
                      onClick={() => changeMandateStatus(mandate.mandId, 4)}
                    />
                  ) : mandate.status === 1 && mandate.paymentStatus === 1 ? (
                    <div className="flex mt-10">
                      <Button
                        className="bg-primary text-white btn-sm mr-1 w-1/2"
                        isLoading={mandateIsUpdating === mandate.mandId && todoListsState.isLoading}
                        label={pageContent?.accept_btn}
                        onClick={() => changeMandateStatus(mandate.mandId, 2)}
                      />
                      <Button
                        className="bg-gray-300 text-white btn-sm w-1/2"
                        isLoading={mandateIsUpdating === mandate.mandId && todoListsState.isLoading}
                        label={pageContent?.refuse_btn}
                        onClick={() => changeMandateStatus(mandate.mandId, 5)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              {/* Edit task Disabled for the moment */}
              {/* <div className="absolute right-0 bottom-0 m-4 mb-16">
                <div
                  className="btn p-1 inline-block bg-primary relative z-0"
                  onClick={() => handleEditMandateClick(index)}
                >
                  <Edit fillColour="white" size={24} />
                </div>
              </div> */}
            </div>
          ))}
        </div>
        {/* MY TASKS DESKTOP TABLE */}
        <table className="w-full text-primary-dark hidden hidden xl:table">
          <thead className="text-left">
            <tr>
              <th className="px-3 py-2">{pageContent?.col_1} </th>
              <th className="px-3 py-2">{pageContent?.col_2}</th>
              <th className="px-3 py-2">{pageContent?.col_3}</th>
              <th className="px-3 py-2">{pageContent?.col_4}</th>
              <th className="px-3 py-2">{pageContent?.col_5}</th>
              <th className="px-3 py-2">{pageContent?.col_6}</th>
              <th className="px-3 py-2">
                <div className="flex">
                  <span className="mr-1">{pageContent?.col_7}</span>
                  <ClickableTooltip>
                    <p className="font-medium">
                      <strong>{pageContent?.infobox_8_title_1}</strong>
                      <br />
                      {pageContent?.infobox_8_text_1}
                    </p>
                    <p className="font-medium">
                      <strong>{pageContent?.infobox_8_title_2}</strong>
                      <br />
                      {pageContent?.infobox_8_text_2}
                    </p>
                    <p className="font-medium">
                      <strong>{pageContent?.infobox_8_title_3}</strong>
                      <br />
                      {pageContent?.infobox_8_text_3}
                    </p>
                    <p className="font-medium">
                      <strong>{pageContent?.infobox_8_title_4}</strong>
                      <br />
                      {pageContent?.infobox_8_text_4}
                    </p>
                    <p className="font-medium">
                      <strong>{pageContent?.infobox_8_title_5}</strong>
                      <br />
                      {pageContent?.infobox_8_text_5}
                    </p>
                  </ClickableTooltip>
                </div>
              </th>
              <th className="px-3 py-2">{pageContent?.col_8}</th>
              {/* Edit task Disabled for the moment */}
              {/* <th className="px-3 py-2">
                <div className="flex">
                  <span className="mr-1">ADD. TASK</span>
                  <ClickableTooltip>
                    <p>
                      <strong>Additional task:</strong>
                      <br /> The “additional task” function allows you to create an additional task
                      and request an additional payment. Example: the client may need more meeting
                      time than expected with you, or the client may request an additional mandate
                      from you (example, a second meeting). This tool allows you to request from the
                      client that this additional task be prepaid.
                    </p>
                  </ClickableTooltip>
                </div>
              </th> */}
            </tr>
          </thead>
          <tbody className="align-top">
            {todoListsState.data.map((mandate, index) => (
              <tr key={mandate.mandId} className={index % 2 ? 'bg-white' : 'bg-gray-100'}>
                <td className="py-3 px-3 h-16">{mandate.mandId}</td>
                <td className="py-3 px-3 h-16">
                  {mandate.userFirstName} {mandate.userLastName}
                </td>
                <td className="py-3 px-3 h-16">{moment(mandate.orderDate).format('D MMM YYYY')}</td>
                <td className="py-3 px-3 h-16">
                  {moment(mandate.tasks[0].appointDate).format('D MMM YYYY')}
                  <br />
                  {moment(mandate.tasks[0].appointDate).format('LT')}
                </td>
                <td className="py-3 px-3 h-16">
                  {mandate.law}
                  <br />- {mandate.sector}
                </td>
                <td className="py-3 px-3 h-16">
                  <p className="font-semibold mb-2">{/* {purchases[key].task} */}</p>
                  <StyledTasksList className="text-sm font-medium">
                    {mandate.tasks
                      .slice()
                      .sort((a, b) => (a.taskNumber > b.taskNumber ? 1 : -1))
                      .map((t) => (
                        <li key={t.taskId} className="flex items-center">
                          {mandate.status === 3 && mandate.paymentStatus === 3 ? (
                            <Checkbox
                              checked={t.status !== 4 ? false : true}
                              disabled={mandate.paymentStatus !== 3 ? true : false}
                              id={t.taskId}
                              label={t.name}
                              name={t.taskId}
                              value={t.taskId}
                              onChange={() => changeTaskStatus(t.taskId, t.status)}
                            />
                          ) : (
                            <>
                              <span className="flex-shrink-0">
                                <Check
                                  fillColour={t.status < 4 ? 'gray-300' : 'primary'}
                                  size={14}
                                />
                              </span>
                              <span className="inline-block ml-1 flex-shrink">{t.name}</span>
                            </>
                          )}
                        </li>
                      ))}
                  </StyledTasksList>
                </td>
                <td className="py-3 px-3 h-16">
                  <div className="flex">
                    <p
                      className={`font-bold ${
                        mandate.status === 3
                          ? 'text-primary-dark'
                          : mandate.status === 1
                          ? 'text-primary-middle'
                          : mandate.status === 2
                          ? 'text-primary'
                          : 'text-gray-300'
                      }`}
                    >
                      {mandate.statusText}

                      <br />
                      <span className="font-light italic">
                        {mandate.paymentStatus === 1 ? 'Awaiting payment' : null}
                      </span>
                    </p>
                  </div>
                </td>
                <td className="py-3 px-3 h-16">
                  <div className="flex flex-col ml-4">
                    {mandate.status === 3 && mandate.paymentStatus === 3 ? (
                      <Button
                        className="bg-primary-dark text-white btn-sm mr-1"
                        disabled={mandate.tasks.every((t) => t.status === 4) ? false : true}
                        isLoading={mandateIsUpdating === mandate.mandId && todoListsState.isLoading}
                        label={pageContent?.complete_btn}
                        onClick={() => changeMandateStatus(mandate.mandId, 4)}
                      />
                    ) : mandate.status === 1 && mandate.paymentStatus === 1 ? (
                      <>
                        <Button
                          className="bg-primary text-white btn-sm mb-1"
                          isLoading={
                            mandateIsUpdating === mandate.mandId && todoListsState.isLoading
                          }
                          label={pageContent?.accept_btn}
                          onClick={() => changeMandateStatus(mandate.mandId, 2)}
                        />
                        <Button
                          className="bg-gray-300 text-white btn-sm"
                          isLoading={
                            mandateIsUpdating === mandate.mandId && todoListsState.isLoading
                          }
                          label={pageContent?.refuse_btn}
                          onClick={() => changeMandateStatus(mandate.mandId, 5)}
                        />
                      </>
                    ) : null}
                  </div>
                </td>
                {/* Edit task Disabled for the moment */}
                {/* <td className="py-3 px-3 h-14 text-center relative">
                  <div
                    className="btn p-1 inline-block bg-primary relative z-0"
                    onClick={() => handleEditMandateClick(index)}
                  >
                    <Edit fillColour="white" size={24} />
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit task Disabled for the moment */}
        {/* {mandateToEdit !== undefined ? (
          <MandateModal
            SetHideMandate={() => handleEditMandateClick(mandateToEdit)}
            mandate={todoListsState.data[mandateToEdit]}
            // pageContent={pageContent.mandate_details}
            show={showModaleMandate}
          />
        ) : null} */}
      </div>
      {/* @todo pagination */}
      <Pagination
        ShowPage={(e) => setCurrentPage(e)}
        currentPage={currentPage}
        itemsPerPage={ItemPerPage}
        totalItems={todoListsState.listInfo.totalItems}
      />
    </>
  )
}

const StyledTasksList = styled.ul`
  li {
    .input-group {
      margin-top: 0;
      input {
        width: 13px;
        height: 13px;
        margin-right: 5px;
        &:checked:before {
          width: 5px;
          height: 7px;
          left: 4px;
        }
      }
    }
  }
`
