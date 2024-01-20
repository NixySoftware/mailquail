import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    transpilePackages: ['@repo/ui']
};

export default nextConfig;
