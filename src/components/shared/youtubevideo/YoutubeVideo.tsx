import React, { FC } from 'react'
import styled from 'styled-components'

type YoutubeTypes = {
  // Select input placeholder
  videoSrc: string

  autoPlay?: string

  videoId?: string

  frameborder?: string

  width?: string

  height?: string
}

const VidContainer = styled.div.attrs(() => ({
  classNames: '',
}))`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const YoutubeVideo: FC<YoutubeTypes> = ({ videoSrc, width, height, frameborder }) => {
  return (
    <VidContainer>
      <iframe
        className="player"
        frameBorder={frameborder}
        height={height}
        src={videoSrc}
        title="undefined"
        width={width}
      />
    </VidContainer>
  )
}
