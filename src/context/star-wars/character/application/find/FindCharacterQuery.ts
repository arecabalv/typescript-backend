import { Query } from '@context/shared/domain/cqrs/Query';

export class FindCharacterQuery implements Query {
  constructor(readonly id: string) {}
}
