/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'

import { SystemIconMap } from '../Icons'

// import classNames from 'classnames';

type MenuItemsTypes = {
  /**
   * Label of the menu item
   */
  label: string

  link: string

  icon?: string

  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const MenuItem: React.FC<MenuItemsTypes> = ({
  label = 'Menu item',
  link,
  icon = 'description',
  onClick,
}) => {
  const [ActiveItem, setActiveitem] = useState<boolean>(false)

  const linkClass = 'flex items-center text-sm text-white -mx-6 px-6 py-3 relative'

  const iconKey = { icon }.icon
  const Icon = SystemIconMap[`${iconKey}`]

  return (
    <li>
      {onClick ? (
        <Link className={linkClass} to={link} onClick={onClick}>
          <Icon fillColour="primary" size={24} />
          <span className="block ml-3">{label}</span>
        </Link>
      ) : (
        <StyledListItem activeClassName="active" className={linkClass} to={link}>
          <Icon fillColour="primary" size={24} />
          <span className="block ml-3">{label}</span>
        </StyledListItem>
      )}
    </li>
  )
}

const StyledListItem = styled(NavLink)`

  a {
    svg {
      color: #3b688d;
    }

    &:hover {
      color: var(--color-primary);
    }
  }

  }

  &.active {
    background-color: #104A6E;
    &:before {

        content:"";
        height: 100%;
        width: 4px;
        background-color: var(--color-primary);
        position: absolute;
        top:0;
        left:0;

      
    }
    a {

        font-weight: bold;

      &:hover {

          color: white;

      }
  
      svg {

          color: white;

      }

  }
`
