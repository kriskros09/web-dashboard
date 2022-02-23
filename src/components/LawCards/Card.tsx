import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { IconMap, ArrowRight, AddIcon } from '../shared/Icons'

type CardProps = {
  /**
   * Title of the card
   */
  label: string

  sublaws?: any
  /**
   * Name of the card icon
   */
  icon: string

  path?: string

  /**
   * Array for sublaw
   */
  //   details: string[];
}

export const Card: React.FC<CardProps> = ({
  label = 'Card label',
  sublaws = [''],
  icon = 'lawIcon1',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  path = '',
  //details = ['sublaw 1', 'sublaw 2', 'sublaw 3']
}) => {
  const iconKey = { icon }.icon
  const Icon: React.FC<{ fillColour: string; size: string }> = IconMap[iconKey]

  const [collapse, setcollapse] = useState<boolean>(false)

  const collapsed = collapse ? false : true

  return (
    <CardStyled collapse={collapsed} data-collapse={`${collapsed}`}>
      <CardWrapperStyled onClick={() => setcollapse(!collapse)}>
        <div className="card-header flex justify-between md:justify-center items-center md:text-center pl-2 pr-4 md:p-0">
          <div className="flex flex-row md:flex-col items-center">
            <div className="icon-wrapper w-16 md:w-24 md:bg-gray-100 md:rounded-full mr-2 md:p-2 md:mb-5">
              <Icon fillColour="current" size="100%" />
            </div>
            <h4 className="antialiased">{label}</h4>
          </div>
          <span className="carret md:hidden">
            <ArrowRight fillColour="current" size={20} />
          </span>
        </div>
        <div className="card-body md:absolute md:top-0 md:left-0 rounded-b rounded-t-none md:rounded md:invisible group-hover:visible md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-150 delay-75 ease-in-out bg-primary w-full overflow-hidden md:h-full md:m-0 md:p-6">
          <h4 className="text-white font-semibold antialiased pb-3 hidden md:block">{label}</h4>
          <ul className="font-semibold text-white md:list-disc md:ml-4">
            {sublaws?.slice(0, 3).map((sublaw) => (
              <li
                key={sublaw?.sectId}
                className="py-3 px-5 md:p-0 border-t md:border-0 border-primary-light border-solid "
              >
                <Link className="hover:text-primary-light text-xs md:text-sm " to="/find-lawyer">
                  {sublaw?.texts[0].name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="hidden md:block bg-white rounded-full w-8 h-8 p-1/2 absolute bottom-0 right-0 mr-5 mb-2"
            to="/right-law"
          >
            <AddIcon fillColour="primary" size={28} />
          </Link>
        </div>
      </CardWrapperStyled>
    </CardStyled>
  )
}

const CardWrapperStyled = styled.div.attrs(() => ({
  className: 'card-wrapper relative rounded w-full md:h-full md:p-10',
}))`
  background-color: white;
  height: 300px;
`

const CardStyled = styled.div.attrs(() => ({
  className: 'card group w-full md:w-1/2 lg:w-1/3 xxl:w-1/4 md:px-2 py-2 cursor-pointer',
}))<{
  'data-collapse': string
  collapse: boolean
}>`
  & .card-wrapper {
    & .card-header h4 {
      color: var(--color-primary-dark);
    }
    & .icon-wrapper svg {
      color: var(--color-primary-dark);
    }
    @media screen and (max-width: 767px) {
      background-color: ${(props) => (props.collapse ? 'white' : 'var(--color-primary)')};
      height: unset;

      & .card-body {
        height: ${(props) => (props.collapse ? '0px' : 'auto')};
        max-height: ${(props) => (props.collapse ? '0px' : '100vh')};
        transition: max-height ease-out 0.2s;
      }
      & .card-header h4 {
        color: ${(props) => (props.collapse ? 'var(--color-primary-dark)' : 'white')};
      }
      & .icon-wrapper svg {
        color: ${(props) => (props.collapse ? 'var(--color-primary-dark)' : 'white')};
      }
      & .carret svg {
        color: ${(props) => (props.collapse ? 'var(--color-primary)' : 'white')};
        transform: ${(props) => (props.collapse ? 'none' : 'rotate(90deg)')};
        transition: transform ease-in-out 0.2s;
      }
    }
  }
`
