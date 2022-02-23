import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Store
import { getState } from '../../store/models'
// Helpers
import { userSessionMapper } from '../../store/helpers/mappers'

//Components
import { ClientMenu } from './account-nav/ClientMenu'
import { ProMenu } from './account-nav/ProMenu'
import { FirmMenu } from './account-nav/FirmMenu'

// import { Logo, ArrowDown, ArrowRight } from './Icons'

type SideBarTypes = {
  menusContent?: any
}

export const Sidebar: FC<SideBarTypes> = ({ menusContent }) => {
  const { permissions } = userSessionMapper(getState('User')?.session)
  const { roles } = userSessionMapper(getState('User')?.session)

  const hasFirmPermission = permissions.includes('firmMenu')
  const hasProPermission = permissions.includes('profMenu')
  const canUpgrade = permissions.includes('userUpgrade')

  const hasFirmRole = roles.includes('firmManager')
  const hasProRole = roles.includes('professional')

  return (
    <>
      <StyledSidebar>
        {(() => {
          if (hasFirmPermission) {
            return (
              <>
                <FirmMenu content={menusContent} />
                <ProMenu content={menusContent} />
              </>
            )
          } else if (hasProPermission) {
            return (
              <>
                <ProMenu content={menusContent} />
              </>
            )
          }
        })()}
        <ClientMenu content={menusContent} />
        {(() => {
          if (canUpgrade && !hasFirmRole && !hasProRole) {
            return (
              <Link className="btn btn-sm bg-primary text-white" to="/sign-as-professional">
                {menusContent?.btn_text}
              </Link>
            )
          }
        })()}
      </StyledSidebar>
    </>
  )
}

const StyledSidebar = styled.div.attrs(() => ({
  className: 'bg-primary-dark w-2/6 xxl:w-1/6 min-h-screen px-6 py-10 hidden 3xl:block',
}))`
  min-width: 300px;

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
