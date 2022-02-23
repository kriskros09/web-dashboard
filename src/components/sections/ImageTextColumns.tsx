import React, { FC } from 'react'
import cx from 'classnames'
import ReactHtmlParser from 'react-html-parser'

// images
import Background from '../../assets/img/handshaking_goodowl.jpg'

type ImageTextColumnsProps = {
  // Bolean values to define section style displayHalfRounded or displayFullRounded (default sttyle is no radius in image)

  displayHalfRounded?: boolean

  displayFullRounded?: boolean

  style?: React.CSSProperties

  title?: string

  content?: string
}

export const ImageTextColumns: FC<ImageTextColumnsProps> = ({
  displayHalfRounded,
  displayFullRounded,
  title = 'title',
  content = 'content',
}) => {
  const imageContainerClass = cx('bg-cover bg-no-repeat w-full', {
    'h-1/2vh lg:h-full': !displayHalfRounded && !displayFullRounded,
    'h-1/2vh lg:h-full rounded-br-large': displayHalfRounded && !displayFullRounded,
    'h-1/2vh lg:h-full rounded-smaller': !displayHalfRounded && displayFullRounded,
  })
  const containerClass = cx({
    container: !displayHalfRounded && displayFullRounded,
  })

  const rowClass = cx('flex flex-col', {
    'lg:flex-row-reverse': !displayFullRounded && !displayHalfRounded,
    'flex-col-reverse lg:flex-row-reverse': displayHalfRounded,
    'flex-col-reverse lg:flex-row': displayFullRounded,
  })

  const imageColumnClass = cx('w-full lg:w-1/2', {
    'lg:w-1/2 pb-16 px-8 lg:py-24': !displayHalfRounded && displayFullRounded,
  })

  return (
    <section className={containerClass}>
      <div className={rowClass}>
        <div className="w-full lg:w-1/2 pt-12 pb-16 px-8 md:p-24 text-center md:text-left">
          <h2 className="text-primary mb-6">{title}</h2>
          <div className="text-primary-dark lg:max-w-xl">
            <p className="text-sm md:text-lg lg:max-w-xl parsed-text">{ReactHtmlParser(content)}</p>
          </div>
        </div>
        <div className={imageColumnClass}>
          <div
            className={imageContainerClass}
            style={{
              backgroundImage: `url(${Background})`,
            }}
          />
        </div>
      </div>
    </section>
  )
}
