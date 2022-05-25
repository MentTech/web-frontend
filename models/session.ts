import { MentorProgram } from './program'

export interface MentorSession {
  id: string
  program: MentorProgram
  done: boolean
  isAccepted: boolean
  expectedDate?: Date
  rating: number
  contactInfo?: string
}
