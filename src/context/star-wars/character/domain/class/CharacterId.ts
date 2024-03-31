import { Uuid } from '@context/shared/domain/value-object/uuid';

export class CharacterId extends Uuid {
  constructor(value: string) {
    super(value);
  }
}
