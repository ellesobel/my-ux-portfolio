import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Figma/Web Dev sections became UI & Design/Coding, so their routes moved
  // too. Keep the old paths working for anything already linking to them.
  async redirects() {
    return [
      { source: "/figma", destination: "/design", permanent: true },
      { source: "/webdev", destination: "/coding", permanent: true },
    ];
  },
};

export default nextConfig;
