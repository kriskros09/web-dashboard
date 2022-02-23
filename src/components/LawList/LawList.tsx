import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { IconMap } from '../shared/Icons'
import { ArrowRight } from '../shared/Icons'

type LawListType = {
  icon: string
  label: string
  sublaws?: any
  id?: string
}

const LawList: FC<LawListType> = ({ icon = 'lawIcon1', label = 'Loi', sublaws = [''], id }) => {
  const iconKey = { icon }.icon
  const Icon: React.FC<{ fillColour: string; size: number }> = IconMap[iconKey]

  return (
    <div
      className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 sm:px-0 sm:pb-10 md:pb-20 md:pr-5 md:pl-5 lg:pl-10 xl:pl-5 pt-14 pb-16"
      id={id}
    >
      <div className="icon-wrapper w-16 h-16 w-28 h-28 bg-gray-100 rounded-full mr-2 p-2 mb-5">
        <Icon fillColour="primary-dark" size={88} />
      </div>
      <h4 className="text-primary-dark antialiased pl-1 pb-3">{label}</h4>
      <ul>
        {sublaws.map((sublaw) => (
          <li key={sublaw.sectId} className="flex items-center pb-1">
            <Link
              className="flex items-start text-sm md:text-base text-primary-dark font-medium hover:text-primary-middle"
              to="/find-lawyer"
            >
              <span className="flex-shrink-0 mt-1">
                <ArrowRight fillColour="primary" size={16} />
              </span>

              <span className="flex-shrink">{sublaw.texts[0].name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LawList
