/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/why',
        destination: '/',
      },
      {
        source: '/home',
        destination: '/home.html',
      },
      {
        source: '/letters',
        destination: '/founder-letters.html',
      },
      {
        source: '/founder-letters',
        destination: '/founder-letters.html',
      },
    ];
  },
};

export default nextConfig;
