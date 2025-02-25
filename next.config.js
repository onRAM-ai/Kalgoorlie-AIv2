/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['wterdonskdvfowdogvfc.supabase.co'],
    unoptimized: true
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Optimize fonts
  optimizeFonts: true,
  // Disable SWC minifier due to WebContainer limitations
  swcMinify: false,
  // Add environment variables that need to be exposed to the browser
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  // Disable experimental features for better compatibility
  experimental: {
    forceSwcTransforms: false
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
