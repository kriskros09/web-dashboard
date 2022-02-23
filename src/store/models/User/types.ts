export type SignUpField = {
  name: string
  type: string
  value: string | number
}

export type SignUpType = 'client' | 'admin' | 'firm' | 'employee' | 'professional' | '' | string

export type SignUpForm = SignUpField[]

export type Loginform = {
  email: string
  password: string
}

export type User = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  langId: string
}

export type DecodedToken = {
  userId: string
  proId: string
  firmId: string
  billingAdress: string
  roles: string[]
  permissions: string[]
  iat: number
  exp: number
  langId: string
}

export type Session = {
  token: string
  tokenExpiration: number
  decodedToken: DecodedToken
}

export type Error = {
  field?: string
  view?: string
  message: string
  page?: string
}

export type State = {
  userId: string
  proId: string
  firmId: string
  firstName: string
  lastName: string
  profilePicture: string
  professionalPicture: string
  email: string
  langId: string
  status: number
  lastLogin: unknown
  errors: Error[]
  session?: Session
}

export type ActionParams = {
  signUp: { data: SignUpForm; type: SignUpType }
  Upgrade: { userId: string; data: SignUpForm; type: SignUpType }
  loginUser: Loginform
  resetErrors: string
  logOutUser: { userId: string }
  verifyEmail: { email: string }
  autoLogin: { token: string; tokenExpiration: number; userId: string }
  setProfileLanguage: { userId: string; langId: string }
  requestPasswordReset: { email: string }
  updatePassword: { userId: string; password: string; confirmPassword: string }
}
