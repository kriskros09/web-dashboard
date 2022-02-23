import React, { FC } from 'react'
import cx from 'classnames'
import { ToastContainer } from 'react-toastify'

type ContainerProps = {
  center: boolean
}

const Container: FC<ContainerProps> = (props) => {
  const containerClass = cx('w-full h-full', {
    'mx-auto': props.center,
  })

  return (
    <>
      <ToastContainer />
      <div className={containerClass}>{props.children}</div>
    </>
  )
}

export default Container
