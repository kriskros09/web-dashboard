import React, { useState, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { toast } from 'react-toastify'

// Hooks
import { useContent } from '../../hooks'
// Store
import { useStore, getState } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { PurchaseDocumentsList } from '../../components/PurchaseDocuments/PurchaseDocumentsList'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { SelectComponent } from '../../components/shared/forms/FormElements/Select'
import { Radio } from '../../components/shared/forms/FormElements/Radio'
import { InputSubmit } from '../../components/shared/forms/FormElements/Submit'
import { Check, ClearIcon } from '../../components/shared/Icons'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'
import { Pagination } from '../../components/shared/pagination/Pagination'

const GLOBAL = 'global'
const PURCHASE = 'purchases'
const PAGE_NAMES = [GLOBAL, PURCHASE]

const perPageSelect = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
]
const PurchasePage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const { userId } = getState('User')

  const [localeState] = useStore('Locale')
  const [mandatesState, mandatesActions] = useStore('Mandates')
  const [, orderActions] = useStore('Order')
  const [filterVisibility, SetFilterVisibility] = useState<boolean>(false)
  const [ItemPerPage, setItemPerPage] = useState<number>(10)
  const [SortingState, setSortingState] = useState<string>('mandId')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const history = useHistory()

  React.useEffect(() => {
    mandatesActions.UserPurchases({
      langId: localeState.language,
      userId,
      perPage: ItemPerPage,
      orderBy: SortingState,
      search: searchTerm,
      page: currentPage,
      scope: 0,
    })
  }, [localeState.language, ItemPerPage, SortingState, currentPage])

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      mandatesActions.UserPurchases({
        langId: localeState.language,
        userId,
        perPage: ItemPerPage,
        orderBy: SortingState,
        search: searchTerm,
        page: currentPage,
        scope: 0,
      })
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [localeState.language, searchTerm])

  const handleMobileFilterSubmit = (e) => {
    e.preventDefault()

    setSortingState(e.target.elements.sortBy.value)
  }

  const proceedToPayment = async (mandId, taskId) => {
    console.log('payer', mandId, taskId)
    await orderActions.getMandateOrderDetails({
      langId: localeState.language,
      mandId,
      taskId,
    })

    const { errors } = getState('Order')

    if (errors.length > 0) {
      toast.error('Erreur, veuillez réessayer plus tard')
    } else {
      history.push('/checkout')
    }
  }

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  const sortBySelect = [
    { value: 'mandId', label: content.page[PURCHASE].filters.sort_dropdown_2 },
    { value: 'proId', label: content.page[PURCHASE].filters.sort_dropdown_3 },
    { value: 'orderDate', label: content.page[PURCHASE].filters.sort_dropdown_4 },
    // { value: 'appointDate', label: content.page[PURCHASE].filters.sort_dropdown_5 },
    // { value: 'tasks', label: content.page[PURCHASE].filters.sort_dropdown_6 },
    { value: 'status', label: content.page[PURCHASE].filters.sort_dropdown_7 },
  ]

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading
            searchTitle={content.page[PURCHASE].filters.search_input}
            title={content.page[PURCHASE].texts.main_title}
            search
            onSearch={(e) => setSearchTerm(e.currentTarget.value)}
          >
            {{
              sort: (
                <>
                  <StyledItemsCountSelect>
                    <span className="inline-bloxk text-xs text-gray-400 font-medium mr-3">
                      {content.page[PURCHASE].filters.per_page_text}
                    </span>
                    <SelectComponent
                      options={perPageSelect}
                      placeholder={content.page[PURCHASE].filters.per_page_text}
                      searchable={false}
                      value={perPageSelect.find((option) => option.value === ItemPerPage)}
                      dropdown
                      shadow
                      onChange={(e) => setItemPerPage(e.value)}
                    />
                  </StyledItemsCountSelect>
                  <StyledSortBySelect>
                    <SelectComponent
                      options={sortBySelect}
                      placeholder={content.page[PURCHASE].filters.sort_dropdown_1}
                      searchable={false}
                      value={sortBySelect.find((option) => option.value === SortingState)}
                      dropdown
                      shadow
                      onChange={(e) => setSortingState(e.value)}
                    />
                  </StyledSortBySelect>
                </>
              ),
              button: (
                <div className="bg-gray-300 py-4 px-8">
                  <Button
                    className="bg-white text-gray-300 btn-xs"
                    label={content.page[PURCHASE].filters.sort_dropdown_1}
                    onClick={() => SetFilterVisibility(!filterVisibility)}
                  />
                </div>
              ),
            }}
          </AccountHeading>

          <div className="bg-white">
            {/* MOBILE DISPLAY */}
            <div className="w-full xl:hidden">
              {mandatesState?.data.map((purchase, index) => (
                <div
                  key={purchase.mandId}
                  className={`text-primary-dark p-4 -mx-2 relative border-l-8 ${
                    index % 2 ? 'bg-white' : 'bg-gray-100'
                  } ${
                    purchase.status === 3
                      ? 'border-primary-dark'
                      : purchase.status === 1
                      ? 'border-primary-middle'
                      : purchase.status === 2
                      ? 'border-primary'
                      : 'border-gray-300'
                  }`}
                >
                  <p
                    className={`font-bold text-base mb-3 ${
                      purchase.status === 3
                        ? 'text-primary-dark'
                        : purchase.status === 1
                        ? 'text-primary-middle'
                        : purchase.status === 2
                        ? 'text-primary'
                        : 'text-gray-300'
                    }`}
                  >
                    {purchase.statusText}
                    <br />
                    <span className="font-light italic">
                      {purchase.paymentStatus === 2 ? 'Awaiting payment' : null}
                    </span>
                  </p>
                  <div className="text-sm">
                    <p className="text-sm">
                      <span className="font-bold uppercase">
                        {content.page[PURCHASE].table.col_1}:{' '}
                      </span>
                      {purchase.mandId}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[PURCHASE].table.col_2}:{' '}
                      </span>
                      {purchase.proFirstName} {purchase.proLastName}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[PURCHASE].table.col_3}:{' '}
                      </span>
                      {moment(purchase.orderDate).format('ddd D YYYY')}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[PURCHASE].table.col_4}:{' '}
                      </span>
                      {purchase.custSubTotal}$
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[PURCHASE].table.col_5}:{' '}
                      </span>
                      {moment(purchase.tasks[0].appointDate).format('ddd D YYYY')} -{' '}
                      {moment(purchase.tasks[0].appointDate).format('LT')}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[PURCHASE].table.col_6}:{' '}
                      </span>
                      {purchase.law} - {purchase.sector}
                    </p>
                    <div>
                      <span className="font-bold capitalize">
                        {content.page[PURCHASE].table.col_7}:{' '}
                      </span>
                      <span className="font-semibold mb-2">{/* {purchases[key].task} */}</span>
                      <ul className="text-sm font-medium">
                        {purchase.tasks
                          .slice()
                          .sort((a, b) => (a.taskNumber > b.taskNumber ? 1 : -1))
                          .map((t) => (
                            <li key={t.taskId} className="flex items-center">
                              <span className="flex-shrink-0">
                                <Check
                                  fillColour={t.status < 4 ? 'gray-300' : 'primary'}
                                  size={14}
                                />
                              </span>
                              <span className="inline-block ml-1 flex-shrink">{t.name}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      {purchase.status === 2 && purchase.paymentStatus === 1 ? (
                        <div className="flex flex-col mb-10 mt-2">
                          <Button
                            className="bg-primary text-white btn-sm mb-1"
                            label={content.page[PURCHASE].table.pay_btn}
                            onClick={() =>
                              proceedToPayment(purchase.mandId, purchase.tasks[0].taskId)
                            }
                          />
                          {/* <Button className="bg-gray-300 text-white btn-sm" label="cancel" /> */}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {purchase.purchaseOrders?.length !== 0 ? (
                    <PurchaseDocumentsList
                      index={index}
                      pageContent={content.page[PURCHASE]}
                      purchase={purchase}
                    />
                  ) : null}
                </div>
              ))}
            </div>
            {/* DESKTOP TABLE */}
            <table className="w-full text-primary-dark hidden hidden xl:table">
              <thead className="text-left">
                <tr>
                  <th className="px-3 py-2 flex">{content.page[PURCHASE].table.col_1}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_2}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_3}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_4}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_5}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_6}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_7}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_8}</th>
                  <th className="px-3 py-2">{content.page[PURCHASE].table.col_9}</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {mandatesState.data.map((purchase, index) => (
                  <tr key={purchase.mandId} className={index % 2 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="py-3 px-3 h-16">{purchase.mandId}</td>
                    <td className="py-3 px-3 h-16">
                      {purchase?.proFirstName} {purchase?.proLastName}
                    </td>
                    <td className="py-3 px-3 h-16">
                      {moment(purchase.orderDate).format('ddd D YYYY')}
                    </td>
                    <td className="py-3 px-3 h-16">{purchase.custSubTotal}$</td>
                    <td className="py-3 px-3 h-16">
                      {moment(purchase.tasks[0].appointDate).format('ddd D YYYY')}
                      <br />
                      {moment(purchase.tasks[0].appointDate).format('LT')}
                    </td>
                    <td className="py-3 px-3 h-16">
                      {purchase.law}
                      <br />- {purchase.sector}
                    </td>
                    <td className="py-3 px-3 h-16">
                      <p className="font-semibold mb-2">{/* {purchases[key].task} */}</p>
                      <ul className="text-sm font-medium">
                        {purchase.tasks
                          .slice()
                          .sort((a, b) => (a.taskNumber > b.taskNumber ? 1 : -1))
                          .map((t) => (
                            <li key={t.taskId} className="flex items-center">
                              <span className="flex-shrink-0">
                                <Check
                                  fillColour={t.status < 4 ? 'gray-300' : 'primary'}
                                  size={14}
                                />
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
                            purchase.status === 3
                              ? 'text-primary-dark'
                              : purchase.status === 1
                              ? 'text-primary-middle'
                              : purchase.status === 2
                              ? 'text-primary'
                              : 'text-gray-300'
                          }`}
                        >
                          {purchase.statusText}
                          <br />
                          <span className="font-light italic">
                            {purchase.paymentStatus === 1 ? 'Awaiting payment' : null}
                          </span>
                        </p>
                        {purchase.status === 2 && purchase.paymentStatus === 1 ? (
                          <div className="flex flex-col ml-4">
                            <Button
                              className="bg-primary text-white btn-sm mb-1"
                              label={content.page[PURCHASE].table.pay_btn}
                              onClick={() =>
                                proceedToPayment(purchase.mandId, purchase.tasks[0].taskId)
                              }
                            />
                            {/* <Button className="bg-gray-300 text-white btn-sm" label="cancel" /> */}
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td className="py-3 px-3 h-14 text-center relative">
                      {purchase.purchaseOrders?.length !== 0 ? (
                        <PurchaseDocumentsList
                          index={index}
                          pageContent={content.page[PURCHASE]}
                          purchase={purchase}
                        />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <Button
            className="bg-primary text-white btn-sm mt-6"
            label={content.page[PURCHASE].texts.trust_btn}
          /> */}
          <Pagination
            ShowPage={(e) => setCurrentPage(e)}
            currentPage={currentPage}
            itemsPerPage={ItemPerPage}
            totalItems={mandatesState.listInfo.totalItems}
          />
        </AccountLayout>
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
          <StyledForm
            className="flex flex-col h-full w-full pt-16 px-8 pb-12"
            onSubmit={(e) => handleMobileFilterSubmit(e)}
          >
            <p className="text-primary font-bold uppercase text-sm mb-6">
              {content.page[PURCHASE].filters.sort_dropdown_1}
            </p>
            <Radio
              id="mandId"
              label={content.page[PURCHASE].filters.sort_dropdown_2}
              name="sortBy"
              value="mandId"
            />
            <Radio
              id="proId"
              label={content.page[PURCHASE].filters.sort_dropdown_3}
              name="sortBy"
              value="proId"
            />
            <Radio
              id="orderDate"
              label={content.page[PURCHASE].filters.sort_dropdown_4}
              name="sortBy"
              value="orderDate"
            />
            {/* <Radio id="appointDate" value="appointDate" label={content.page[PURCHASE].filters.sort_dropdown_5} name="sortBy" />
            <Radio id="tasks" value="tasks" label={content.page[PURCHASE].filters.sort_dropdown_6} name="sortBy" /> */}
            <Radio
              id="status"
              label={content.page[PURCHASE].filters.sort_dropdown_7}
              name="sortBy"
              value="status"
            />
            <InputSubmit className="text-white bg-primary" value="apply" />
          </StyledForm>
        </StyledFilterContainer>
      </Layout>
    </Container>
  )
}

const StyledItemsCountSelect = styled.div.attrs(() => ({
  className: 'flex items-center mx-6',
}))`
  .select-wrapper {
    min-width: 75px;
  }
`
const StyledSortBySelect = styled.div`
  .select-wrapper {
    min-width: 200px;
  }
`

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
`

const StyledForm = styled.form`
  .btn {
    margin-top: auto;
  }
`

export default PurchasePage
