import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import { config } from '@config/main'
import { authApi } from '@api/index'
import axios from 'axios'
import { ROLE } from '@models/auth'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
    }),
    FacebookProvider({
      clientId: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret,
    }),
    CredentialsProvider({
      id: 'mentee',
      name: 'mentee',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (credentials?.email && credentials?.password) {
            const res = await axios.post(`${config.backendURL}/v1/auth/signin`, {
              email: credentials?.email,
              password: credentials?.password,
            })
            if (res.data?.accessToken) {
              return res.data
            }
          }
        } catch (err: any) {
          // Return an object that will pass error information through to the client-side.
          throw new Error(JSON.stringify(err.response?.data))
        }
      },
    }),
    CredentialsProvider({
      id: 'mentor',
      name: 'mentor',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (credentials?.email && credentials?.password) {
            const res = await authApi.loginMentorApiServer({
              email: credentials?.email,
              password: credentials?.password,
            })

            if (res.data?.accessToken) {
              return { ...res.data, role: 'mentor' }
            }
          }
        } catch (err: any) {
          // Return an object that will pass error information through to the client-side.
          throw new Error(JSON.stringify(err.response?.data))
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      try {
        if (account) {
          // check account provider
          if (account.provider === 'mentee' || account.provider === 'mentor') {
            token.accessToken = user?.accessToken
          } else {
            // send social token to server
            const res = await authApi.loginSocialApiServer(account.provider, {
              accessToken: account.access_token as string,
            })
            if (res.data?.accessToken) {
              token.accessToken = res.data.accessToken
            }
          }
          // get profile
          const res = await axios.get(`${config.backendURL}/v1/users/profile`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          })
          token.uid = res.data.id
          token.role = account.provider
        }
      } catch (err) {
        console.log(err)
      }

      return token
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user.id = token.uid as string
      session.user.role = token.role === 'mentor' ? ROLE.mentor : ROLE.mentee
      return Promise.resolve(session)
    },
  },
  secret: process.env.SECRET,
  session: {
    maxAge: 60 * 60,
  },
})
