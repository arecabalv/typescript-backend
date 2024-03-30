import config from '@app/config';
import container from '@app/dependency-injection';
import { AggregateRoot } from '@context/shared/domain/AggregateRoot';
import { InMemmoryCache } from '@context/shared/domain/InMemmoryCache';
import Logger from '@context/shared/domain/Logger';
import { Nullable } from '@context/shared/domain/Nullable';
import { timeout } from '@context/shared/domain/timeout';
import { RedisClientType } from 'redis';

export class RedisRepository<T extends AggregateRoot> implements InMemmoryCache<T> {
  private client: RedisClientType | null = null;
  private logger: Logger = container.get('Shared.Logger');

  constructor(private promisedClient: Promise<RedisClientType>, private context: string) { }

  async set(key: string, aggregateRoot: T, seconds: number = 60 * 60 * 24): Promise<void> {
    try {
      this.client = await timeout(this.promisedClient, config.REDIS.TIMEOUT, '⏰ Exceeded redis client timeout RedisRepository.set key:' + key);

      if (this.client?.isReady) await this.client.setEx(`${this.context}:${key}`, seconds, JSON.stringify(aggregateRoot));
    } catch (error: any) {
      this.logger.error(error.message || error.code || error);
    }
  }

  async get<T>(key: string): Promise<Nullable<T>> {
    try {
      this.client = await timeout(this.promisedClient, config.REDIS.TIMEOUT, '⏰ Exceeded redis client timeout RedisRepository.get key:' + key);

      if (this.client?.isReady) {
        const document = await this.client.get(`${this.context}:${key}`);
        if (document) return JSON.parse(document) as unknown as T;
      };
    } catch (error: any) {
      this.logger.error(error.message || error.code || error);
    }

    return null;
  }
}
