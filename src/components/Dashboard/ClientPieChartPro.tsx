import React, { useState } from 'react'
import { PieChart, Pie, Cell, Legend } from 'recharts'
import styled from 'styled-components'

// Store
import { useStore } from '../../store/models'
// Components
import { SelectComponent } from '../shared/forms/FormElements/Select'

type ClientChartTypes = {
  textContent: any
}
const colors = ['#4298b5', '#DDDDDD']

const renderCustomizedLabel = (total) => {
  return (
    <>
      <text
        className="chart-title absolute top-0"
        // dominantBaseline="central"
        fill="#003057"
        textAnchor="middle"
        x={100}
        y={165}
      >
        Total
      </text>
      <text
        className="chart-label font-bold text-2xl"
        dominantBaseline="central"
        fill="#003057"
        textAnchor="middle"
        x={100}
        y={180}
      >
        {total}
      </text>
    </>
  )
}

export const ClientPieChartPro: React.FC<ClientChartTypes> = ({ textContent = '' }) => {
  const [userState] = useStore('User')
  const [dashboardState, dashboardActions] = useStore('Dashboard')
  const isPro = userState.session?.decodedToken.permissions.includes('profDashboard')
  const { proId } = userState
  const { firmId } = userState
  const [Period, setperiod] = useState<number>(0)

  React.useEffect(() => {
    ;(async () => {
      if (proId && isPro) {
        await dashboardActions.ProClientsData({
          proId,
          firmId,
          scope: Period,
        })
      }
    })()
  }, [Period])

  const data = [
    { name: 'New Clients', value: dashboardState?.dashboard_clients_pro?.new },
    { name: 'Returning Client', value: dashboardState?.dashboard_clients_pro?.returning },
  ]

  const errors = { nodata: "Vous n'avez pas de nouveaux clients pour le moment" }

  const ViewOptions = [
    //{ value: 0, label: textContent.clients_dropdown_4 }, //last year
    { value: 0, label: textContent.clients_dropdown_3 },
    { value: 1, label: textContent.clients_dropdown_2 },
    { value: 2, label: '30 jours' },
    { value: 3, label: textContent.clients_dropdown_1 },
  ]

  return (
    <div className="bg-white py-4 px-5 module w-full">
      <div className="">
        <p className="text-primary pb-5 font-medium text-md">{textContent.clients_title}</p>
        <SelectWrapperStyled>
          <SelectComponent
            icon="calendar"
            options={ViewOptions}
            placeholder="View"
            value={ViewOptions.find((option) => option.value === Period)}
            outline
            onChange={(e) => setperiod(e.value)}
          />
        </SelectWrapperStyled>
      </div>
      <WrapperStyled>
        {dashboardState?.dashboard_clients_pro?.new ||
        dashboardState?.dashboard_clients_pro?.returning !== 0 ? (
          <PieChart height={400} width={200}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              isAnimationActive={false}
              label={renderCustomizedLabel(dashboardState?.dashboard_clients_pro?.total)}
              legendType="circle"
              outerRadius={80}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Legend
              payload={data.map((client, index) => ({
                id: client.name,
                type: 'circle',
                color: colors[index % colors.length],
                value: `${client.name} ${client.value}`,
              }))}
            />
          </PieChart>
        ) : (
          <p className="pt-5 text-sm text-gray-400 font-medium">{errors.nodata}</p>
        )}
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
  .recharts-wrapper {
    margin: 0 auto;
  }
  .recharts-pie-label-line {
    display: none;
  }

  .recharts-legend-wrapper {
    .recharts-default-legend {
      text-align: left !important;
    }
  }
`
