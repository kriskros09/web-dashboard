import React from 'react'
import { Redirect, RouteComponentProps, Route } from 'react-router-dom'

type Props = {
  Component: React.FC<RouteComponentProps>
  path: string
  exact?: boolean
}

const AuthRoute = ({ Component, path, exact = false }: Props): JSX.Element => {
  const isAuthed = false

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        isAuthed ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  )
}

export default AuthRoute
