import axiosClient from './axios-client'

export const statisticApi = {
  getNumberOfMentee() {
    return axiosClient.get('/v1/statistic/mentor/mentees')
  },
  getSessionPieData() {
    return axiosClient.get('/v1/statistic/mentor/session-pie')
  },
  getNumberOfAcceptedSession() {
    return axiosClient.get('/v1/statistic/mentor/session-done')
  },
}
