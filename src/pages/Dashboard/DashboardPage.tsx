import React, { useState, ReactElement } from 'react'

// Hooks
import { useContent } from '../../hooks'
// Store
import { useStore, getState } from '../../store/models'
// Helpers
import { userSessionMapper } from '../../store/helpers/mappers'
//Container
import { Container } from '../../components/core/Container'
// Components
import { Layout } from '../../components/core/Layout'
import { AccountLayout } from '../../components/shared/AccountLayout'
import { AccountHeading } from '../../components/shared/AccountHeading'
import { Button } from '../../components/shared/Button'
import { NextTask } from '../../components/Dashboard/NextTask'
import { SalesStats } from '../../components/Dashboard/SalesStats'
import { RevenueBarChart } from '../../components/Dashboard/RevenueBarChart'
import { RevenueBarChartPro } from '../../components/Dashboard/RevenueBarChartPro'
import { ClientPieChart } from '../../components/Dashboard/ClientPieChart'
import { ClientPieChartPro } from '../../components/Dashboard/ClientPieChartPro'
import { Calendar } from '../../components/Dashboard/Calendar'
import { CalendarPro } from '../../components/Dashboard/CalendarPro'
import { Professionals } from '../../components/Dashboard/Professionals'
import { Ratings } from '../../components/Dashboard/Ratings'
import { FullViewLoader } from '../../components/Loader/FullViewLoader'

const GLOBAL = 'global'
const DASHBOARD = 'dashboard'
const PAGE_NAMES = [GLOBAL, DASHBOARD]

const DashboardPage: React.FC = (): ReactElement<
  'MainContainer' | 'FullViewLoader' | 'div'
