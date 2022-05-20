export interface MentorProgram {
  id?: string
  title: string
  detail: string
  credit: number
  createAt?: Date
  mentorId?: string
}

export interface ProgramRegisterCheckoutInfoProps {
  name: string
  email: string
  description?: string
  note?: string
  expectation?: string
  goal?: string
}
