import React, { FC } from 'react'

// Store
import { useStore } from '../../../store/models'

import { MenuItem } from './MenuItems'

type menuTypes = {
  content?: any
}
export const ClientMenu: FC<menuTypes> = ({ content }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userState, userActions] = useStore('User')
  const isLoggedIn = userState?.userId && userState?.userId !== '' && userState?.session?.token

  const hasAccess =
    userState?.session?.decodedToken.permissions.includes('profMenu') ||
    userState?.session?.decodedToken.permissions.includes('firmMenu') ||
    userState?.session?.decodedToken.permissions.includes('userMenu')

  return hasAccess ? (
    <>
      <div className="menu">
        <h5 className="uppercase font-bold text-primary text-xs">general</h5>
        <ul className="mt-6">
          <MenuItem icon="purchase" label={content?.menu_text_8} link="/purchase" />
          <MenuItem icon="profile" label={content?.menu_text_9} link="/profile" />
          <MenuItem icon="help" label={content?.menu_text_10} link="/help-center" />
          {isLoggedIn ? (
            <MenuItem
              icon="logout"
              label={content?.menu_text_11}
              link="/"
              onClick={() => userActions.logOutUser({ userId: userState.userId })}
            />
          ) : null}
        </ul>
      </div>
    </>
  ) : null
}
