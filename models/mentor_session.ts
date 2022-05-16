import { Mentee } from './mentee'

export interface MentorSession {
  id: number
  programId: number
  userId: number
  done: boolean
  additional: string
  contactInfo: string
  createdAt: Date | string
  expectedDate: Date | string
  isAccepted: boolean
  user: Mentee
}
