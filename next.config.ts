/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '/genhire-dashboard/',
  basePath: '/genhire-dashboard',
  images: {
    unoptimized: true,
  },
  // Disable server-side features since GitHub Pages is static
  trailingSlash: true,
}

export default nextConfig;

