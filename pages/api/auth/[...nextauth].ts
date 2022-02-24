import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
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
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.accessToken
      }
      return token
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
