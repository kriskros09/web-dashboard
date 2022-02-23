import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Store
import { getState } from '../../../store/models'
// Helpers
import { userSessionMapper } from '../../../store/helpers/mappers'
//Components
import UserPic from '../../../assets/img/owl-goodowl-mobile.jpg'
import { ClientMenu } from '../account-nav/ClientMenu'
import { ProMenu } from '../account-nav/ProMenu'
import { FirmMenu } from '../account-nav/FirmMenu'

import Hamburger from './Burger'

export const Menu: FC<{ menuContent?: any }> = ({ menuContent }) => {
  const [open, setOpen] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { permissions } = userSessionMapper(getState('User')?.session)
  const { roles } = userSessionMapper(getState('User')?.session)
  const hasFirmPermission = permissions.includes('firmMenu')
  const hasProPermission = permissions.includes('profMenu')
  const canUpgrade = permissions.includes('userUpgrade')

  const hasFirmRole = roles.includes('firmManager')
  const hasProRole = roles.includes('professional')

  return (
    <>
      <StyledMenu open={open}>
        <div className="md:hidden flex items-center">
          <ImageWrapper className="overflow-hidden img-wrapper">
            <img
              alt=""
              src={
                getState('User')?.professionalPicture === '' ||
                !getState('User')?.professionalPicture
                  ? UserPic
                  : getState('User')?.professionalPicture
              }
            />
          </ImageWrapper>
          <p className="text-white text-sm ml-3">
            {getState('User')?.firstName} {getState('User')?.lastName}
          </p>
        </div>
        {(() => {
          if (hasFirmPermission) {
            return (
              <>
                <FirmMenu content={menuContent} />
                <ProMenu content={menuContent} />
              </>
            )
          } else if (hasProPermission) {
            return (
              <>
                <ProMenu content={menuContent} />
              </>
            )
          }
        })()}
        <ClientMenu content={menuContent} />
        {(() => {
          if (canUpgrade && !hasFirmRole && !hasProRole) {
            return (
              <Link className="btn btn-xs bg-primary text-white" to="/sign-as-professional">
                {menuContent?.btn_text}
              </Link>
            )
          }
        })()}
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
    </>
  )
}

const StyledMenu = styled.nav.attrs({
  className: 'bg-primary-dark min-h-screen px-6 py-10',
})<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 35vw;
  position: fixed;
  z-index: 40;
  overflow-x: scroll;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};

  @media (max-width: 600px) {
    width: 100%;
  }

  .menu {
    border-bottom: 1px solid var(--color-primary);
    padding-top: 2.5rem;
    padding-bottom: 0.5rem;
    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      border: 0;
    }
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
