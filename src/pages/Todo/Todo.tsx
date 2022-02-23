import React, { FC, useState, ReactElement } from 'react'
import styled from 'styled-components'

// Hooks
import { useContent } from '../../hooks'
// Store
import { getState } from '../../store/models'
// Helpers
import { userSessionMapper } from '../../store/helpers/mappers'
//Container
import { Container } from '../../components/core/Container'
//Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { SelectComponent } from '../../components/shared/forms/FormElements/Select'
import { Radio } from '../../components/shared/forms/FormElements/Radio'
import { InputSubmit } from '../../components/shared/forms/FormElements/Submit'
import { ClearIcon } from '../../components/shared/Icons'
import { MyTasks } from '../../components/TodoLists/MyTasks'
import { EmployeesTasks } from '../../components/TodoLists/EmployeesTasks'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const TODO = 'todo_list'
const PAGE_NAMES = [GLOBAL, TODO]

const TodoPage: React.FC = (): ReactElement<'MainContainer' | 'FullViewLoader' | 'div'> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const { permissions } = userSessionMapper(getState('User')?.session)
  const isFirm = permissions.includes('firmDashboard')

  const [filterVisibility, SetFilterVisibility] = useState<boolean>(false)
  const [tabVisibility, SetTabVisibility] = useState<number>(1)
  const [ItemPerPage, setItemPerPage] = useState<number>(10)
  const [Scope, setScope] = useState<number>(0)
  const [SortingState, setSortingState] = useState<string>('mandId')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleMobileFilterSubmit = (e) => {
    e.preventDefault()

    setSortingState(e.target.elements.sortBy.value)
  }

  const perPageSelect = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
  ]

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  const sortBySelect = [
    { value: 'mandId', label: content.page[TODO].filters.sort_dropdown_2 },
    { value: 'userId', label: content.page[TODO].filters.sort_dropdown_3 },
    { value: 'orderDate', label: content.page[TODO].filters.sort_dropdown_4 },
    // { value: 'appointDate', label: filters.sort_dropdown_5 },
    { value: 'lawId', label: content.page[TODO].filters.sort_dropdown_6 },
    // { value: 'tasks', label: filters.sort_dropdown_7 },
  ]

  const DayrangeSelect = [
    { value: 1, label: content.page[TODO].filters.years_dropdown_1 },
    { value: 2, label: content.page[TODO].filters.years_dropdown_2 },
    { value: 3, label: content.page[TODO].filters.years_dropdown_3 },
    { value: 0, label: content.page[TODO].filters.years_dropdown_4 },
  ]

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading
            searchTitle={content.page[TODO].filters.search_input}
            title={content.page[TODO].texts.main_title}
            search
            onSearch={(e) => setSearchTerm(e.currentTarget.value)}
          >
            {{
              sort: (
                <>
                  <StyledItemsCountSelect>
                    <span className="inline-bloxk text-xs text-gray-400 font-medium mr-3">
                      {content.page[TODO].filters.per_page_text}
                    </span>
                    <SelectComponent
                      options={perPageSelect}
                      placeholder={content.page[TODO].filters.per_page_text}
                      searchable={false}
                      value={perPageSelect.find((option) => option.value === ItemPerPage)}
                      dropdown
                      shadow
                      onChange={(e) => setItemPerPage(e.value)}
                    />
                  </StyledItemsCountSelect>
                  <StyledSortBySelect>
                    <SelectComponent
                      options={DayrangeSelect}
                      placeholder="Day Range"
                      searchable={false}
                      value={DayrangeSelect.find((option) => option.value === Scope)}
                      dropdown
                      shadow
                      onChange={(e) => setScope(e.value)}
                    />
                  </StyledSortBySelect>
                  <StyledSortBySelect>
                    <SelectComponent
                      options={sortBySelect}
                      placeholder={content.page[TODO].filters.sort_dropdown_1}
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
                <div className="bg-gray-300 py-4 px-8 flex justify-start">
                  {isFirm ? (
                    <>
                      <Button
                        className={`btn-xs mr-2 ${
                          tabVisibility === 1 ? 'bg-white text-primary' : 'bg-primary text-white '
                        }`}
                        label={content.page[TODO].texts.tab_1}
                        onClick={() => SetTabVisibility(1)}
                      />
                      <Button
                        className={`btn-xs mr-2 ${
                          tabVisibility === 2 ? 'bg-white text-primary' : 'bg-primary text-white '
                        }`}
                        label={content.page[TODO].texts.tab_2}
                        onClick={() => SetTabVisibility(2)}
                      />
                    </>
                  ) : null}
                  <Button
                    className="bg-white text-gray-300 btn-xs mr-0 ml-auto"
                    label={content.page[TODO].filters.sort_dropdown_1}
                    onClick={() => SetFilterVisibility(!filterVisibility)}
                  />
                </div>
              ),
            }}
          </AccountHeading>
          {isFirm ? (
            <div className="hidden xl:flex">
              <div
                className={`uppercase font-bold py-2 px-6 mr-1 cursor-pointer ${
                  tabVisibility === 1 ? 'bg-white text-primary' : 'bg-primary text-white '
                }`}
                onClick={() => SetTabVisibility(1)}
              >
                {content.page[TODO].texts.tab_1}
              </div>
              <div
                className={`uppercase font-bold py-2 px-6 cursor-pointer ${
                  tabVisibility === 2 ? 'bg-white text-primary' : 'bg-primary text-white '
                }`}
                onClick={() => SetTabVisibility(2)}
              >
                {content.page[TODO].texts.tab_2}
              </div>
            </div>
          ) : null}
          <div>
            {tabVisibility === 1 ? (
              <MyTasks
                ItemPerPage={ItemPerPage}
                SortingState={SortingState}
                pageContent={content.page[TODO].table}
                scope={Scope}
                searchTerm={searchTerm}
              />
            ) : isFirm ? (
              <EmployeesTasks
                ItemPerPage={ItemPerPage}
                SortingState={SortingState}
                pageContent={content.page[TODO].table}
                scope={Scope}
                searchTerm={searchTerm}
              />
            ) : null}
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
          <StyledForm
            className="flex flex-col h-full w-full pt-16 px-8 pb-12"
            onSubmit={(e) => handleMobileFilterSubmit(e)}
          >
            <p className="text-primary font-bold uppercase text-sm mb-6">sort by</p>
            <Radio
              id="mandId"
              label={content.page[TODO].filters.sort_dropdown_2}
              name="sortBy"
              value="mandId"
            />
            <Radio
              id="userId"
              label={content.page[TODO].filters.sort_dropdown_3}
              name="sortBy"
              value="userId"
            />
            <Radio
              id="orderDate"
              label={content.page[TODO].filters.sort_dropdown_4}
              name="sortBy"
              value="orderDate"
            />
            {/* <Radio id="appointDate" value="appointDate" label={filters.sort_dropdown_5} name="sortBy" />*/}
            <Radio
              id="lawId"
              label={content.page[TODO].filters.sort_dropdown_6}
              name="sortBy"
              value="lawId"
            />
            {/* <Radio id="tasks" label={filters.sort_dropdown_7} name="sortBy" value="tasks" /> */}
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
  &:last-of-type {
    margin-left: 1.5rem;
  }
`
// const StyledDropdown = styled.div.attrs(() => ({
//   className: 'bg-white shadow-sm p-8 text-left border border-gray-100 relative z-10',
// }))`
//   min-width: 275px;

//   &:before {
//     content: '';
//     width: 23px;
//     height: 23px;
//     background-color: white;
//     border-top: 1px solid #eeeeee;
//     border-left: 1px solid #eeeeee;
//     transform: rotate(45deg);
//     position: absolute;
//     top: -11px;
//     right: 60px;
//   }
// `
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

export default TodoPage
