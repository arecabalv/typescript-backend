import { AggregateRoot } from '@context/shared/domain/AggregateRoot';
import { InMemmoryCache } from '@context/shared/domain/InMemmoryCache';
import { Nullable } from '@context/shared/domain/Nullable';
import { RedisClientType } from 'redis';

export class RedisRepository<T extends AggregateRoot> implements InMemmoryCache<T> {
  constructor(private _client: Promise<RedisClientType>, private context: string) { }

  async set(key: string, aggregateRoot: T, seconds: number = 60 * 60 * 24): Promise<void> {
    const document = { ...aggregateRoot.toPrimitives() };
    (await this._client).setEx(`${this.context}-${key}`, seconds, JSON.stringify(document));
  }

  async get<T>(key: string): Promise<Nullable<T>> {
    const document = await (await this._client).get(`${this.context}-${key}`);

    if (document) return JSON.parse(document) as unknown as T;

    return null;
  }
}
