import { AggregateRoot } from '@context/shared/domain/AggregateRoot';
import { CharacterName } from './CharacterName';
import { CharacterId } from './CharacterId';

export class Character extends AggregateRoot {
  constructor(readonly id: CharacterId, readonly name: CharacterName) {
    super();
  }

  static create(id: CharacterId, name: CharacterName) {
    return new Character(id, name);
  }

  static fromPrimitives(plainData: { name: string }, id: string) {
    return new Character(new CharacterId(id), new CharacterName(plainData.name));
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
    }
  }
}
