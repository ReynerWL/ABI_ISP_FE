import '@ant-design/v5-patch-for-react-19'
import 'antd/dist/reset.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import Head from './head'
import { Provider } from './provider'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${plusJakartaSans.variable}`}>
      <Head />
      <body className='font-sans'>
        <NextTopLoader showSpinner={false} />
        <Script src='/api/env' strategy={'beforeInteractive'}></Script>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
