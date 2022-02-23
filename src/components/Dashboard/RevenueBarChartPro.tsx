import React, { useState } from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Store
import { useStore } from '../../store/models'
// Components
import { SelectComponent } from '../shared/forms/FormElements/Select'

type RevenueChartTypes = {
  textContent: any
}

const CustomTooltip = ({ active, payload, label, label1, label2 }) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-primary-dark text-gray-200 py-2 px-4 rounded">
        <div className="mb-5">
          <p className="uppercase font-bold mb-2">{label}</p>
          <p className="uppercase text-xs font-medium mb-1">{label1} :</p>
          <p className="font-bold text-md text-white">{payload[0]?.value}$</p>
          <p className="text-xxs font-medium text-white">
            {payload[0]?.payload.thisYeartransaction} transactions
          </p>
        </div>
        <div>
          <p className="uppercase text-xs font-medium mb-1">{label2} :</p>
          <p className="font-bold text-md text-white">{payload[1].value}$</p>
          <p className="text-xxs font-medium text-white">
            {payload[1]?.payload.lastYeartransaction} transactions
          </p>
        </div>
      </div>
    )
  }

  return null
}

export const RevenueBarChartPro: React.FC<RevenueChartTypes> = ({ textContent = '' }) => {
  const [userState] = useStore('User')
  const [localeState] = useStore('Locale')
  const [dashboardState, dashboardActions] = useStore('Dashboard')
  const isPro = userState.session?.decodedToken.permissions.includes('profDashboard')
  const { proId } = userState
  const { firmId } = userState
  const [Period, setperiod] = useState<number>(0)

  React.useEffect(() => {
    ;(async () => {
      if (proId && isPro) {
        await dashboardActions.ProRevenuData({
          proId,
          firmId,
          langId: localeState.language,
          scope: Period,
        })
      }
    })()
  }, [localeState.language, Period])

  const data = dashboardState?.dashboard_revenue_pro?.map((d) => ({
    name: d.month,
    thisYear: d.thisYearRevenue,
    lastYear: d.lastYearRevenue,
    thisYearTransaction: d.thisYearTransactions,
    lastYearTransaction: d.lastYearTransaction,
  }))

  const dataViews = [
    { value: 0, label: textContent.revenue_dropdown_2 },
    { value: 1, label: '90 jours' },
    { value: 2, label: '60 jours' },
    { value: 3, label: textContent.revenue_dropdown_1 },
  ]

  const errors = { nodata: "Aucune donnée concernant votre revenu n'est enregistré pour le moment" }

  // if (!data || data.length === 0 || data === null || data === undefined) {
  //   return null
  // }

  return (
    <div className="bg-white py-4 px-5 module w-full h-full">
      <div className="flex justify-between flex-wrap">
        <p className="text-primary font-medium text-md">{textContent.revenue_title}</p>
        <SelectWrapperStyled>
          <SelectComponent
            icon="calendar"
            options={dataViews}
            placeholder="View"
            value={dataViews.find((option) => option.value === Period)}
            outline
            onChange={(e) => setperiod(e.value)}
          />
        </SelectWrapperStyled>
      </div>
      <WrapperStyled>
        <ResponsiveContainer>
          {dashboardState?.dashboard_revenue_pro?.length !== 0 ? (
            <BarChart
              data={data}
              height={400}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              width={600}
            >
              <CartesianGrid stroke="#EAEAEA" vertical={false} />
              <XAxis axisLine={false} dataKey="name" tickLine={false} />
              <YAxis axisLine={false} tickLine={false} unit="k$" />
              <Tooltip
                content={
                  <CustomTooltip
                    label=""
                    label1={textContent.revenue_text_1}
                    label2={textContent.revenue_text_2}
                    payload={data}
                    active
                  />
                }
              />
              <Legend align="left" iconType="rect" verticalAlign="bottom" />
              <Bar dataKey="thisYear" fill="#4298b5" name={textContent.revenue_text_1} />
              <Bar dataKey="lastYear" fill="#BBBBBB" name={textContent.revenue_text_2} />
            </BarChart>
          ) : (
            <p className="pt-8 text-sm text-gray-400 font-medium">{errors.nodata}</p>
          )}
        </ResponsiveContainer>
      </WrapperStyled>
    </div>
  )
}

const SelectWrapperStyled = styled.div`
  .select-wrapper {
    min-width: 250px;
  }
`
const WrapperStyled = styled.div`
  height: 100%;
  height: 456px;

  .recharts-cartesian-axis-ticks {
    color: #888888;
    font-size: 11px;
  }
  .recharts-legend-wrapper {
    bottom: 5px !important;
    left: 20px !important;
    .recharts-legend-item-text {
      color: #888888;
      font-size: 11px;
    }
  }
`
