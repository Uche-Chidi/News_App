/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media.cnn.com',
      'www.nydailynews.com',
      'assets2.cbsnewsstatic.com',
      'imageio.forbes.com',
      'www.nj.com',
      's.yimg.com',
      'nypost.com',
      'www.yourtango.com',
      'media.wired.com',
      'cdn.vox-cdn.com',
      'ichef.bbci.co.uk',
      'gizmodo.com',
      'i.kinja-img.com',
      'i.insider.com',
      'cdn.mos.cms.futurecdn.net',
      'www.cnet.com',
      'readwrite.com',
      'venturebeat.com',
      'makezine.com',
      'omid.dev',
      'heise.cloudimg.io',
      'korben.info', // Add this domain
    ],
  },
};

export default nextConfig;
