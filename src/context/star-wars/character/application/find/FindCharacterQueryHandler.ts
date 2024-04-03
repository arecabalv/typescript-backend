import { QueryHandler } from '@context/shared/domain/cqrs/QueryHandler';
import { FindCharacterQuery } from './FindCharacterQuery';
import { FindCharacterResponse } from './FindCharacterResponse';
import { Query } from '@context/shared/domain/cqrs/Query';
import { CharacterFinder } from './CharacterFinder';

export class FindCharacterQueryHandler implements QueryHandler<FindCharacterQuery, FindCharacterResponse> {
  constructor(private finder: CharacterFinder) {}

  subscribedTo(): Query {
    return FindCharacterQuery;
  }

  async handle(query: FindCharacterQuery): Promise<FindCharacterResponse> {
    const character = await this.finder.run(query.id);
    return new FindCharacterResponse(character);
  }
}
