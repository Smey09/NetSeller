import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/packages",
        destination: "/:locale#packages",
        permanent: false,
      },
      {
        source: "/:locale/contact",
        destination: "/:locale#contact",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

