import { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import { getSession } from 'next-auth/react'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { useProfile } from '@hooks/index'

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
      // console.log(jwt_decode(session?.accessToken as string))
      const decodeToken = jwt_decode<JwtPayload>(session?.accessToken as string)
      if (decodeToken?.exp < new Date().getTime() / 1000) {
        const { logout } = useProfile()
        await logout()
        resolve(true)
      }
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
      resolve(true)
    })
  })
}
