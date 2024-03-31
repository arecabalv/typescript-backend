import { v4 } from 'uuid';
import validate from 'uuid-validate';
import { BadRequestError } from '../errors/BadRequestError';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new BadRequestError(`<${this.constructor.name}> does not allow the value <${id}>`, 'VLO-001');
    }
  }

  toString(): string {
    return this.value;
  }
}
