import 'dotenv/config';
const env = (key: string) => {
  return process.env[key];
};

export default {
  PORT: env('PORT') ?? 3000,
  ENVIRONMENT: env('ENVIRONMENT') ?? 'DEVELOP',
  LOGGER_LEVELS: {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
  },
  REDIS: 
  {
    TIMEOUT: parseInt(env('REDIS_TIMEOUT') ?? '500'),
    CONNECTIONS: [
      {
        CACHE: 'typescript-backend',
        URL: env('REDIS_TEMPLATE') ?? 'redis://localhost:6379',
      },
    ],
  },
};
