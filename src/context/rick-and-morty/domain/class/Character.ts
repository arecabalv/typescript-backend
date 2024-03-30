import { AggregateRoot } from '@context/shared/domain/AggregateRoot';
import { CharacterId } from './CharacterId';
import { CharacterName } from './CharacterName';
import { CharacterSpecies } from './CharacterSpecies';

export class Character extends AggregateRoot {
  constructor(readonly id: CharacterId, readonly name: CharacterName, readonly species: CharacterSpecies) {
    super();
  }

  static fromPrimitives(plainData: { id: number; name: string; species: string; }): Character {
    return new Character(
      new CharacterId(plainData.id),
      new CharacterName(plainData.name),
      new CharacterSpecies(plainData.species)
    );
  }
  
  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      species: this.species.value
    }
  }
}