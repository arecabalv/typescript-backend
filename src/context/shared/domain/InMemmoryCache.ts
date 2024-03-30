
import { Nullable } from '@context/shared/domain/Nullable';
import { AggregateRoot } from './AggregateRoot';

export interface InMemmoryCache<T extends AggregateRoot> {
  set(key: string, value: T, seconds?: number): Promise<void>
  get<C>(key: string): Promise<Nullable<C>>
}
