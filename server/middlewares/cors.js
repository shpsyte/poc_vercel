import _cors from 'cors';
// import AppError from './AppError';

// precisa ser feito DEPOIS que a instancia do Axios for criada, hj esta estatica
// const whitelist = ['https://vanhack.dev', 'https://vanhack.com'];

// if (process.env.MODE === 'dev') {
//   whitelist.push('http://localhost:3000');
// }
// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new AppError('Not allowed by CORS', 403));
//     }
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

const corsOpt = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default function cors() {
  return _cors(corsOpt);
}
