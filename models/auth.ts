export interface loginPayload {
  email: string
  password: string
  isMentor?: boolean
}

export interface LoginSocialPayload {
  accessToken: string
}

export enum ROLE {
  mentor = 'mentor',
  mentee = 'mentee',
}

export interface UpdatePasswordPayload {
  oldPassword?: string
  newPassword?: string
}

export interface SetPasswordPayload {
  password: string
}
