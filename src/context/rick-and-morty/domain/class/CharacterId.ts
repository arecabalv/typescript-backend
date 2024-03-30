import { NumberValueObject } from '@context/shared/domain/value-object/number';

export class CharacterId extends NumberValueObject {
  constructor(readonly value: number) {
    super(value);
  }
}