import { chatApi } from '@api/chat-api'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ChatMessage } from '@models/message'

export function useMessages(roomId: number, limit: number, skip: number) {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[] | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const { data: session } = useSession()

  useEffect(() => {
    if (roomId) {
      setLoading(true)
      getChatMessages(roomId, limit, skip)
    }
  }, [limit, skip, roomId])

  const isFirstLoading = messages === null

  async function getChatMessages(roomId: number, limit: number, skip: number) {
    const res = await chatApi.getChatMessage(roomId, limit, skip)
    const messagesList = res.data
    messagesList.forEach((message: ChatMessage) => {
      message.fromSelf = message.userId === session?.user?.id
    })

    setHasMore(messagesList.length > 0)

    messagesList.reverse()
    setMessages([...messagesList, ...(messages || [])])
    setLoading(false)
  }

  return { messages, loading, hasMore, isFirstLoading }
}
