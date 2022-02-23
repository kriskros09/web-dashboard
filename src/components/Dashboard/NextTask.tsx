import React, { useState } from 'react'
import styled from 'styled-components'

import { ArrowRight } from '../shared/Icons'

type NextTaskTypes = {
  tasks: any
  title: string
  empty: string
}

export const NextTask: React.FC<NextTaskTypes> = ({
  tasks,
  title = 'Next task',
  empty = 'No Tasks',
}) => {
  const [ShowTask, setShowTask] = useState<number>(0)

  const tasksTotal = tasks?.length

  return (
    <ModuleStyled className="bg-white module">
      <div className="flex items-center justify-between py-4 px-5">
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <div>
          <button
            className="transform rotate-180"
            disabled={tasksTotal === 0}
            onClick={() => setShowTask(ShowTask > 0 ? ShowTask - 1 : tasksTotal - 1)}
          >
            <ArrowRight fillColour="gray-150" size={20} />
          </button>
          <button
            disabled={tasksTotal === 0}
            onClick={() => setShowTask(ShowTask === tasksTotal - 1 ? 0 : ShowTask + 1)}
          >
            <ArrowRight fillColour="gray-150" size={20} />
          </button>
        </div>
      </div>
      <div className="h-full relative  -my-4">
        {ShowTask ? ShowTask : <span className=" py-4 px-5 text-xs text-gray-300">{empty}</span>}
        {tasks?.map((task, index) => (
          <div
            key={task.taskId}
            className={`w-full h-full absolute top-0 left-0 ${
              ShowTask === index ? 'block' : 'hidden'
            }`}
          >
            <div className="bg-white py-4 px-5">
              <p className="font-bold text-primary-dark">{task.name}</p>
              <p className="text-sm text-primary-dark">
                {task.userFirstName} {task.userLastName} - {task.appointDate}
              </p>
              <p className="text-sm text-primary">{task.userEmail}</p>
            </div>
          </div>
        ))}
      </div>
    </ModuleStyled>
  )
}

const ModuleStyled = styled.div`
  min-height: 160px;
`
