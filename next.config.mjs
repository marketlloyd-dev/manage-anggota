// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@vercel/kv', '@vercel/blob'],
    esmExternals: 'loose',  // tambahkan ini untuk toleransi ESM di Windows
  },
};
export default nextConfig;