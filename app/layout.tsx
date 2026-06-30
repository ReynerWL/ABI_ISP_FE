import { TokenUtil } from '#/utils/token'
import '@ant-design/v5-patch-for-react-19'
import 'antd/dist/reset.css'
import { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import './globals.css'
import Head from './head'
import { Provider } from './provider'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mbinet.click'),
  title: {
    default: 'MBINet - Internet Cepat & Stabil untuk Rumah & Bisnis',
    template: '%s - MBINet'
  },
  description:
    'MBINet dari PT Media Buana Informatika menyediakan layanan internet cepat, stabil, dan terjangkau untuk kebutuhan rumah, UMKM, dan perusahaan. Pilih paket internet terbaik sesuai kebutuhan Anda.',
  keywords: [
    'MBINet',
    'internet cepat',
    'ISP terbaik',
    'wifi rumahan',
    'internet fiber optic',
    'paket internet murah'
  ],
  openGraph: {
    title: 'MBINet - Internet Cepat & Stabil',
    description:
      'Layanan internet fiber optic cepat dan stabil dari PT Media Buana Informatika.',
    url: 'https://mbinet.click',
    siteName: 'MBINet',
    images: [{ url: '/media-buana-inti-logo.png', width: 1184, height: 656 }],
    locale: 'id_ID',
    type: 'website'
  },
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  TokenUtil.loadToken()
  return (
    <html lang='en' className={`${plusJakartaSans.variable}`}>
      <Head />
      <body className='font-sans'>
        <NextTopLoader showSpinner={false} color='#0049AC' height={4} />
        <Script src='/api/env' strategy={'beforeInteractive'}></Script>
        <Provider>{children}</Provider>
        <Toaster position='top-right' className='font-sans' richColors />
      </body>
    </html>
  )
}
