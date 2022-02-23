import React, { FC } from 'react'

import { Button } from '../../Button'
import { InputSubmit } from '../../forms/FormElements/Submit'

type ButtonsType = {
  label?: any
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void

  ButtonAsSubmit?: boolean
}
export const FilterButtons: FC<ButtonsType> = ({ label, onCancel, onSubmit, ButtonAsSubmit }) => {
  return (
    <div className="mt-8 hidden lg:flex">
      <Button
        className="text-gray-400 border border-gray-200 btn-sm mr-5"
        label={label?.btn_cancel}
        onClick={onCancel}
      />
      {ButtonAsSubmit ? (
        <InputSubmit className="text-white bg-primary btn-sm" value={label?.btn_apply} />
      ) : (
        <Button
          className="text-white bg-primary btn-sm"
          label={label?.btn_apply}
          onClick={onSubmit}
        />
      )}
    </div>
  )
}
