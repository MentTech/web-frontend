import { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'
import { getSession } from 'next-auth/react'

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise(async (resolve) => {
    const session = await getSession({ req })
    if (session?.accessToken) {
      req.headers.Authorization = `Bearer ${session?.accessToken}`
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
      console.log('response')
      resolve(true)
    })
  })
}
