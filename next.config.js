/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // typedRoutes: true,
  },
  redirects: async () => {
    return [
      {
        source: '/discord/permissions',
        destination: '/discord/bitfield',
        permanent: true,
      },
    ];
  }
  
  
};

module.exports = nextConfig;
