const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './api',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, 'public/build'),
  },

  externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