> | null => {
  const { isLoading, content } = useContent({ pageNames: PAGE_NAMES })
  const [localeState] = useStore('Locale')
  const [userState] = useStore('User')

  const [tabVisibility, SetTabVisibility] = useState<number>(1)
  const [dashboardState, dashboardActions] = useStore('Dashboard')
  const { proId, firmId } = userState
  const { permissions } = userSessionMapper(getState('User')?.session)
  const isPro = permissions.includes('profDashboard')
  const isFirm = permissions.includes('firmDashboard')

  React.useEffect(() => {
    if (firmId && isFirm) {
      dashboardActions.GetFirmDashboard({
        firmId,
        langId: localeState.language,
      })
    }
  }, [localeState.language, firmId])

  React.useEffect(() => {
    if (proId && isPro) {
      dashboardActions.GetProDashboard({
        proId,
        firmId,
        langId: localeState.language,
      })
    }
  }, [localeState.language, proId])

  const { dashboard } = dashboardState
  const { dashboard_firm } = dashboardState

  if (!isLoading && !Object.keys(content.page).length) {
    return null
  }

  if (isLoading) {
    return <FullViewLoader showLoader={isLoading} />
  }

  return (
    <Container center>
      <Layout>
        <AccountLayout pageContent={content.page[GLOBAL]}>
          <AccountHeading
            subtitle={
              tabVisibility === 1
                ? ''
                : `${dashboard?.addresses[0].streetNumber} ${dashboard?.addresses[0].street} ${dashboard?.addresses[0].apartment}, ${dashboard?.addresses[0].city} ${dashboard?.addresses[0].regionName}, ${dashboard?.addresses[0].postalCode}`
            }
            title={
              tabVisibility === 1
                ? `${content.page[DASHBOARD].texts.main_title_firm} ${dashboard?.name}`
                : `${content.page[DASHBOARD].texts.main_title_pro} ${dashboard?.name}`
            }
          >
            {{
              sort: isFirm ? (
                <>
                  <Button
                    className={`btn-sm mr-2 ml-2 ${
                      tabVisibility === 1 ? 'bg-white text-primary' : 'bg-primary text-white '
                    }`}
                    label={content.page[DASHBOARD].texts.btn_firm}
                    onClick={() => SetTabVisibility(1)}
                  />
                  <Button
                    className={`btn-sm mr-2 ${
                      tabVisibility === 2 ? 'bg-white text-primary' : 'bg-primary text-white '
                    }`}
                    label={content.page[DASHBOARD].texts.btn_mystats}
                    onClick={() => SetTabVisibility(2)}
                  />
                </>
              ) : null,
              button: isFirm ? (
                <div className="bg-gray-300 py-4 px-8 flex justify-start">
                  <Button
                    className={`btn-xs mr-2 ${
                      tabVisibility === 1 ? 'bg-white text-primary' : 'bg-primary text-white '
                    }`}
                    label="my firm stats"
                    onClick={() => SetTabVisibility(1)}
                  />
                  <Button
                    className={`btn-xs mr-2 ${
                      tabVisibility === 2 ? 'bg-white text-primary' : 'bg-primary text-white '
                    }`}
                    label="my stats"
                    onClick={() => SetTabVisibility(2)}
                  />
                </div>
              ) : null,
            }}
          </AccountHeading>
          {tabVisibility === 1 && isFirm ? (
            <>
              {/* FIRM STATS */}
              <div className="flex flex-col flex-wrap md:flex-row md:-mx-2 xxl:-mx-5">
                <div className="w-full md:w-1/2 md:order-0 lg:order-0 lg:w-1/4 py-1 md:py-3 md:px-2 xxl:px-5 flex flex-col justify-between">
                  <NextTask
                    empty={content.page[DASHBOARD].texts.task_empty}
                    tasks={dashboard_firm?.nextTasks}
                    title={content.page[DASHBOARD].texts.task_title}
                  />
                  <SalesStats
                    icon="accounting"
                    percentage=""
                    stat={dashboard_firm?.sales}
                    title="Sales"
                  />
                  <SalesStats
                    icon="accounting"
                    percentage=""
                    stat={dashboard_firm?.tasks}
                    title="Transactions"
                  />
                  <SalesStats
                    icon="accounting"
                    percentage=""
                    stat={dashboard_firm?.saleAvg}
                    title={content.page[DASHBOARD].texts.average_title}
                  />
                </div>
                <div className="w-full md:order-2 lg:order-1 lg:w-2/4 py-1 md:py-3 md:px-2 xxl:px-5">
                  <RevenueBarChart textContent={content.page[DASHBOARD].texts} />
                </div>
                <div className="w-full md:order-1 lg:order-2 md:w-1/2 lg:w-1/4 py-1 md:py-3 md:px-2 xxl:px-5">
                  <Calendar
                    calendar={dashboard_firm?.calendar}
                    title={content.page[DASHBOARD].texts.calendar_title}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-wrap md:flex-row md:-mx-2 xxl:-mx-5">
                <div className="w-full lg:w-3/4 py-1 md:py-3 md:px-2 xxl:px-5">
                  <Professionals textContent={content.page[DASHBOARD].texts} />
                </div>
                <div className="w-full  md:w-1/2 lg:w-1/4 py-1 md:py-3 md:px-2 xxl:px-5">
                  <ClientPieChart textContent={content.page[DASHBOARD].texts} />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* MY STATS */}

              <div className="flex flex-col flex-wrap md:flex-row md:-mx-2 xxl:-mx-5 items-start">
                <div className="w-full lg:w-1/2 md:order-0 xl:order-0 xl:w-1/4 py-1 md:py-3 md:px-2 xxl:px-5 flex flex-col justify-between">
                  <NextTask
                    empty={content.page[DASHBOARD].texts.task_empty}
                    tasks={dashboard?.nextTasks}
                    title={content.page[DASHBOARD].texts.task_title}
                  />

                  <Ratings
                    rating_avg={dashboard?.reviewAvg}
                    rating_type_0={dashboard?.reviews[0].rating}
                    rating_type_1={dashboard?.reviews[2].rating}
                    rating_type_2={dashboard?.reviews[1].rating}
                    rating_type_3={dashboard?.reviews[3].rating}
                    title={content.page[DASHBOARD].texts.rating_text}
                    title_type_0={dashboard?.reviews[0].name}
                    title_type_1={dashboard?.reviews[2].name}
                    title_type_2={dashboard?.reviews[1].name}
                    title_type_3={dashboard?.reviews[3].name}
                  />
                  <ClientPieChartPro textContent={content.page[DASHBOARD].texts} />
                </div>
                <div className="w-full md:order-2 lg:order-1 lg:w-2/4 py-1 md:py-3 md:px-2 xxl:px-5">
                  <div className="flex flex-col flex-wrap justify-between md:flex-row md:-mx-2 xxl:-mx-5">
                    <div className="w-full lg:w-2/4 pb-1 md:pb-3 md:px-2 xxl:px-5">
                      <SalesStats
                        icon="accounting"
                        percentage=""
                        stat={dashboard?.sales}
                        title="Sales"
                      />
                    </div>
                    <div className="w-full lg:w-2/4 pb-1 md:pb-3 md:px-2 xxl:px-5">
                      <SalesStats
                        icon="accounting"
                        percentage=""
                        stat={dashboard?.tasks}
                        title="Tasks"
                      />
                    </div>
                  </div>
                  <RevenueBarChartPro textContent={content.page[DASHBOARD].texts} />
                </div>
                <div className="w-full md:order-1 lg:order-2 md:w-1/2 lg:w-1/4 py-1 md:py-3 md:px-2 xxl:px-5">
                  <CalendarPro
                    tasks={dashboard?.calendar.tasks}
                    title={content.page[DASHBOARD].texts.calendar_title}
                  />
                </div>
              </div>
            </>
          )}
        </AccountLayout>
      </Layout>
    </Container>
  )
}

export default DashboardPage
