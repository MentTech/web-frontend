import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import { config } from '@config/main'
import { authApi } from '@api/auth-api'

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
          if (credentials?.email && credentials?.password) {
            const res = await authApi.login({
              email: credentials?.email,
              password: credentials?.password,
            })
            console.log('res', res)
            if (res.data) {
              return res.data
            }
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
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user',
  },
})
