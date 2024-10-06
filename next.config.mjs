/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/menu-semanal',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
