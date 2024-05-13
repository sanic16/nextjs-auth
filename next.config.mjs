/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'python-bucket-gt.s3.amazonaws.com',
                port: '',
                pathname: '/public/**',
            }
        ]
    }
};

export default nextConfig;
