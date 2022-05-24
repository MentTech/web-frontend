import { Mentee } from './mentee'
import { Mentor } from './mentor'

export interface Notification {
  id: number
  typeId: string
  type: NotificationType
  actorId: number
  actor: Mentor | Mentee
  notifierId: number
  message: string
  isRead: boolean
  createAt: Date
  updatedAt: Date
  additional: any
}

export interface NotificationType {
  name: string
  createAt: Date
  updateAt: Date
}
