import axiosClient from '@api/axios-client'
import Auth from '@components/common/Auth'
import { EmptyLayout } from '@components/layouts'
import { CacheProvider } from '@emotion/react'
import { AppPropsWithLayout } from '@models/common'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createEmotionCache, theme } from '@utils/index'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Head from 'next/head'
const clientSideEmotionCache = createEmotionCache()

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <>
      <Head>
        <title>MentTech</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SessionProvider session={session}>
            <SWRConfig
              value={{
                fetcher: (url) => axiosClient.get(url).then((res) => res.data),
                shouldRetryOnError: false,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {Component.isPrivate ? (
                  <Auth>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </Auth>
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
                <ToastContainer />
              </LocalizationProvider>
            </SWRConfig>
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>{' '}
    </>
  )
}

export default MyApp
