import React from 'react'
import { Link } from 'react-router-dom'

// import classNames from 'classnames';

type MenuItemsTypes = {
  /**
   * Label of the button
   */
  label?: string

  link: string
  /**
   * Button click action
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const MenuItem: React.FC<MenuItemsTypes> = ({ label = 'Menu item', link }) => {
  const linkClass = 'inline-block py-2 hover:text-primary hover:text-primary'

  return (
    <li className="px-2 xl:px-4 ">
      <Link className={linkClass} to={link}>
        {label}
      </Link>
    </li>
  )
}
