export const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
  },
  backendURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
  nextAuthURL: process.env.NEXTAUTH_URL || '',

  ekycTokenId: process.env.NEXT_PUBLIC_EKYC_TOKEN_ID || '',
  ekycTokenKey: process.env.NEXT_PUBLIC_EKYC_TOKEN_KEY || '',
  ekycAccessToken: process.env.NEXT_PUBLIC_EKYC_ACCESS_TOKEN || '',
  ekycApiURL: process.env.NEXT_PUBLIC_EKYC_API_URL || '',
}
