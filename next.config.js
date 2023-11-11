/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
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
