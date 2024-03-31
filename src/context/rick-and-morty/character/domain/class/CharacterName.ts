import { StringValueObject } from '@context/shared/domain/value-object/string';

export class CharacterName extends StringValueObject {
  constructor(readonly value: string) {
    super(value);
  }
}