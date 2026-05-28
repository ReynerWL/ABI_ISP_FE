/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'minio-api.empatnusabangsa.com' }
    ]
  }
}

module.exports = nextConfig
