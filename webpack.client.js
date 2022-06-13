const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const VHConfig = require('./config');

const config = {
  // Tell webpack the root file of our
  // server application
  entry: './client',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: `bundle-cli.js`,
    path: path.resolve(__dirname, 'public'),
  },
};

module.exports = merge(baseConfig, config);
