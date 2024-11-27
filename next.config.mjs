/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sign-up",
        destination: "/auth/sign-up",
        permanent: true, // Set to true if this is a permanent redirect (HTTP 308)
      },
      {
        source: "/sign-in",
        destination: "/auth/sign-in",
        permanent: true, // Set to true if this is a permanent redirect (HTTP 308)
      },
    ];
  },
};

export default nextConfig;
