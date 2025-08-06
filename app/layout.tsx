// import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css'
import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import Head from './head'
import { Provider } from './provider'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Head />
      <body>
        <NextTopLoader showSpinner={false} />
        <Script src='/api/env' strategy={'beforeInteractive'}></Script>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
