import type { NextConfig } from "next";

const storageUrl =
  process.env.AWS_PUBLIC_URL || process.env.AWS_ENDPOINT_URL_S3;
let storageHost: string | undefined;

if (storageUrl) {
  try {
    storageHost = new URL(storageUrl).hostname;
  } catch {
    storageHost = undefined;
  }
}

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "**.neon.tech",
  },
  {
    protocol: "https",
    hostname: "**.amazonaws.com",
  },
];

if (storageHost) {
  remotePatterns.push({
    protocol: "https",
    hostname: storageHost,
  });
}

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
