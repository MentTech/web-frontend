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

export interface Mentor {
  id: string
  email: string
  name: string
  birthday?: Date
  phone?: string
  avatar?: string
  degree?: Array<Degree>
  experiences?: Array<Experience>
  linkedin?: string
  jobs?: Array<Job>
  achievements?: Array<string>
  skillIds?: Array<Number>
  introduction?: string
}
