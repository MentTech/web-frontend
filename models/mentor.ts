import { Mentee } from '@models/index'

export interface Degree {
  title: string
  issuer: string
  description: string
  degreeId: string
  url: string
  startAt: Date
  expiredAt: Date
}

export interface Experience {
  title: string
  company: string
  description: string
  startAt: Date
  endAt: Date
}

export interface Job {
  startDate: Date
  endDate: Date
  company: string
  position: string
  additional: Object
}

export interface Skill {
  id: Number;
  description: string;
  additional: Object | null
  isAccepted: Boolean;
  createdAt: Date
}

export interface UserMentor {
  linkedin: string;
  degree?: Array<Degree>
  experiences?: Array<Experience>
  achievements?: Array<string>
  skills?: Array<Skill>
  introduction?: string
  category?: object
  rating: Number;
}

export type Mentor = Mentee & {
  User_mentor : UserMentor
}
