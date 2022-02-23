import React, { FC, useState } from 'react'
import moment from 'moment'

// Store
import { useStore } from '../../store/models'
//Components
import { Check } from '../shared/Icons'
import { ClickableTooltip } from '../shared/ClickableTooltip'
import { Pagination } from '../shared/pagination/Pagination'

// import { ClickableTooltip } from '../shared/ClickableTooltip'

type TodoTypes = {
  pageContent?: any
  ItemPerPage: number
  SortingState: string
  searchTerm: string
  scope: number
}

export const EmployeesTasks: React.FC<TodoTypes> = ({
  pageContent,
  ItemPerPage,
  SortingState,
  searchTerm,
  scope,
}) => {
  const [userState] = useStore('User')
  const [localeState] = useStore('Locale')
  const [todoListsState, todoListsActions] = useStore('Mandates')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { firmId } = userState

  React.useEffect(() => {
    todoListsActions.TodoLists({
      langId: localeState.language,
      proId: '',
      firmId,
      perPage: ItemPerPage,
      orderBy: SortingState,
      search: searchTerm,
      page: currentPage,
      scope,
    })
  }, [localeState.language, ItemPerPage, SortingState, currentPage, scope])

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      todoListsActions.TodoLists({
        langId: localeState.language,
        proId: '',
        firmId,
        perPage: ItemPerPage,
        orderBy: SortingState,
        search: searchTerm,
        page: currentPage,
        scope,
      })
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [localeState.language, searchTerm])

  return (
    <>
      <div className="bg-white">
        {/* EMPLOYEE'S MOBILE DISPLAY */}
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
                  <span className="font-bold uppercase">{pageContent?.col_1}: </span>
                  {mandate.mandId}
                </p>
                <p className="text-sm">
                  <span className="font-bold capitalize">Professional: </span>
                  {mandate.proFirstName} {mandate.proLastName}
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
                  {/* <span className="font-semibold mb-2">{purchases[key].task}</span> */}
                  <ul className="text-sm font-medium">
                    {mandate.tasks
                      .slice()
                      .sort((a, b) => (a.taskNumber > b.taskNumber ? 1 : -1))
                      .map((t) => (
                        <li key={t.taskId} className="flex items-center">
                          <span className="flex-shrink-0">
                            <Check fillColour={t.status !== 4 ? 'gray-300' : 'primary'} size={14} />
                          </span>
                          <span className="inline-block ml-1 flex-shrink">{t.name}</span>{' '}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* EMPLOYEE'S DESKTOP TABLE */}
        <table className="w-full text-primary-dark hidden hidden xl:table">
          <thead className="text-left">
            <tr>
              <th className="px-3 py-2 flex">{pageContent?.col_1} </th>
              <th className="px-3 py-2">PROFESSIONAL</th>
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
            </tr>
          </thead>
          <tbody className="align-top">
            {todoListsState.data.map((mandate, index) => (
              <tr key={mandate.mandId} className={index % 2 ? 'bg-white' : 'bg-gray-100'}>
                <td className="py-3 px-3 h-16"> {mandate.mandId}</td>
                <td className="py-3 px-3 h-16">
                  {mandate.proFirstName} {mandate.proLastName}
                </td>
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
                  <br /> - {mandate.sector}
                </td>
                <td className="py-3 px-3 h-16">
                  {/* <p className="font-semibold mb-2">{purchases[key].task}</p> */}
                  <ul className="text-sm font-medium">
                    {mandate.tasks
                      .slice()
                      .sort((a, b) => (a.taskNumber > b.taskNumber ? 1 : -1))
                      .map((t) => (
                        <li key={t.taskId} className="flex items-center">
                          <span className="flex-shrink-0">
                            <Check fillColour={t.status < 4 ? 'gray-300' : 'primary'} size={14} />
                          </span>
                          <span className="inline-block ml-1 flex-shrink">{t.name}</span>
                        </li>
                      ))}
                  </ul>
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
              </tr>
            ))}
          </tbody>
        </table>
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
