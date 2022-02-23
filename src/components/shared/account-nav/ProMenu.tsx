import React, { FC } from 'react'

// Store
import { useStore } from '../../../store/models'

import { MenuItem } from './MenuItems'

type menuTypes = {
  content?: any
}
export const ProMenu: FC<menuTypes> = ({ content }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userState, userActions] = useStore('User')

  const FirmPermission = userState?.session?.decodedToken.permissions.includes('firmMenu')

  return (
    <div className="menu">
      <h5 className="uppercase font-bold text-primary text-xs">{content?.title_2}</h5>
      <ul className="mt-6">
        {!FirmPermission ? (
          <>
            <MenuItem icon="dashboard" label={content?.menu_text_1} link="/dashboard" />
            <MenuItem icon="calendar" label={content?.menu_text_2} link="/calendar" />
          </>
        ) : null}
        <MenuItem icon="list" label={content?.menu_text_6} link="/todo-list" />
        <MenuItem icon="pricesetting" label={content?.menu_text_5} link="/price-settings" />
        <MenuItem icon="availability" label={content?.menu_text_7} link="/availability" />
      </ul>
    </div>
  )
}
