import { Character } from '../../domain/class/Character';
import { CharacterId } from '../../domain/class/CharacterId';
import { CharacterName } from '../../domain/class/CharacterName';
import { CharacterRepository } from '../../domain/contract/CharacterRepository';

export class CharacterCreator {
  constructor(private characterRepository: CharacterRepository) {}

  async run(id: CharacterId, name: CharacterName): Promise<void> {
    const character = Character.create(id, name);
    return this.characterRepository.create(character);
  }
}
