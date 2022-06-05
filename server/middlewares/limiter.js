import { RateLimiterMemory } from 'rate-limiter-flexible';
import config from '@config';
import AppError from './AppError';

const limiterMemory = new RateLimiterMemory({
  keyPrefix: 'rateLimit',
  points: config.API_MAX_REQUEST_PER_SECOND, // 10 requests
  duration: config.API_REQUEST_TIME, // per 1 second by IP
  blockDuration: config.API_BLOCKDURATION, // total sec blocked
});

export default async function limiter(request, response, next) {
  try {
    await limiterMemory.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError(
      'Too Many Requests',
      429,
      {
        ip: request.ip,
        requestPerSecond: config.API_MAX_REQUEST_PER_SECOND,
        durationTime: config.API_REQUEST_TIME,
        blockDuration: config.API_BLOCKDURATION,
      },
      request,
    );
  }
}
