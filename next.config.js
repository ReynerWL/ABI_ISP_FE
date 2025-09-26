/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'file.bangun-kreatif.com' }]
  }
}

module.exports = nextConfig
