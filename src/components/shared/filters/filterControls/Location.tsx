import React, { FC } from 'react'
import styled from 'styled-components'

import { SelectComponent } from '../../forms/FormElements/Select'
import { InputComponent } from '../../forms/FormElements/Input'
import UseCheckScreen from '../../../../hooks/ResponsiveDetection'

import { FilterType } from './filter'
import { FilterLabel } from './FilterLabel'
import { FilterButtons } from './FilterButtons'

const dataKm = [
  { value: 10, label: '10km' },
  { value: 20, label: '20km' },
  { value: 30, label: '30km' },
  { value: 40, label: '40km' },
  { value: 50, label: '50km' },
  { value: 60, label: '60km' },
  { value: 70, label: '70km' },
]
export const Location: FC<FilterType> = ({
  label = 'filter name',
  light,
  content,
  getFilterData,
  resetFilter,
}) => {
  const Screen = UseCheckScreen()

  const onSubmit = (e) => {
    console.log('submit location')
    e.preventDefault()
    getFilterData(e)
  }

  return Screen === 'desktop' || Screen === 'desktop-xl' ? (
    <form onSubmit={(e) => onSubmit(e)}>
      <FilterLabel label={label} light={light} />
      <p className={` text-sm font-semibold py-3 ${light ? 'text-primary' : 'text-gray-500'}`}>
        {content?.location_text}
      </p>
      <StyledRow className="flex">
        <SelectComponent
          name="km"
          options={dataKm}
          placeholder={content?.location_input_1}
          dropdown
          outline
        />
        <InputComponent
          id="zipCode"
          label={content?.location_input_2}
          name="zipCode"
          pattern="^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[- ]{0,1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}"
          placeholder={content?.location_input_2}
          solid={light}
          type="text"
          required
        />
      </StyledRow>
      <FilterButtons label={content} ButtonAsSubmit onCancel={(e) => resetFilter(e)} />
    </form>
  ) : (
    <div>
      <FilterLabel label={label} light={light} />
      <p className={` text-sm font-semibold py-3 ${light ? 'text-primary' : 'text-gray-500'}`}>
        {content?.location_text}
      </p>
      <StyledRow className="flex">
        <SelectComponent
          name="km"
          options={dataKm}
          placeholder={content?.location_input_1}
          dropdown
          outline
        />
        <InputComponent
          id="zipCode"
          label={content?.location_input_2}
          name="zipCode"
          pattern="^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}[- ]{0,1}[0-9]{1}[a-zA-Z]{1}[0-9]{1}"
          placeholder={content?.location_input_2}
          solid={light}
          type="text"
        />
      </StyledRow>
      <FilterButtons label={content} ButtonAsSubmit onCancel={(e) => resetFilter(e)} />
    </div>
  )
}

const StyledRow = styled.div`
  .select-wrapper + .input-wrapper {
    margin-top: 0;
  }
`
