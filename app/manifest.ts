// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MBINet',
    short_name: 'MBINet',
    description: 'Layanan Internet Cepat & Stabil dari MBINet.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0099ff',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: '/web-app-manifest-512x512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ]
  }
}
