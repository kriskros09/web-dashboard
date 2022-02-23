import React, { FC } from 'react'
import cx from 'classnames'

type WrapperProps = {
  relative?: boolean
}

const Wrapper: FC<WrapperProps> = (props) => {
  const containerClass = cx('overflow-hidden', {
    relative: props.relative,
  })

  return <div className={containerClass}>{props.children}</div>
}

export default Wrapper
