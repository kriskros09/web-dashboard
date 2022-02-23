const queries = {
  LOGIN_USER: `
  query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
  `,
  LOGOUT_USER: `
  query($userId: String!) {
    logout(userId: $userId) {
      userId
    }
  }
  `,
  VERIFY_EMAIL: `
    query($email: String!) {
      validateEmail(email: $email) {
        email
      }
    }
  `,
}

const mutations = {
  SIGNUP_USER: `
    mutation($signUpInput: SignUp_userInput!) {
      signUpUser(signUpInput: $signUpInput) {
        userId
      }
    }
  `,

  SIGNUP_PROFESSIONAL: `
    mutation($signUpInput: SignUp_professionalInput!) {
      signUpProfessional(signUpInput: $signUpInput) {
        userId
        proId
      }
    }
  `,
  SIGNUP_FIRM: `
    mutation($signUpInput: SignUp_firmInput!) {
      signUpFirm(signUpInput: $signUpInput) {
        userId
        proId
        firmId
      }
    }
  `,
  UPGRADE_TO_PROFESSIONAL: `
    mutation($userId: String!, $upgradeInput: Upgrade_professionalInput) {
      upgradeUserToProfessional(userId: $userId, upgradeInput: $upgradeInput) {
        userId
        proId
      }
    }
  `,
  UPGRADE_TO_FIRM: `
    mutation($userId: String!, $upgradeInput: Upgrade_firmInput) {
      upgradeUserToFirm(userId: $userId, upgradeInput: $upgradeInput) {
        userId
        proId
        firmId
      }
    }
  `,
  EMAIL_CONFIRMATION: `
    mutation($emailToken: String!) {
      confirmEmail(emailToken: $emailToken) {
        userId
        token
        tokenExpiration
        redirect
        orderToken
      }
    }
  `,
  SET_PROFILE_LANGAUGE: `
  mutation($userId: String!, $langId: String!) {
  switchLanguage(userId: $userId, langId: $langId) {
      langId
    }
  }
  `,
  REQUEST_PASSWORD_RESET: `
    mutation($email: String!) {
      resetPasswordRequest(email: $email) {
        sent
      }
    }
  `,
  VERIFY_PASSWORD_RESET_TOKEN: `
  mutation($emailToken: String!) {
    verifyPasswordToken(emailToken: $emailToken) {
      validated
    }
  }
  `,
  UPDATE_PASSWORD: `
  mutation($userId: String!, $password: String!, $confirmPassword: String!) {
    changePassword(userId: $userId, password: $password, confirmPassword: $confirmPassword) {
      userId
    }
  }
  `,
}

export default {
  queries,
  mutations,
}
