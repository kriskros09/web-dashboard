import React from 'react'

import { SignUpType } from '../../store/models/User/types'

import { Client, Lawyer } from './views'

const SignUp: React.FC<{ type: SignUpType; pageContent?: any }> = ({ type, pageContent }) => {
  if (!type) return null

  if (type === 'client') {
    return <Client pageContent={pageContent} />
  }

  if (type === 'lawyer') {
    return <Lawyer pageContent={pageContent} />
  }

  return null
}

export default SignUp
