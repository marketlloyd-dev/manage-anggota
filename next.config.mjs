/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob'],
    // esmExternals dihapus untuk menghindari error build
  },
};

export default nextConfig;