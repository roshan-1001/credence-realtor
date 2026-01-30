/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'new-projects-media.propertyfinder.com',
      },
      {
        protocol: 'https',
        hostname: 'files.alnair.ae',
      },
      {
        protocol: 'https',
        hostname: 'api.alnair.ae',
      },
    ],
    unoptimized: false,
  },
  // Enable static exports if needed
  // output: 'export',
}

module.exports = nextConfig
