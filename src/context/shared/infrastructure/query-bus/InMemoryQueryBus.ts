
import { Query } from '@context/shared/domain/cqrs/Query';
import { QueryHandlers } from './QueryHandlers';
import { QueryBus } from '@context/shared/domain/cqrs/QueryBus';
import { Response } from '@context/shared/domain/cqrs/Response';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlers) {}

  ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.get(query);

    return handler.handle(query) as unknown as Promise<R>;
  }
}
