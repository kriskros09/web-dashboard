import React, { FC, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Store
import { useStore } from '../../store/models'
import { Menu } from '../shared/nav/Menu'
import { Logo } from '../../components/shared/Icons'

import { MenuItem } from './nav/MenuItems'

type headerContent = {
  pageContent?: any
}

export const Header: FC<headerContent> = ({ pageContent }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userState, userActions] = useStore('User')
  const [scrolling, setScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const el = useRef<HTMLElement>(null)
  const setSticky = scrolling ? 'fixed' : ''
  const isLoggedIn = userState?.userId && userState?.userId !== '' && userState?.session?.token

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop)
      setScrolling(e.target.documentElement.scrollTop)
    }
    window.addEventListener('scroll', onScroll)

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [scrollTop, scrolling])

  return (
    <HeaderNav ref={el} className={`w-full z-30 top-0 py-5 bg-white ${setSticky}`} id="header">
      <div className="w-full container flex items-center justify-between">
        <label
          className="cursor-pointer lg:hidden block order-3 flex-shrink-0"
          htmlFor="menu-toggle"
        >
          <Menu pageContent={pageContent} />
        </label>
        <input className="hidden" id="menu-toggle" type="checkbox" />

        <div className="order-2 md:order-1 w-full flex-shrink w-full md:w-32 lg:w-full">
          <Link
            className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl w-full"
            to="/"
          >
            <Logo />
          </Link>
        </div>

        <div
          className="hidden lg:flex md:items-center md:w-auto w-full order-2 md:order-2 flex-shrink-0"
          id="menu"
        >
          <nav className="flex">
            <ul className="md:flex items-center justify-between text-xs xl:text-sm leading-1 uppercase font-semibold text-primary-dark pt-4 md:pt-0 -mx-4">
              <MenuItem label={pageContent?.top_menu.menu_text_1} link="/right-law" />
              <MenuItem label={pageContent?.top_menu.menu_text_2} link="/find-lawyer" />
              <MenuItem label={pageContent?.top_menu.menu_text_3} link="/faq" />
              <MenuItem label={pageContent?.top_menu.menu_text_4} link="/contact" />
              {!isLoggedIn ? (
                <>
                  <MenuItem label={pageContent?.top_menu.menu_text_5} link="/login" />
                  <MenuItem label={pageContent?.top_menu.menu_text_6} link="/signup" />
                </>
              ) : (
                <li>
                  <Link
                    to="/profile"
                    // onClick={() => userActions.logOutUser({ userId: userState.userId })}
                  >
                    {pageContent?.top_menu.menu_text_7} {userState?.firstName} {userState?.lastName}
                    {/* {pageContent?.top_menu.menu_text_10} */}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </HeaderNav>
  )
}

const HeaderNav = styled.nav`
  &.fixed {
    box-shadow: 0px 1px 10px #999;
    background-color: white;

    nav {
      top: 78px;
    }
  }
`
