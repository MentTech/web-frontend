import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
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
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(`${config.backendURL}/auth/signin`, {
            email: credentials?.email,
            password: credentials?.password,
          })
          if (res.data.accessToken) {
            return res.data
          }
        } catch (err) {
          console.log(err)
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account) {
        // check account provider
        if (account.provider === 'credentials') {
          token.accessToken = user?.accessToken
        }
      }
      return token
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  secret: process.env.SECRET,
})
