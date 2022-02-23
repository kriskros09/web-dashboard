import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '../shared/Button'

type BannerProps = {
  // Boolean value to choose between light (or plain with a bg color) version of the banner
  light?: boolean

  // Boolean value to choose display of banner elements
  inline?: boolean

  // For when we want to pass class ex: container
  className?: string

  btnTitle?: string

  bannerTitle?: string

  link?: string
}

const Banner: FC<BannerProps> = ({ light, inline, btnTitle = '', bannerTitle = '', link = '' }) => {
  const bannerClass = cx('w-full', {
    'text-primary': light,
    'bg-primary text-white': !light,
  })

  const containerClass = cx('container md:flex text-center justify-center items-center py-12', {
    'flex-col': !inline,
  })

  const paragraphClass = cx('font-bold text-lg md:text-4xl antialiased mb-4', {
    'md:mb-0 md:mr-10': inline,
  })

  return (
    <div className={bannerClass}>
      <div className={containerClass}>
        <p className={paragraphClass}>{bannerTitle}</p>
        <Link
          className={`btn bg-white text-primary ${
            light
              ? 'hover:bg-primary hover:text-white'
              : 'hover:bg-transparent hover:text-white border border-white'
          }`}
          // onClick={(e) => console.log('Event: ', e)}
          to={link}
        >
          {btnTitle}
        </Link>
      </div>
    </div>
  )
}

export default Banner
