type IMetaProps = {
  title?: string
  isPrivate?: boolean
  isLoginToHome?: boolean
  permissions?: string[]
  roles?: string[]
}
type IRedirectProps = {
  to: string | unknown
  from: string
  push?: boolean
  exact?: boolean
  strict?: boolean
}
type IRouteConfigProps = {
  path: string[] | string
  key: string
  component: React.ComponentType<unknown>
  exact?: boolean
  meta?: IMetaProps
  redirect?: IRedirectProps
  [propName: string]: unknown
}
type IChildRouteProps = {
  childRoutes?: Array<IRouteConfigProps>
}
export type IRouteProps = IRouteConfigProps & IChildRouteProps
