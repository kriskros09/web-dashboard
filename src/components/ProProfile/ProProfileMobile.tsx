import React, { FC, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../shared/Button'

import { Meta } from './Meta'
import { Bio } from './Bio'
import { Services } from './Services'

type ProProfileType = {
  showPreviousComponent?: (e: React.MouseEvent<HTMLButtonElement>) => void
  pageContent?: any
}
export const ProProfileMobile: FC<ProProfileType> = ({ showPreviousComponent, pageContent }) => {
  const [tabIndex, setTabIndex] = useState<number>(0)

  return (
    <div className="flex flex-col md:hidden mobile-profile">
      <StyledMetaWrapper>
        <Meta />
      </StyledMetaWrapper>
      <div className="w-full justify-start flex px-8 py-3 text-sm font-bold text-gray-400">
        <StyledTabPill tabIndex={tabIndex} onClick={() => setTabIndex(0)}>
          <span>Disponibilité</span>
        </StyledTabPill>
        <StyledTabPill tabIndex={tabIndex} onClick={() => setTabIndex(1)}>
          <span>About me</span>
        </StyledTabPill>
      </div>
      <div className="w-full bg-primary-middle p-8">
        <StyledServiceTab>
          {tabIndex === 0 ? (
            <Services pageContent={pageContent} />
          ) : (
            <Bio pageContent={pageContent} />
          )}
        </StyledServiceTab>
        <Button
          className="bg-gray-400 text-white mt-10"
          label="Previous"
          onClick={showPreviousComponent}
        />
      </div>
    </div>
  )
}

const StyledMetaWrapper = styled.div.attrs(() => ({
  className: 'w-full bg-gray-100 px-8 py-6',
}))`
  & .img-wrapper {
    margin-right: 1.5rem;
  }
`

const StyledTabPill = styled.div.attrs(() => ({}))`
  position: relative;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    left: 0;
    bottom: -20px;
    background-color: ${(props) =>
      props.tabIndex !== 0 ? 'var(--color-primary-dark)' : 'var(--color-primary-medium)'};
  }
  &:first-of-type {
    margin-right: 2rem;
    &:after {
      background-color: ${(props) =>
        props.tabIndex === 0 ? 'var(--color-primary-dark)' : 'var(--color-primary-medium)'};
    }
  }
`

const StyledServiceTab = styled.div.attrs(() => ({
  className: 'w-full',
}))`
  & .calendar,
  & .selected-tasks {
    border-bottom: var(--color-primary-light) 1px solid;
    padding-bottom: 2rem;
  }
`
