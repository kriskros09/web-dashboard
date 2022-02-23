import React, { FC, useState, useRef, ReactElement } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//Hook
import { useContent } from '../../hooks'
// Store
import { useStore, getState } from '../../store/models'
//Container
import { Container } from '../../components/core/Container'
//Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { SelectComponent } from '../../components/shared/forms/FormElements/Select'
import { InputSubmit } from '../../components/shared/forms/FormElements/Submit'
import { Download, ClearIcon } from '../../components/shared/Icons'
import { ClickableTooltip } from '../../components/shared/ClickableTooltip'
import { Radio } from '../../components/shared/forms/FormElements/Radio'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const ACCOUNTING = 'accounting'
const PAGE_NAMES = [GLOBAL, ACCOUNTING]

const AccountingPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const userId = getState('User').userId

  const [userState] = useStore('User')
  const [localeState] = useStore('Locale')
  const [accountingState, accountingActions] = useStore('Accounting')
  const [SortingState, setSortingState] = useState<string>('')
  const [documentListVisibility, setDocumentListVibility] = useState<number>()
  const [filterVisibility, SetFilterVisibility] = useState<boolean>(false)
  const btnEl = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const { firmId } = userState

    if (firmId && localeState.language) {
      accountingActions.FirmCharges({
        langId: localeState.language,
        firmId,
        orderBy: SortingState,
      })
    }
  }, [localeState.language, SortingState])

  // const btnElHandleClick = (e: MouseEvent) => {
  //   if ((btnEl.current as any).contains(e.target)) {
  //     // inside click
  //     return
  //   }
  //   // outside click
  //   setDocumentListVibility(undefined)
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', btnElHandleClick)

  //   return () => {
  //     document.removeEventListener('mousedown', btnElHandleClick)
  //   }
  // }, [])

  // Filter dropdown options
  // const perPageSelect = [
  //   { value: '10', label: '10' },
  //   { value: '20', label: '20' },
  //   { value: '30', label: '30' },
  // ]

  // const DayrangeSelect = [
  //   { value: '1', label: content.page[ACCOUNTING].filters.year_dropdown_1 },
  //   { value: '2', label: content.page[ACCOUNTING].filters.year_dropdown_2 },
  //   { value: '12', label: content.page[ACCOUNTING].filters.year_dropdown_3 },
  //   { value: 'all', label: content.page[ACCOUNTING].filters.year_dropdown_4 },
  // ]

  const { charges } = accountingState

  const sumTotalCharges = charges.reduce((a, b) => +a + +b.price, 0)

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  const sortBySelect = [
    { value: 'jobID', label: content.page[ACCOUNTING].filters.sort_dropdown_2 },
    // { value: 'client', label: content.page[ACCOUNTING].filters.sort_dropdown_3 },
    { value: 'invoiceDate', label: content.page[ACCOUNTING].filters.sort_dropdown_4 },
    // { value: 'completion_date', label: content.page[ACCOUNTING].filters.sort_dropdown_5 },
    { value: 'paymentStatus', label: content.page[ACCOUNTING].filters.sort_dropdown_6 },
  ]

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading
            searchTitle={content.page[ACCOUNTING].filters.search_input}
            title={content.page[ACCOUNTING].texts.main_title}
          >
            {{
              sort: (
                <>
                  <StyledItemsCountSelect />

                  <StyledSortBySelect>
                    <SelectComponent
                      options={sortBySelect}
                      placeholder={content.page[ACCOUNTING].filters.sort_dropdown_1}
                      searchable={false}
                      value={sortBySelect.find((option) => option.value === SortingState)}
                      dropdown
                      shadow
                      onChange={(e) => setSortingState(e.value)}
                    />
                  </StyledSortBySelect>
                  {/* TODO: XLS EXPORT */}
                  {/* <Button
                    className="bg-primary text-white btn-xs ml-6"
                    label={content.page[ACCOUNTING].filters.export_btn}
                  /> */}
                </>
              ),
              button: (
                <div className="bg-gray-300 py-4 px-8 flex justify-start">
                  <Button
                    className="bg-white text-gray-300 btn-xs mr-0 ml-auto"
                    label={content.page[ACCOUNTING].filters.sort_dropdown_1}
                    onClick={() => SetFilterVisibility(!filterVisibility)}
                  />
                </div>
              ),
            }}
          </AccountHeading>

          <div className="bg-white">
            {/* MOBILE DISPLAY */}
            <div className="w-full xl:hidden">
              {charges.map((charge, index) => (
                <div
                  key={charge.pcId}
                  className={`text-primary-dark p-4 -mx-2 relative border-l-8 ${
                    index % 2 ? 'bg-white' : 'bg-gray-100'
                  } ${
                    charge.paymentStatus === 1
                      ? 'border-primary'
                      : charge.paymentStatus === 2
                      ? 'border-gray-500'
                      : 'border-primary-dark'
                  }`}
                >
                  <div className="flex">
                    <span
                      className={`uppercase font-bold mr-1 ${
                        charge.paymentStatus === 1
                          ? 'text-primary'
                          : charge.paymentStatus === 2
                          ? 'text-gray-500'
                          : 'text-primary-dark'
                      }`}
                    >
                      {charge.paymentStatusText}
                    </span>
                    <ClickableTooltip>
                      <p>
                        <strong>PENDING :</strong>
                        <br /> If the PENDING mention appears, it means you hit the COMPLETE button
                        of the ACTION column in the TO DO LIST. GoodOwl was notified that the task
                        is now completed, and we initiated the payment process. The Bar has
                        requested the expiry of a 45 days delay before we pay the professionals,
                        therefore your payment will be pending for approximately 45-50 days.
                      </p>
                      <p>
                        <strong>PAID :</strong>
                        <br /> If the PAID mention appears, it means that the 45-50 days delay have
                        elapsed, and we sent your funds towards your PAYPAL account. Please check
                        your email for instructions from Paypal, or check your Paypal account.
                      </p>
                      <p>
                        <strong>ONGOING :</strong>
                        <br /> This task is presently ongoing, and has not yet been completed. Once
                        the task is completed, the payment process will be initiated.
                      </p>
                    </ClickableTooltip>
                  </div>
                  <div className="text-sm">
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_6}:{' '}
                      </span>
                      <span className="text-primary underline">{charge.pcId}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-bold uppercase">
                        {content.page[ACCOUNTING].table.col_1}:{' '}
                      </span>
                      {charge.mandateNumbers}
                    </p>
                    {/* <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_2}:{' '}
                      </span>
                      {purchases[key].client}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_3}:{' '}
                      </span>
                      {purchases[key].professional}
                    </p> */}
                    {/* <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_4}:{' '}
                      </span>
                      {purchases[key].purchase}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_5}:{' '}
                      </span>
                      {purchases[key].completionDate}
                    </p> */}
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_8}:{' '}
                      </span>
                      {charge.price}$
                    </p>
                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_9}:{' '}
                      </span>
                      {charge.fee}$
                    </p>
                    {charge.taxes.map((taxe) => (
                      <p key={taxe.name} className="text-sm">
                        <span className="font-bold capitalize">
                          {content.page[ACCOUNTING].table.col_10}:{' '}
                        </span>
                        {taxe.amount}$
                      </p>
                    ))}

                    <p className="text-sm">
                      <span className="font-bold capitalize">
                        {content.page[ACCOUNTING].table.col_12}:{' '}
                      </span>
                      {charge.total}$
                    </p>
                  </div>
                  {/* {purchases[key].documentAvailable ? ( */}
                  <div ref={btnEl} className="absolute right-0 bottom-0 m-4 mb-16">
                    <div
                      className="btn p-1 inline-block bg-gray-300 relative z-0 cursor-pointer"
                      onClick={() =>
                        setDocumentListVibility(
                          documentListVisibility === index ? undefined : index,
                        )
                      }
                    >
                      <Download fillColour="white" size={24} />
                    </div>
                    <div
                      className={`absolute right-0 mt-6 z-10 ${
                        documentListVisibility === index ? 'block' : 'hidden'
                      }`}
                    >
                      <StyledDropdown>
                        <p className="font-bold mb-4">Documents {charge.pcId}</p>
                        <ul className="font-light text-sm italic underline">
                          <li>
                            <Link
                              rel="noopener"
                              target="_blank"
                              to={`/generate-pdf?pdfType=prof-charges&docId=${charge.pcId}&userId=${userId}`}
                            >
                              Facture
                            </Link>
                          </li>
                        </ul>
                      </StyledDropdown>
                    </div>
                  </div>
                  {/* ) : null} */}
                </div>
              ))}
            </div>
            {/* DESKTOP TABLE */}
            <table className="w-full text-primary-dark hidden hidden xl:table">
              <thead className="text-left text-xs xxl:text-sm">
                <tr>
                  <th className="px-3 py-2 align-top"># {content.page[ACCOUNTING].table.col_6}</th>
                  {/* <th className="px-3 py-2 align-top">{content.page[ACCOUNTING].table.col_2}</th> client column*/}
                  {/* <th className="px-3 py-2 align-top">{content.page[ACCOUNTING].table.col_3}</th> pro column*/}
                  {/* <th className="px-3 py-2 align-top">{content.page[ACCOUNTING].table.col_4}</th> purchase date*/}
                  {/* <th className="px-3 py-2 align-top">{content.page[ACCOUNTING].table.col_5}</th> completion date*/}
                  <th className="px-3 py-2 align-top">{content.page[ACCOUNTING].table.col_1}</th>
                  <th className="px-3 py-2 align-top">
                    <span className="mr-1">{content.page[ACCOUNTING].table.col_7}</span>
                    <ClickableTooltip center>
                      <p>
                        <strong>PENDING :</strong>
                        <br /> If the PENDING mention appears, it means you hit the COMPLETE button
                        of the ACTION column in the TO DO LIST. GoodOwl was notified that the task
                        is now completed, and we initiated the payment process. The Bar has
                        requested the expiry of a 45 days delay before we pay the professionals,
                        therefore your payment will be pending for approximately 45-50 days.
                      </p>
                      <p>
                        <strong>PAID :</strong>
                        <br /> If the PAID mention appears, it means that the 45-50 days delay have
                        elapsed, and we sent your funds towards your PAYPAL account. Please check
                        your email for instructions from Paypal, or check your Paypal account.
                      </p>
                      <p>
                        <strong>ONGOING :</strong>
                        <br /> This task is presently ongoing, and has not yet been completed. Once
                        the task is completed, the payment process will be initiated.
                      </p>
                    </ClickableTooltip>
                  </th>
                  <th className="px-3 py-2 align-top text-center">
                    {content.page[ACCOUNTING].table.col_8}
                  </th>
                  <th className="px-3 py-2 align-top text-center">
                    {content.page[ACCOUNTING].table.col_9}
                  </th>
                  <th className="px-3 py-2 align-top text-center">
                    {content.page[ACCOUNTING].table.col_10}
                  </th>
                  <th className="px-3 py-2 align-top text-center">
                    {content.page[ACCOUNTING].table.col_11}
                  </th>
                  <th className="px-3 py-2 align-top text-center">
                    {content.page[ACCOUNTING].table.col_12}
                  </th>
                  <th className="px-3 py-2 align-top text-center">
                    {content.page[ACCOUNTING].table.col_13}
                  </th>
                </tr>
              </thead>
              <tbody className="align-top">
                {charges.map((charge, index) => (
                  <tr
                    key={charge.pcId}
                    className={`text-sm xxl:text-base ${index % 2 ? 'bg-white' : 'bg-gray-100'}`}
                  >
                    <td className="py-3 px-3 h-16">
                      <span className="text-primary underline">{charge.pcId}</span>
                    </td>
                    {/* <td className="py-3 px-3 h-16">{purchases[key].client}</td>
                  <td className="py-3 px-3 h-16">{purchases[key].professional}</td>
                  <td className="py-3 px-3 h-16">{purchases[key].purchase}</td>
                  <td className="py-3 px-3 h-16">{purchases[key].completionDate}</td> */}
                    <td className="py-3 px-3 h-16">{charge.mandateNumbers}</td>
                    <td className="py-3 px-3 h-16">
                      <TooltipStyled>
                        <span
                          className={`uppercase font-bold ${
                            charge.paymentStatus === 1
                              ? 'text-primary'
                              : charge.paymentStatus === 2
                              ? 'text-gray-500'
                              : 'text-primary-dark'
                          }`}
                        >
                          {charge.paymentStatusText}
                        </span>
                        {charge.paymentStatus === 2 ? (
                          <div className="absolute bubble bg-gray-400 rounded shadow-sm text-white text-xs font-semibold p-4 text-left">
                            {content.page[ACCOUNTING].table.infobox_7}
                          </div>
                        ) : null}
                      </TooltipStyled>
                    </td>
                    <td className="py-3 px-3 h-16 text-center">{charge.price}$</td>
                    <td className="py-3 px-3 h-16 text-center">{charge.fee}$</td>
                    {charge.taxes.map((taxe) => (
                      <td key={taxe.name} className="py-3 px-3 h-16 text-center">
                        {taxe.amount}$
                      </td>
                    ))}
                    <td className="py-3 px-3 h-16 text-center">{charge.total}$</td>
                    <td className="py-3 px-3 h-14 text-center relative">
                      {/* {purchases[key].documentAvailable ? ( */}
                      <div ref={btnEl}>
                        <div
                          className="btn p-1 inline-block bg-gray-300 relative z-0 cursor-pointer"
                          onClick={() =>
                            setDocumentListVibility(
                              documentListVisibility === index ? undefined : index,
                            )
                          }
                        >
                          <Download fillColour="white" size={24} />
                        </div>
                        <div
                          className={`absolute right-0 mt-6 z-10 ${
                            documentListVisibility === index ? 'block' : 'hidden'
                          }`}
                        >
                          <StyledDropdown>
                            <p className="font-bold mb-4">Documents {charge.pcId}</p>
                            <ul className="font-light text-sm italic underline">
                              <li>
                                <Link
                                  rel="noopener"
                                  target="_blank"
                                  to={`/generate-pdf?pdfType=prof-charges&docId=${charge.pcId}&userId=${userId}`}
                                >
                                  Facture
                                </Link>
                              </li>
                            </ul>
                          </StyledDropdown>
                        </div>
                      </div>
                      {/* ) : null} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-primary-light text-primary-dark text-right py-5 px-8 border-t border-primary-dark">
              <p className="text-uppercase font-bold">
                {content.page[ACCOUNTING].table.total_text} {sumTotalCharges}$
              </p>
            </div>
            {/* TODO: pagination */}
          </div>
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
          <StyledForm className="flex flex-col h-full w-full pt-16 px-8 pb-12">
            <p className="text-primary font-bold uppercase text-sm mb-6">
              {content.page[ACCOUNTING].filters.sort_dropdown_1}
            </p>
            <Radio
              id="job"
              label={content.page[ACCOUNTING].filters.sort_dropdown_2}
              name="sortBy"
            />
            <Radio
              id="client"
              label={content.page[ACCOUNTING].filters.sort_dropdown_3}
              name="sortBy"
            />
            <Radio
              id="purchasedate"
              label={content.page[ACCOUNTING].filters.sort_dropdown_4}
              name="sortBy"
            />
            <Radio
              id="completiondate"
              label={content.page[ACCOUNTING].filters.sort_dropdown_5}
              name="sortBy"
            />
            <Radio
              id="status"
              label={content.page[ACCOUNTING].filters.sort_dropdown_6}
              name="sortBy"
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
  flex-shrink: 0;
  .select-wrapper {
    min-width: 200px;
  }
  &:last-of-type {
    margin-left: 1.5rem;
  }
`
const StyledDropdown = styled.div.attrs(() => ({
  className: 'bg-white shadow-sm p-8 text-left border border-gray-100 relative z-10',
}))`
  min-width: 275px;

  &:before {
    content: '';
    width: 23px;
    height: 23px;
    background-color: white;
    border-top: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
    transform: rotate(45deg);
    position: absolute;
    top: -11px;
    right: 60px;
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

const StyledForm = styled.div`
  .btn {
    margin-top: auto;
  }
`

const TooltipStyled = styled.button.attrs(() => ({
  className: 'self-center relative',
}))`
  &:focus {
    outline: none;
  }
  & .bubble {
    opacity: 0;
    visibility: hidden;
    min-width: 300px;
    max-width: 300px;
    transition: opacity 0.2s ease-out, visibility 0.2s 0.2s ease-in-out;

    @media (min-width: 768px) {
      left: -20px;
      top: 20px;
      transform: translate(-100%, -50%);
    }

    &:after {
      content: '';
      height: 10px;
      width: 10px;
      background-color: #888888;
      position: absolute;
      @media (min-width: 768px) {
        right: -5px;
        top: 20px;
        transform: translateY(-50%) rotate(45deg);
      }
    }
  }
  &:hover {
    & .bubble {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.2s 0.2s ease-in-out;
    }
  }
`

export default AccountingPage
