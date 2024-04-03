import { Character } from '../../domain/class/Character';
import { CharacterId } from '../../domain/class/CharacterId';
import { CharacterRepository } from '../../domain/contract/CharacterRepository';

export class CharacterFinder {
  constructor(private characterRepository: CharacterRepository) {}

  async run(id: string): Promise<Character> {
    const characterId = new CharacterId(id);
    return this.characterRepository.findById(characterId.toString());
  }
}
