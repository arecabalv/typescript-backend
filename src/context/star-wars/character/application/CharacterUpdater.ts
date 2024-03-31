import { Character } from '../domain/class/Character';
import { CharacterRepository } from '../domain/contract/CharacterRepository';

export class CharacterUpdater {
  constructor(private characterRepository: CharacterRepository) {}

  async run(name: string, id: string): Promise<void> {
    const character = Character.fromPrimitives({ name }, id);
    return this.characterRepository.create(character);
  }
}
