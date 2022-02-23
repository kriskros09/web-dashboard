import React from 'react'
import { Switch, BrowserRouter, Redirect } from 'react-router-dom'

import RoutesController from './RoutesController'
import routesMap from './config'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routesMap.map((route) => (
          <RoutesController {...route} key={route.key} />
        ))}
        <Redirect to="/404-error" />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
