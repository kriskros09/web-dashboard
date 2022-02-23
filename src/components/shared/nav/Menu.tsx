import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

// Store
import { useStore } from '../../../store/models'
import { Facebook, Linkedin, Twitter } from '../../../components/shared/Icons'
import { MenuItem } from '../nav/MenuItems'

import Hamburger from './Burger'

type MenuContent = {
  pageContent?: any
}

export const Menu: FC<MenuContent> = ({ pageContent }) => {
  const [open, setOpen] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userState, userActions] = useStore('User')
  const [globalState] = useStore('Global')
  const [localeState, localeActions] = useStore('Locale')
  const { i18n } = useTranslation()

  const isLoggedIn = userState?.userId && userState?.userId !== '' && userState?.session?.token

  const langList = globalState.languages.filter(
    (lang) => lang.languageId !== 'es-ES' && lang.languageId !== localeState.language,
  )

  const handleSelection = (lang) => {
    localeActions.setLanguage({ language: lang })
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <StyledMenu open={open}>
        <PrimaryNav>
          <MenuItem label={pageContent?.top_menu.menu_text_1} link="/right-law" />
          <MenuItem label={pageContent?.top_menu.menu_text_2} link="/find-lawyer" />
          <MenuItem label={pageContent?.top_menu.menu_text_3} link="/faq" />
          <MenuItem label={pageContent?.top_menu.menu_text_4} link="/contact" />
        </PrimaryNav>
        <SecondaryNav>
          <MenuItem label={pageContent?.top_menu.menu_text_3} link="/faq" />
          {/* <MenuItem label="Dispute resolution" link="" /> */}
          {/* <MenuItem label="privacy policy" link="/privacy-policy" />
          <MenuItem label="Terms & conditions" link="/terms-conditions" /> */}
          {/* <MenuItem label="employment" link="" /> */}
          <MenuItem label={pageContent?.top_menu.menu_text_4} link="/contact" />
        </SecondaryNav>

        <UserNav>
          <ul className="login-items">
            {!isLoggedIn ? (
              <>
                <MenuItem label={pageContent?.top_menu.menu_text_5} link="/login" />
                <MenuItem label={pageContent?.top_menu.menu_text_6} link="/signup" />
              </>
            ) : (
              <li className="pl-10">
                <Link to="/profile">
                  {pageContent?.top_menu.menu_text_7} {userState?.firstName} {userState?.lastName}
                </Link>
              </li>
            )}
          </ul>
          <MenuItem label="Profile" link="/profile" />
          {langList.map((language) => (
            <LangSwitcher
              key={language.languageId}
              onClick={() => handleSelection(language.languageId)}
            >
              {language.texts[0].name}
            </LangSwitcher>
          ))}
        </UserNav>
        <div className="flex mt-5 pl-8">
          <Link
            className="text-gray-300 hover:text-primary mr-2"
            to="https://www.facebook.com/goodowlcorp/"
          >
            <Facebook size={24} />
          </Link>
          <Link
            className="text-gray-300 hover:text-primary mr-2"
            to="https://twitter.com/goodowlcorp"
          >
            {' '}
            <Twitter size={24} />
          </Link>
          <Link
            className="text-gray-300 hover:text-primary"
            to="https://www.linkedin.com/company/goodowl-corporation/"
          >
            <Linkedin size={24} />
          </Link>
        </div>
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
    </>
  )
}

const StyledMenu = styled.nav<{ open: boolean }>`
  border-top: 5px solid var(--color-primary-light);
  top: 114px;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  overflow-y: scroll;
  background-color: white;
  z-index: 1;

  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  // @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation: portrait) {
  //   top: 118px;
  // }

  display: flex;
  flex-direction: column;
  padding: 2rem 0 10rem 0;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (max-width: 600px) {
    width: 100%;
  }
`

const LangSwitcher = styled.button.attrs(() => ({
  className: `font-semibold pl-10 mb-0 text-primary uppercase`,
}))`
  font-size: 0.7rem;
`

const PrimaryNav = styled.ul.attrs(() => ({
  className: `font-semibold text-primary pb-6`,
}))`
  li {
    a {
      padding: 0.3rem 2.1rem 0;
      font-size: 1.2rem;
    }
  }
`

const SecondaryNav = styled.ul.attrs(() => ({
  className: `font-bold text-gray-400 uppercase`,
}))`
  li {
    a {
      padding: 0.2rem 2.1rem 0;
      font-size: 0.7rem;
    }
  }
`

const UserNav = styled.ul.attrs(() => ({
  className: `font-bold text-gray-400 uppercase pt-6`,
}))`
  li {
    a {
      padding: 0.2rem 2.1rem 0;
      font-size: 0.7rem;
    }
  }
  .login-items {
    display: flex;
    li {
      a {
        padding-right: 0;
      }
      &:last-child {
        a {
          padding-left: 0.2rem;
        }
      }
    }
  }
`
