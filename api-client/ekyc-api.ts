import axios from 'axios'
import axiosClient from './axios-client'
import { config } from '@config/main'

const axiosKYC = axios.create({
  baseURL: config.ekycApiURL,
  headers: {
    Authorization: 'Bearer ' + config.ekycAccessToken,
    'Token-id': config.ekycTokenId,
    'Token-key': config.ekycTokenKey,
  },
})

interface VerifyMentorPayload {
  dataSign: string
  dataBase64: string
}
interface CheckImageFrontFormData {
  img_front: string
  client_session?: string
  type?: number
  validate_postcode?: boolean
  token: string
}

export const ekycApi = {
  uploadImage(formData: FormData) {
    return axiosKYC.post('/file-service/v1/addFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  front(formData: CheckImageFrontFormData) {
    return axiosKYC.post('/ai/v1/ocr/id/front', formData, {
      headers: {
        'mac-address': 'TEST1',
      },
    })
  },

  checkVerifyCode(token: string) {
    return axiosClient.get(`/v1/mentor/verify/${token}`)
  },

  verifyMentor(token: string, payload: VerifyMentorPayload) {
    return axiosClient.post(`/v1/mentor/verify/${token}`, payload)
  },
}
