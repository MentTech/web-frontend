export interface ChatMessage {
  id?: number
  roomId: number
  userId: string | number | undefined
  content: string
  createAt: Date
  fromSelf: boolean
}
