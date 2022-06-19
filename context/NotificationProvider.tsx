import axiosClient from '@api/axios-client'
import { Notification } from '@models/notification'
import { useSession } from 'next-auth/react'
import { useEffect, useState, createContext, useContext } from 'react'

interface NotificationContext {
  notifications: Notification[]
  loading: boolean
  setSkip: (callback: any) => void
  setLimit: (callback: any) => void
  skip: number
  limit: number
  hasMore: boolean
  addNewNotification: (notification: Notification) => void
  markAllAsRead: (id: number) => void
}

const NotificationContext = createContext<NotificationContext>({
  notifications: [],
  loading: false,
  skip: 0,
  limit: 5,
  setSkip: () => {},
  setLimit: () => {},
  hasMore: true,
  addNewNotification: () => {},
  markAllAsRead: () => {},
})

interface NotificationProviderProps {
  children: React.ReactNode
}

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const { status } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axiosClient.get(`/v1/notification?limit=${limit}&skip=${skip}`)
        setNotifications([...notifications, ...data])
        setHasMore(data.length > 0)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (status === 'authenticated') {
      fetchData()
    }
  }, [skip, limit, status])

  function addNewNotification(notification: Notification) {
    setNotifications([...notifications, notification])
    setSkip((prev) => prev + 1)
  }

  async function markAllAsRead(id: number) {
    try {
      notifications.map((notification: Notification) => {
        if (notification.id == id) {
          notification.isRead = true
        }
        return notification
      })
      setNotifications(notifications)
      await axiosClient.patch(`/v1/notification/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  notifications?.sort((a: Notification, b: Notification) => {
    return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  })

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        skip,
        limit,
        setSkip,
        setLimit,
        addNewNotification,
        markAllAsRead,
        hasMore,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  return context
}
