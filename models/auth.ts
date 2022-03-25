export interface loginPayload {
  email: string
  password: string
  isMentor?: boolean
}

export interface LoginSocialPayload {
  accessToken: string
}
