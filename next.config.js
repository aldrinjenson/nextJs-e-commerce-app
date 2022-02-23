/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "store.storeimages.cdn-apple.com",
      "www.lg.com",
      "www.gizmochina.com",
      "rukminim1.flixcart.com",
      "www.reliancedigital.in",
      "www.bhphotovideo.com",
    ],
  },
};

module.exports = nextConfig;
