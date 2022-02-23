import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { config } from '@config/main'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
    }),
  ],
})
