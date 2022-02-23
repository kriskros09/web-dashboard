import React from 'react'
import cx from 'classnames'

type InputSubmitType = {
  value: string
  className?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

export const InputSubmit: React.FC<InputSubmitType> = ({
  value = 'submit',
  className,
  disabled,
  onClick,
}) => {
  const btnClass = cx('btn', className, { 'opacity-50 cursor-not-allowed': disabled })

  return (
    <input className={btnClass} disabled={disabled} type="submit" value={value} onClick={onClick} />
  )
}
