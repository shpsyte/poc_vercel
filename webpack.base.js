const CompressionPlugin = require('compression-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const path = require('path');

module.exports = {
  // Tell webpack to run babel on every file it runs through
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@helpers': path.resolve(__dirname, './helpers'),
      '@config': path.resolve(__dirname, './config.js'),
      '@services': path.resolve(__dirname, './client/services'),
      '@actions': path.resolve(__dirname, './client/actions'),
      '@components': path.resolve(__dirname, './client/components'),
      '@pages': path.resolve(__dirname, './client/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpge|gif|mp3|otf|eot|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    // new webpack.DefinePlugin({ // <-- key to reducing React's size
    //   'process.env': {
    //     'NODE_ENV': "production"
    //   }
    // }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      cache: true,
      compressionOptions: { level: 1 },
    }),
    new ImageminPlugin({ test: './client/assets/**' }),
  ],
};
