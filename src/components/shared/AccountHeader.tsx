import React, { FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Store
import { useStore } from '../../store/models'
import UserPic from '../../assets/img/owl-goodowl-mobile.jpg'

import { Logo, ArrowDown, ArrowRight, Bell } from './Icons'
import { Menu } from './account-nav/Menu'

export const Header: FC<{ pageContent?: any }> = ({ pageContent }) => {
  const [userState, userActions] = useStore('User')
  const isLoggedIn = userState?.userId && userState?.userId !== '' && userState?.session?.token
  const el = useRef<HTMLUListElement>(null)

  const [dropdownVisibility, SetDropdownVisibility] = useState<number>(0)

  const handleClick = (e: MouseEvent) => {
    if ((el.current as any).contains(e.target)) {
      // inside click
      return
    }
    // outside click
    SetDropdownVisibility(0)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return (
    <HeaderNav className="w-full z-30 top-0 py-5 shadow-sm bg-white" id="header">
      <div className="mx-6 md:mx-8 flex items-center justify-between">
        <label
          className="cursor-pointer 3xl:hidden block order-3 flex-shrink-0"
          htmlFor="menu-toggle"
        >
          <Menu menuContent={pageContent?.side_menu} />
        </label>
        <input className="hidden" id="menu-toggle" type="checkbox" />

        <div className="order-2 md:order-1 w-full flex-shrink">
          <Link
            className="inline-block tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
            to="/"
          >
            <Logo />
          </Link>
        </div>

        <div
          className="flex justify-end md:items-center md:w-auto w-full order-2 md:order-2 md:flex-shrink-0"
          id="menu"
        >
          <nav className="flex mr-8 3xl:mr-0">
            <ul
              ref={el}
              className="flex items-center justify-between text-xs lg:text-sm leading-1 text-primary-dark pt-4 md:pt-0"
            >
              <li className="pr-4 border-gray-100 md:border-r cursor-pointer relative">
                <span
                  className="block"
                  onClick={() => SetDropdownVisibility(dropdownVisibility === 1 ? 0 : 1)}
                >
                  <Bell fillColour="gray-300" size={24} />
                </span>
                <div
                  className={`absolute right-0 mt-16 -mr-8 z-20 ${
                    dropdownVisibility === 1 ? 'block' : 'hidden'
                  }`}
                >
                  <StyledDropdown>
                    <p className="text-md mb-5"> Notifications</p>
                    <ul>
                      <li className="py-2 border-b border-gray-100 flex items-center">
                        <span>Vous avez une notification</span>
                        <ArrowRight fillColour="gray-300" size={20} />
                      </li>
                      <li className="py-2 border-b border-gray-100 flex items-center">
                        <span>Vous avez une notification</span>
                        <ArrowRight fillColour="gray-300" size={20} />
                      </li>
                      <li className="py-2 border-b border-gray-100 flex items-center">
                        <span>Vous avez une notification</span>
                        <ArrowRight fillColour="gray-300" size={20} />
                      </li>
                      <li className="py-2 border-b border-gray-100 flex items-center">
                        <span>Vous avez une notification</span>
                        <ArrowRight fillColour="gray-300" size={20} />
                      </li>
                    </ul>
                  </StyledDropdown>
                </div>
              </li>
              <li className="hidden md:inline  pl-4 relative">
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => SetDropdownVisibility(dropdownVisibility === 2 ? 0 : 2)}
                >
                  <span className="block mr-2">
                    {userState?.firstName} {userState?.lastName}
                  </span>
                  <ArrowDown fillColour="gray-300" size={20} />
                </span>
                <div
                  className={`absolute right-0 mt-16 -mr-8 z-20 ${
                    dropdownVisibility === 2 ? 'block' : 'hidden'
                  }`}
                >
                  <StyledDropdown>
                    <ul>
                      <li className="py-2 border-b border-gray-100 flex items-center">
                        Status : Online
                      </li>
                      {isLoggedIn ? (
                        <li>
                          <Link
                            className="py-2 border-b border-gray-100 flex items-center"
                            to="/"
                            onClick={() => userActions.logOutUser({ userId: userState.userId })}
                          >
                            Logout
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </StyledDropdown>
                </div>
              </li>
              <li className="hidden md:inline pl-3">
                <ImageWrapper className="overflow-hidden img-wrapper">
                  <img
                    alt=""
                    src={
                      userState?.professionalPicture === '' || !userState?.professionalPicture
                        ? UserPic
                        : userState?.professionalPicture
                    }
                  />
                </ImageWrapper>
              </li>
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

const StyledDropdown = styled.div.attrs(() => ({
  className: 'bg-white shadow-sm p-8',
}))`
  min-width: 400px;

  &:before {
    content: '';
    width: 40px;
    height: 40px;
    background-color: white;
    transform: rotate(45deg);
    position: absolute;
    top: -10px;
    right: 50px;
  }
`

const ImageWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  position: relative;
  img {
    height: 2.5rem;
    width: auto;
    max-width: unset;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`
