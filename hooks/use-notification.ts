import useSWR from 'swr'
import axiosClient from '@api/axios-client'
import { Notification } from '@models/index'

export function useNotification() {
  const {
    data: notifications,
    error,
    mutate,
    isValidating,
  } = useSWR<any>('/v1/notification', {
    revalidateOnFocus: false,
  })

  async function addNewNotification(notification: Notification) {
    await mutate([...notifications, notification], false)
  }

  async function markAllAsRead(id: number) {
    try {
      notifications.map((notification: Notification) => {
        if (notification.id == id) {
          notification.isRead = true
        }
        return notification
      })
      mutate(notifications, false)
      await axiosClient.patch(`/v1/notification/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  notifications?.sort((a: Notification, b: Notification) => {
    // if (a.isRead && !b.isRead) {
    //   return 1
    // }
    // if (!a.isRead && b.isRead) {
    //   return -1
    // }
    return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  })

  return {
    notifications,
    error,
    addNewNotification,
    mutate,
    markAllAsRead,
  }
}
