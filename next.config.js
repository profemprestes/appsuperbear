/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  // basePath can be adjusted if deploying to a subpath
};

module.exports = nextConfig;
