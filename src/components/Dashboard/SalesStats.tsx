import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SystemIconMap, ForwardIcon } from '../shared/Icons'

type SalesStatsTypes = {
  title: string

  stat: string | number | undefined
  percentage: string | number | undefined
  icon: string
}

export const SalesStats: React.FC<SalesStatsTypes> = ({
  title = '',
  stat = '',
  // percentage = '',
  icon = '',
}) => {
  const iconKey = { icon }.icon
  const Icon: React.FC<{ fillColour: string; size: string }> = SystemIconMap[iconKey]

  return (
    <div className="bg-white py-4 px-5 module">
      <div className="flex items-center">
        <div className="w-1/2 flex flex-col justify-between">
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <div className="">
            <p className="text-primary-dark text-4xl font-bold">{stat}</p>
            {/* <div className="text-primary text-xxs font-semibold flex">
              <span className="transform -rotate-90">
                <ForwardIcon fillColour="primary" size={10} />
              </span>
              <span>{percentage}</span>
            </div> */}
          </div>
        </div>
        <div className="w-1/2" />
        <div className="icon-wrapper w-16 md:w-24 md:bg-gray-100 md:rounded-full p-2">
          <Icon fillColour="primary" size="100%" />
        </div>
      </div>
    </div>
  )
}
