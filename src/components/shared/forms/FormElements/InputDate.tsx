import React, { useState } from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export const InputDate: React.FC = () => {
  const [selectedDay, SetselectedDay] = useState<any>()

  return (
    <div>
      <DayPicker onDayClick={(day) => SetselectedDay(day.toLocaleDateString())} />
      <p>{selectedDay}</p>
    </div>
  )
}
