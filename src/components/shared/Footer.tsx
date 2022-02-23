import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

// Store
import { useStore } from '../../store/models'
//Components
import { LogoWhite, Facebook, Linkedin, Twitter, ArrowDown } from '../../components/shared/Icons'
import { Newsletter } from '../../modules/MiscForms/views/Newsletter'

type footer = {
  pageContent?: any
}

export const Footer: FC<footer> = ({ pageContent }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalState, globalActions] = useStore('Global')

  const handleClick = (el) => {
    const list = document.querySelector(el)

    list.classList.toggle('hidden')
    list.classList.toggle('block')
  }

  return (
    <div className="footer-container bg-primary-dark pt-10">
      <div className="w-full lg:w-10/12 container mx-auto">
        <div className="-mx-3 flex flex-wrap items-start justify-between text-white">
          <div className="w-full mb-10 lg:mb-0 lg:w-1/5 lg:px-6">
            <Link className="w-full" to="#">
              <LogoWhite size={250} />
            </Link>
          </div>
          <div className="w-full mb-3 md:mb-10 lg:mb-0 lg:w-1/5 lg:px-6">
            <h6
              aria-controls="#menu1"
              className="text-sm leading-small text-white uppercase font-bold pb-3 cursor-pointer flex items-center"
              onClick={(e) => handleClick(e.currentTarget.getAttribute('aria-controls'))}
            >
              {pageContent?.footer_1.title}
              <span className="md:hidden ml-2">
                <ArrowDown fillColour="primary" size={22} />
              </span>
            </h6>
            <ul
              aria-labelledby="#menu1"
              className="hidden md:block text-sm text-primary font-medium"
              id="menu1"
            >
              <li>
                <Link to="/about-us">{pageContent?.footer_1.menu_text_1}</Link>
              </li>
              <li>
                <Link to="/about-us">{pageContent?.footer_1.menu_text_2}</Link>
              </li>
              <li>
                <Link to="/how-it-works">{pageContent?.footer_1.menu_text_3}</Link>
              </li>
              <li>
                <Link to="/faq">{pageContent?.footer_1.menu_text_4}</Link>
              </li>
              <li>
                <Link to="/privacy-policy">{pageContent?.footer_1.menu_text_5}</Link>
              </li>
              <li>
                <Link to="/terms-conditions">{pageContent?.footer_1.menu_text_6}</Link>
              </li>
              <li>
                <Link to="/contact">{pageContent?.footer_1.menu_text_7}</Link>
              </li>
              <li>
                <Link to="/contact">{pageContent?.footer_1.menu_text_8}</Link>
              </li>
            </ul>
          </div>
          <div className="w-full mb-3 md:mb-10 lg:mb-0 lg:w-1/5 lg:px-6">
            <h6
              aria-controls="#menu2"
              className="text-sm leading-small text-white uppercase font-bold pb-3 flex items-center cursor-pointer"
              onClick={(e) => handleClick(e.currentTarget.getAttribute('aria-controls'))}
            >
              {pageContent?.footer_2.title}
              <span className="md:hidden ml-2">
                <ArrowDown fillColour="primary" size={22} />
              </span>
            </h6>
            <ul
              aria-labelledby="#menu2"
              className="hidden md:block text-sm text-primary font-medium"
              id="menu2"
            >
              {globalState?.laws.map((law) => (
                <li key={law?.lawId}>
                  <HashLink
                    scroll={(el) =>
                      el.scrollIntoView({
                        // alignToTop: 'true',
                        behavior: 'smooth',
                        // block: 'start',
                        // inline: 'nearest',
                      })
                    }
                    to={`/right-law#${law.lawId}`}
                  >
                    {law?.texts[0].name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full mb-3 md:mb-10 lg:mb-0 lg:w-1/5 lg:px-6">
            <h6
              aria-controls="#menu3"
              className="text-sm leading-small text-white uppercase font-bold pb-3 flex items-center"
              onClick={(e) => handleClick(e.currentTarget.getAttribute('aria-controls'))}
            >
              {pageContent?.footer_3.title}
              <span className="md:hidden ml-2">
                <ArrowDown fillColour="primary" size={22} />
              </span>
            </h6>
            <ul
              aria-labelledby="#menu3"
              className="hidden md:block text-sm text-primary font-medium"
              id="menu3"
            >
              <li>
                <Link to="/contact">{pageContent?.footer_3.menu_text_1}</Link>
              </li>
              <li>
                <Link to="/signup">{pageContent?.footer_3.menu_text_2}</Link>
              </li>
              <li>
                <Link to="/faq">{pageContent?.footer_3.menu_text_3}</Link>
              </li>
            </ul>
          </div>
          <div className="w-full mb-10 lg:mb-0 lg:w-1/5 lg:px-6">
            <Newsletter pageContent={pageContent} />
            <div className="flex mt-6">
              <Link className="hover:text-primary mr-5" to="https://www.facebook.com/goodowlcorp/">
                <Facebook size={24} />
              </Link>
              <Link className="hover:text-primary mr-5" to="https://twitter.com/goodowlcorp">
                {' '}
                <Twitter size={24} />
              </Link>
              <Link
                className="hover:text-primary"
                to="https://www.linkedin.com/company/goodowl-corporation/"
              >
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-footer text-center text-xxs bg-dark text-primary font-bold p-2 mt-16">
        © 2019 GoodOwl. All rights reserved.
      </div>
    </div>
  )
}
