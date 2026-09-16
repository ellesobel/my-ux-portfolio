import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating Next.js badge in the bottom-left corner during dev. It
  // never shipped to production, but it sits over the page while developing.
  devIndicators: false,

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
