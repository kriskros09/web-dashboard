import React, { FC, useState } from 'react'
import cx from 'classnames'
import { Range } from 'rc-slider'

import 'rc-slider/assets/index.css'

type RangeType = {
  // Select input placeholder
  placeholder?: string

  light?: boolean

  step?: number
  Defaultrange?: number[]
  Resetvalues?: number[]
  min?: number
  max?: number

  onChange?: any
}

const handle = {
  size: 20,
  border: '4px white solid',
  color: 'var(--color-primary)',
}
const rail = {
  height: 10,
  color: '#C9C9C9',
  colorLight: 'white',
}
const track = {
  color: 'var(--color-primary)',
}

export const RangeComponent: FC<RangeType> = ({
  placeholder = 'x',
  light,
  step = 1,
  Defaultrange = [],
  min = 0,
  max = 100,
  onChange,
}) => {
  const rangeValuesLabelClass = cx(
    'flex justify-between pt-2 text-sm leading-2 font-medium lg:font-semibold',
    {
      'text-primary': light,
      'text-gray-500': !light,
    },
  )

  const [Slidervalue, onSliderChange] = useState<number[]>(Defaultrange)

  const handleSliderChange = (e) => {
    onSliderChange(e)
    onChange(e)
  }

  return (
    <div className="mb-8">
      <Range
        allowCross={false}
        defaultValue={Defaultrange}
        handleStyle={[
          {
            width: handle.size,
            height: handle.size,
            backgroundColor: handle.color,
            border: handle.border,
          },
          {
            width: handle.size,
            height: handle.size,
            backgroundColor: handle.color,
            border: handle.border,
          },
        ]}
        max={max}
        min={min}
        railStyle={{ height: rail.height, backgroundColor: light ? rail.colorLight : rail.color }}
        step={step}
        trackStyle={[
          { height: rail.height, backgroundColor: track.color },
          { height: rail.height, backgroundColor: track.color },
        ]}
        value={Slidervalue}
        onChange={(e) => handleSliderChange(e)}
      />
      <div className={rangeValuesLabelClass}>
        <span>
          {Slidervalue[0]}
          {placeholder}
        </span>
        <span>
          {Slidervalue[1]}
          {placeholder}
        </span>
      </div>
    </div>
  )
}
