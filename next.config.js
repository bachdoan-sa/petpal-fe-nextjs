
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/petpal-c6642.appspot.com/**',
      },
    ],
  },
}
module.exports = nextConfig