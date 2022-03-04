import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import axiosClient from '@api/axios-client'
import { config } from '@config/main'

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
      name: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const user = { id: 1, name: 'LQD', email: 'lequocdattyty191@gmail.com' }
        const data = await axiosClient.get(`/api/users`)
        console.log(data)
        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log('jwt')
      if (account) {
        token.accessToken = account.accessToken
      }
      return token
    },

    async session({ session, token, user }) {
      console.log('session')
      session.accessToken = token.accessToken
      return session
    },
  },
})
