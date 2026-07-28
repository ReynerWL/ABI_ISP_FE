/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'minio-api.bangun-kreatif.com' }
    ]
  }
}

module.exports = nextConfig
