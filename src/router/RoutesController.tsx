import React from 'react'
import { Redirect, Route } from 'react-router-dom'

// Store
import { useStore } from '../store/models'

// types
import { IRouteProps } from './router.types'

const RoutesController: React.ComponentType<IRouteProps> = ({
  component: Component,
  meta,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userState, userAction] = useStore('User')
  const authenticated = userState?.session !== null // should be replaced by a service call
  const userPermissions = userState?.session?.decodedToken

  const Permissions = meta?.permissions?.filter((permission) =>
    userPermissions?.permissions.includes(permission),
  )

  const hasPermission = Permissions?.length !== 0

  return (
    <Route
      render={(props) => {
        if (meta && meta.isPrivate && meta.permissions) {
          return authenticated && hasPermission ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to="/login" />
          )
        }

        return <Component {...props} {...rest} />
      }}
    />
  )
}

export default RoutesController
