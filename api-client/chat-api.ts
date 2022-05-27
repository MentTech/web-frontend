import axiosClient from './axios-client'

export const chatApi = {
  getChatRoomInfor(sessionId: number) {
    return axiosClient.get(`/v1/chat/session/${sessionId}`)
  },
  getAllChatMessage(roomId: number) {
    return axiosClient.get(`/v1/chat/room/${roomId}/message?limit=100&skip=0`)
  },
  getRoomInfo(roomId: number) {
    return axiosClient.get(`/v1/chat/room/${roomId}`)
  },
}
