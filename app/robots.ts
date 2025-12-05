import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://mbinet.click/sitemap.xml',
    host: 'https://mbinet.click'
  }
}
