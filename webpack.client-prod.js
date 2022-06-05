const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const clientConfig = require('./webpack.client');

const config = {
  mode: 'production',
  cache: false,
  plugins: [
    // new webpack.DefinePlugin({ // <-- key to reducing React's size
    //   'process.env': {
    //     'NODE_ENV': "production"
    //   }
    // }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks ,
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      compressionOptions: { level: 9 },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ cache: false })],
  },
};

module.exports = merge(clientConfig, config);
