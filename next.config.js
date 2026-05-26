/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'minio-api.empatnusabangsa.com' }
    ]
  }
}

module.exports = nextConfig
