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
  KAFKA: {
    CONNECTIONS: [
      {
        BROKERS: env('KAFKA_BROKERS') ?? 'localhost:9092',
        CLIENT_ID: env('KAFKA_CLIENT_ID') ?? 'kafka-poc',
        SASL: {
          USERNAME: env('KAFKA_USERNAME') ?? '',
          PASSWORD: env('KAFKA_PASSWORD') ?? '',
          MECHANISM: env('KAFKA_MECHANISM') ?? '',
        },
      },
    ],
  },
  MONGO: {
    CONNECTIONS: [
      {
        URL: env('MONGO_TEMPLATE') ?? 'mongodb://localhost:27017/starwars',
        DATABASE: 'typesctipt-backend-starwars',
      },
    ],
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
