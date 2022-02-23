import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  visibility: string
}
const StyledFilterControlWrapper = styled.div.attrs((props) => ({
  className: `${props.className}`,
}))`
  z-index: 1;
  & .input-wrapper .input {
    border-color: #dddddd;
    padding: 0.6rem 0.6875rem;
    &::placeholder {
      color: #777777;
      font-weight: 600;
    }
  }
  .flex {
    & .select-wrapper {
      flex-basis: 50%;
      &:first-of-type {
        margin-right: 0.625rem;
      }
      &:nth-of-type(2) {
        margin-left: 0.625rem;
      }
    }
  }
  & .select-container .select__control {
    border-color: #dddddd;
    padding: 0.55rem 0.6875rem;
    line-height: 1.125rem;

    & .select__placeholder {
      color: #777777;
      font-weight: 600;
    }
  }
`
export const FilterControlWrapper: FC<Props> = ({ children, visibility = 'some classe' }) => {
  return (
    <StyledFilterControlWrapper
      className={`lg:absolute lg:transform lg:translate-y-full lg:bottom-neg20 lg:bg-white lg:shadow-xl lg:rounded lg:p-8 lg:${visibility}`}
    >
      {children}
    </StyledFilterControlWrapper>
  )
}
