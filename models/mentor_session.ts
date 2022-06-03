import { Mentee } from './mentee'

export interface MentorSession {
  id: number
  programId: number
  userId: number
  done: boolean
  additional: string
  contactInfo: string
  createAt: Date | string
  expectedDate: Date | string
  isAccepted: boolean
  menteeInfo: {
    createAt: string | Date
    description: string
    email: string
    expectation: string
    goal: string
    id: number
    name: string
    note: string
    registerId: number
    updatedAt: string | Date
  }
  isCanceled: boolean
}
