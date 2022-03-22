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
            const res = await authApi.loginApiServer({
              email: credentials?.email,
              password: credentials?.password,
            })
            if (res.data?.accessToken) {
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
      try {
        if (account) {
          // check account provider
          if (account.provider === 'credentials') {
            token.accessToken = user?.accessToken
          } else {
            // send social token to server
            const res = await authApi.loginSocialApiServer(account.provider, {
              accessToken: account.access_token as string,
            })
            console.log(res.data)
            if (res.data?.accessToken) {
              token.accessToken = res.data.accessToken
            }
          }
        }
      } catch (err) {
        console.log(err)
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
