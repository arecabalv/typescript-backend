import { CharacterRepository } from '../domain/contract/CharactersRepository';
import { Character } from '../domain/class/Character';

export class CharacterFinder {
  constructor(private repository: CharacterRepository) {}

  async run(id: number): Promise<Character> {
    return this.repository.findOne(id);
  }
}