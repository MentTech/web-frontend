import axiosClient from '@api/axios-client'
import Auth from '@components/common/Auth'
import { EmptyLayout } from '@components/layouts'
import { CacheProvider } from '@emotion/react'
import { AppPropsWithLayout } from '@models/common'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createEmotionCache, theme } from '@utils/index'
import { store } from 'app/store'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

const clientSideEmotionCache = createEmotionCache()

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <SessionProvider session={session}>
            <SWRConfig
              value={{
                fetcher: (url) => axiosClient.get(url).then((res) => res.data),
                shouldRetryOnError: false,
              }}
            >
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
            </SWRConfig>
          </SessionProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
