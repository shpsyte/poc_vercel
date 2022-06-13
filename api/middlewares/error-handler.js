import * as Sentry from '@sentry/node';
import config from '@config';
import AppError from './AppError';

Sentry.init({
  dsn: config.SENTRY_CONFIG,
  environment: config.MODE,
  tracesSampleRate: 1.0,
});

export default function error(err, req, res, _) { // eslint-disable-line
  const isCustomError = err instanceof AppError;
  const error = {
    success: false,
    error: true,
    code: isCustomError ? err.statusCode : 500 || 500,
    message: isCustomError ? err.message : 'Internal server error',
    details: {
      code: isCustomError ? err.statusCode : 500 || 500,
      message: isCustomError
        ? err.message
        : 'Internal server error' || 'Internal server error',
      ...(err.details || ''),
    },
    request: isCustomError ? err.request : '',
    __rct: true,
  };

  Sentry.withScope(scope => {
    scope.setExtra('ip', req.ip);
    scope.setExtra('code', error.code);
    scope.setExtra('message', error.message);
    scope.setExtra('request', error.request);
    scope.setExtra('details', error.details);
    Sentry.captureException(
      new Error(
        `${isCustomError ? err.statusCode : 500 || 500}: ${
          isCustomError ? err.message : 'Internal server error'
        }`,
      ),
    );
  });

  return res.status(error.code).json(error);
}
