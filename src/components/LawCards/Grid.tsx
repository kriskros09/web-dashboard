import React from 'react'

// Store
import { useStore } from '../../store/models'

//Components
import { Card } from './Card'

type CardProps = {
  /**
   * Title of the card
   */
  label: string

  /**
   * Name of the card icon
   */
  icon: string

  /**
   * Array for sublaw
   */
  //   details: string[];
}

// Cards grid
export const Grid: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')

  return (
    <div className="container md:mb-12">
      <div className="w-full md:w-10/12 md:px-10 mx-auto">
        <div className="flex flex-wrap md:-mx-2">
          {globalState?.laws.map((law) => (
            <Card
              key={law.lawId}
              icon={law.lawId}
              label={law.texts[0].name}
              sublaws={law?.sectors}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
