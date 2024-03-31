import { AggregateRoot } from '@context/shared/domain/AggregateRoot';
import { Uuid } from '@context/shared/domain/value-object/uuid';
import { CharacterName } from './CharacterName';

export class Character extends AggregateRoot {
  constructor(readonly id: Uuid, readonly name: CharacterName) {
    super();
  }

  static fromPrimitives(plainData: { name: string }, id: string) {
    return new Character(new Uuid(id), new CharacterName(plainData.name));
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
    }
  }
}
