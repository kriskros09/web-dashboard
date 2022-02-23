import { useState, useEffect } from 'react'

import { useStore } from '../store'

export type UserType = {
  billingAddress: string
  firmId: string
  proId: string
  userId: string
  langId: string
}

type UseLoginType = {
  user: UserType | null
  isLoggedIn: boolean
  roles: string[]
  permissions: string[]
}

export const useLogin = (): UseLoginType => {
  const [userState] = useStore('User')
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [roles, setRoles] = useState<string[]>([])
  const [permissions, setPermissions] = useState<string[]>([])

  useEffect(() => {
    const { session } = userState

    if (session?.decodedToken) {
      const { decodedToken, token } = session
      setIsLoggedIn(
        token !== '' && typeof decodedToken !== undefined && Object.keys(decodedToken).length > 0,
      )
      setUser({
        billingAddress: decodedToken.billingAdress,
        firmId: decodedToken.firmId,
        proId: decodedToken.proId,
        userId: decodedToken.userId,
        langId: decodedToken.langId,
      })
      setRoles(decodedToken.roles)
      setPermissions(decodedToken.permissions)
    }
  }, [userState])

  return {
    user,
    isLoggedIn,
    roles,
    permissions,
  }
}
