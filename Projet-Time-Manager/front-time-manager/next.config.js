/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_HUB: 'http://localhost:80/api',
        secretKey: 'CF6ndscSg7mSAxDLzQmkEqGfl0jdUEWF',
        salt: '1685984923',
      },
}

module.exports = nextConfig
