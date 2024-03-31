import { NotFoundError } from '@context/shared/domain/errors/NotFoundError';
import { MongoRepository } from '@context/shared/infrastructure/persistance/mongo/MongoRepository';
import { Character } from '@context/star-wars/character/domain/class/Character';
import { CharacterRepository } from '@context/star-wars/character/domain/contract/CharacterRepository';

export class MongoCharacterRepository extends MongoRepository<Character> implements CharacterRepository {
  async findById(id: string): Promise<Character> {
    const collection = await this.collection();
    const character = await collection.findOne({ _id: id });

    if (character) return Character.fromPrimitives({ name: character.name }, id);
    throw new NotFoundError(`Character with id ${id} not found`, 'SW-001');
  }

  async create(character: Character): Promise<void> {
    return this.persist(character.id.toString(), character);
  }

  protected moduleName(): string {
    return 'character'
  }
}
