import { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise((resolve) => {
    const cookie = new Cookies(req, res)
    const token = cookie.get('next-auth.session-token')
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    req.headers.cookie = ''
    proxy.web(req, res, {
      target: process.env.BACKEND_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.on('proxyReq', (proxyReq, req, res, options) => {
      const rewritePath = req.url?.replace('/api', '') || ''
      proxyReq.path = rewritePath
      console.log(proxyReq.path)
    })

    proxy.once('proxyRes', () => {
      resolve(true)
    })
  })
}
