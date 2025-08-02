/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activer l'output standalone pour la compatibilité avec Docker
  output: 'standalone',
  
  // [SOLUTION] Configuration expérimentale pour forcer l'inclusion des fichiers Prisma
  experimental: {
    // Cette option est cruciale. Elle demande à Next.js de copier les fichiers
    // nécessaires du client Prisma dans le build standalone.
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  transpilePackages: ['framer-motion'],
};

export default nextConfig;