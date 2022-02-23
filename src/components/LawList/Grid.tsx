import React, { FC } from 'react'

// Store
import { useStore } from '../../store/models'

import LawList from './LawList'

// import LawList
const Grid: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')

  return (
    <div className="container sm:pb-10 pt-16 md:pb-22">
      <div className="flex flex-wrap">
        {globalState?.laws.map((law) => (
          <LawList
            key={law.lawId}
            icon={law.lawId}
            id={law.lawId}
            label={law.texts[0].name}
            sublaws={law?.sectors}
          />
        ))}
      </div>
    </div>
  )
}

export default Grid
