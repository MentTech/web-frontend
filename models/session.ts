import { MentorProgram } from './program'

export interface MentorSession {
  id: string
  program: MentorProgram
  done: boolean
  isAccepted: boolean
  rating: number
}
