import React from 'react'
import styled from 'styled-components'

type StepType = {
  idx?: number
  stepText?: string
  stepTitle?: string
}

const StepCountStyled = styled.div.attrs({
  className:
    'step-count relative border-10 border-solid border-primary-light rounded-full w-22 h-22 lg:mb-8 mr-4 lg:mx-auto flex-shrink-0',
})`
  &:before,
  &:after {
    content: '';
    background-color: var(--color-primary-light);
    position: absolute;
    height: 40px;
    width: 10px;
    left: 50%;
    transform: translateX(-50%);
    @media screen and (min-width: 1024px) {
      width: 70px;
      height: 10px;
      top: 50%;
      bottom: unset;
      transform: translateY(-50%);
    }
  }
  &:after {
    bottom: -45px;
    @media screen and (min-width: 1024px) {
      left: 78px;
    }
  }
  &:before {
    top: -45px;
    @media screen and (min-width: 1024px) {
      left: -79px;
      top: 50%;
    }
  }
`

const StepStyled = styled.div.attrs({
  className: 'md:flex md:flex-row justify-center mb-8 lg:mb-0 md:mx-2 lg:mx-4 xl:mx-8',
})`
  &:first-of-type {
    .step-count:before {
      content: none;
    }
  }
  &:last-of-type {
    .step-count:after {
      content: none;
    }
  }
`

export const Step: React.FC<StepType> = ({ idx = 0, stepText = 'text', stepTitle = 'title' }) => {
  return (
    <StepStyled>
      <div className="flex items-center justify-start lg:justify-stretch lg:block w-full lg:w-40">
        <StepCountStyled>
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-primary text-4xl font-bold antialiased">
            {idx}
          </span>
        </StepCountStyled>
        <div className="decription text-left lg:text-center flex-shrink">
          <h5 className="text-lg leading-3 uppercase text-primary font-bold antialiased mb-2 lg:mb-4">
            {stepTitle}
          </h5>
          <p className="text-primary">{stepText}</p>
        </div>
      </div>
    </StepStyled>
  )
}
