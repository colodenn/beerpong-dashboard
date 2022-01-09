/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: [
      'emojipedia-us.s3.dualstack.us-west-1.amazonaws.com',
      'media1.giphy.com',
      '*',
      'gitlab-iwi.dfki.de',
      'thumbs.gfycat.com',
      'i.imgur.com',
      'media3.giphy.com',
    ],
  },
  reactStrictMode: true,
  disableStaticImages: true,
  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
