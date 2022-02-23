import React, { FC } from 'react'
import styled from 'styled-components'

import { Check } from '../shared/Icons'

type HeroType = {
  currentStep: number
  pageContent?: any
}

export const CheckoutHero: FC<HeroType> = ({ currentStep = 0, pageContent }) => {
  // console.log('current step', currentStep)

  const steps = {
    title1: pageContent?.text_1,
    title2: pageContent?.text_2,
    title3: pageContent?.text_3,
    title4: pageContent?.text_4,
    title5: pageContent?.text_5,
  }

  return (
    <div className="mt-16 mb-9">
      <h1 className="text-primary text-center mb-8 md:text-6xl">{pageContent?.main_title}</h1>

      <div className="container w-full text-center flex flex-row justify-center lg:justify-center">
        {Object.keys(steps).map((key, index) => (
          <StepStyled key={key}>
            <div
              className={`flex flex-col items-center block lg:w-40 ${
                index === 0 ? 'ml-4' : 'lg:ml-0'
              }`}
            >
              <StepCountStyled
                state={`${
                  index < currentStep ? 'validated' : index === currentStep ? 'active' : null
                }`}
              >
                <span
                  className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-md lg:text-4xl font-bold antialiased ${
                    index === currentStep ? 'text-white' : 'text-primary-light'
                  }`}
                >
                  {index < currentStep ? <Check fillColour="white" size={36} /> : index + 1}
                </span>
              </StepCountStyled>
              <div className="decription text-left lg:text-center flex-shrink hidden lg:block">
                <h5 className="text-lg leading-3 uppercase text-primary font-bold antialiased mb-2 lg:mb-4">
                  {steps[key]}
                </h5>
              </div>
            </div>
          </StepStyled>
        ))}
      </div>
    </div>
  )
}

const StepCountStyled = styled.div.attrs({
  className:
    'step-count mx-auto relative border-2 lg:border-10 border-solid rounded-full w-10 lg:w-22 h-10 lg:h-22 lg:mb-8 mr-4 lg:mr-auto flex-shrink-0',
})<{ state: string }>`
  border-color: ${(props) =>
    props.state === 'active' || props.state === 'validated'
      ? 'var(--color-primary)'
      : 'var(--color-primary-light)'};
  background-color: ${(props) =>
    props.state === 'active' || props.state === 'validated' ? 'var(--color-primary)' : 'unset'};

  & span svg {
    @media (max-width: 1024px) {
      width: 18px;
      height: 18px;
    }
  }
  &:before,
  &:after {
    @media (min-width: 1024px) {
      content: '';
      background-color: var(--color-primary-light);
      position: absolute;
      width: 70px;
      height: 10px;
      top: 50%;
      bottom: unset;
      transform: translateY(-50%);
    }
  }
  &:after {
    left: 78px;
    background-color: ${(props) =>
      props.state === 'validated' ? 'var(--color-primary)' : 'var(--color-primary-light)'};
  }
  &:before {
    left: -79px;
    top: 50%;
    background-color: ${(props) =>
      props.state === 'active' || props.state === 'validated'
        ? 'var(--color-primary)'
        : 'var(--color-primary-light)'};
  }
`

const StepStyled = styled.div.attrs({
  className: 'flex flex-row justify-center mb-0 md:mx-2 lg:mx-4 xl:mx-8',
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
