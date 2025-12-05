import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mbinet.click'

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 1
    },
    {
      url: `${base}/beranda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ]
}
