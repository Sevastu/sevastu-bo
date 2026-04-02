import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Ensure apiUrl does not have a trailing slash to prevent malformed rewrite rules
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://sevastu-be.onrender.com').replace(/\/$/, '');
    
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
