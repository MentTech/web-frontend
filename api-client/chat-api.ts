import { ChatMessage } from '@models/message'
import { AxiosResponse } from 'axios'
import axiosClient from './axios-client'

export const chatApi = {
  getChatRoomInfor(sessionId: number) {
    return axiosClient.get(`/v1/chat/session/${sessionId}`)
  },
  getChatMessage(roomId: number, limit: number, skip: number) {
    return axiosClient.get<any, AxiosResponse<ChatMessage[]>>(
      `/v1/chat/room/${roomId}/message?limit=${limit}&skip=${skip}`
    )
  },
  getRoomInfo(roomId: number) {
    return axiosClient.get(`/v1/chat/room/${roomId}`)
  },
}
