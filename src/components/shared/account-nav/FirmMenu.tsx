import React, { FC } from 'react'

import { MenuItem } from './MenuItems'

type menuTypes = {
  content?: any
}
export const FirmMenu: FC<menuTypes> = ({ content }) => {
  return (
    <div className="menu">
      <h5 className="uppercase font-bold text-primary text-xs">{content?.title_1}</h5>
      <ul className="mt-6">
        <MenuItem icon="dashboard" label={content?.menu_text_1} link="/dashboard" />
        <MenuItem icon="calendar" label={content?.menu_text_2} link="/calendar" />
        <MenuItem icon="team" label={content?.menu_text_3} link="/professional-list" />
        <MenuItem icon="accounting" label={content?.menu_text_4} link="/accounting" />
      </ul>
    </div>
  )
}
