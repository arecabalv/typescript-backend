import { InMemmoryCache } from '@context/shared/domain/InMemmoryCache';
import { CharacterRepository } from '../domain/contract/CharactersRepository';
import { Character } from '../domain/class/Character';

export class CharacterFinder {
  constructor(
    private repository: CharacterRepository,
    private cache: InMemmoryCache<Character>) {}

  async run(id: number): Promise<Character> {
    const cachedCharacter = await this.cache.get<Character>(id.toString());
    if (cachedCharacter) return new Character(cachedCharacter.id, cachedCharacter.name, cachedCharacter.species);

    const character = await this.repository.findOne(id);
    await this.cache.set(id.toString(), character);

    return character
  }
}
