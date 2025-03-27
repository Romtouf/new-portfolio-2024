/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ["localhost"],
    // Ajoutez ici les domaines d'images externes que vous utilisez
  },
  experimental: {
    outputFileTracingRoot: undefined,
    outputFileTracingIncludes: {
      "/**/*": ["./public/**/*"],
    },
  },
};

module.exports = nextConfig;
