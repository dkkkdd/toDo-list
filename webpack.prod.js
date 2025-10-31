const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 75 },
              optipng: { enabled: true },
              pngquant: { quality: [0.65, 0.8] },
              gifsicle: { interlaced: false },
            },
          },
        ],
      },
    ],
  },
});