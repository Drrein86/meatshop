import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['kezez-place.com'], // הוספת הדומיין של התמונות שלך
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // כל בקשה ל-`/api/*`
        destination: 'https://kezez-place.com/api/:path*', // תנותב ל-API
      },
    ];
  },
};

export default nextConfig;
