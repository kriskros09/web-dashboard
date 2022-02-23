import { Model } from 'react-model'

import Locale from './Locale/model'
import Global from './Global/model'
import User from './User/model'
import Profiles from './Profiles/model'
import PageContent from './PageContent/model'
import Mandates from './Mandates/model'
import Professionals from './Professionals/model'
import Availability from './Availability/model'
import Search from './Search/model'
import Order from './Order/model'
import Accounting from './Accounting/model'
import Appointments from './Appointments/model'
import Dashboard from './Dashboard/model'

const models = {
  Locale,
  Global,
  User,
  Profiles,
  PageContent,
  Mandates,
  Professionals,
  Availability,
  Search,
  Order,
  Accounting,
  Appointments,
  Dashboard,
}

export const { getInitialState, useStore, getState, actions, subscribe, unsubscribe } = Model(
  models,
)
