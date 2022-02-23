import React, { FC } from 'react'
import styled from 'styled-components'

import ProImage from '../../../../assets/img/goodowl-user-placeholder.jpg'

type PropicType = {
  className?: string
  photo?: string
}
export const ProfilePicture: FC<PropicType> = ({ className = '', photo }) => {
  return (
    <ImageWrapper className="overflow-hidden img-wrapper">
      <img alt="" className={className} src={photo === '' || !photo ? ProImage : photo} />
    </ImageWrapper>
  )
}

const ImageWrapper = styled.div`
  @media (max-width: 767px) {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 2.75rem;
    position: relative;
    img {
      height: 2.75rem;
      width: auto;
      max-width: unset;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);

    }
  }
  .mobile-profile &, .side-profile & {
    @media (max-width: 1279px){
      width: 5rem;
      height: 5rem;
    }
      width: 7rem;
      height: 7rem;
      border-radius: 1rem;
      position: relative;
    img {
      @media (max-width: 1279px){
        height: 5rem;
      }
      height: 7rem;
      width: auto;
      max-width: unset;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);      
    }
  }

  .orderSummary-profile &{
    @media (max-width: 1279px){
      width: 7rem;
      height: 7rem;
    }
      width: 8rem;
      height: 8rem;
      border-radius: 1rem;
      position: relative;
    img {
      @media (max-width: 1279px){
        height: 7rem;
      }
      height: 8rem;
      width: auto;
      max-width: unset;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);      
    }
  }  }
`
