import { Mentee } from './mentee'
import { Mentor } from './mentor'

export interface Notification {
  id: string
  typeId: string
  type: NotificationType
  actor: Mentor | Mentee
  message: string
  isRead: boolean
  createAt: Date
  updatedAt: Date
}

export interface NotificationType {
  name: string
  createAt: Date
  updateAt: Date
}
