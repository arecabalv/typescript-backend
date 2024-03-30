import config from '@app/config';
import RedisConfig from './RedisConfig';

export class RedisConfigFactory {
  static createConfig(cache: string): RedisConfig {
    const redisConfig = config.REDIS.CONNECTIONS.find((redisConfig) => {
      return redisConfig.CACHE === cache
    });

    if (!redisConfig) {
      throw new Error(`Redis config for caché ${cache} not found`);
    }

    return { url: redisConfig.URL }
  }
}
