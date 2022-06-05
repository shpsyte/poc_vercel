import _proxy from 'express-http-proxy';
// import AppError from './AppError';

const VHConfig = require('../../config');

export default function proxy() {
  return _proxy(VHConfig.apiBaseUrl, {
    limit: '2mb',
    async proxyReqOptDecorator(opts) {
      return new Promise(resolve => {
        resolve(opts);
      });
    },
  });
}
