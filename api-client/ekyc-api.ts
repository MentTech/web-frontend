import axios from 'axios'
import { config } from '@config/main'

const axiosKYC = axios.create({
  baseURL: config.ekycApiURL,
  headers: {
    Authorization: 'Bearer ' + config.ekycAccessToken,
    'Token-id': config.ekycTokenId,
    'Token-key': config.ekycTokenKey,
  },
})

interface ImageFormData {
  file: File
  title: string
  description: string
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
}
