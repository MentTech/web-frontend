import '../styles/globals.css'
import { AppPropsWithLayout } from '@models/common'
import { EmptyLayout } from '@components/layouts'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  )
}

export default MyApp
