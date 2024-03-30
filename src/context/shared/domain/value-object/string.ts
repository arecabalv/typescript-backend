export abstract class StringValueObject {
  constructor(readonly value: string) {}

  equalsTo(anotherValue: string): boolean {
    return this.value === anotherValue;
  }

  isEmpty(): boolean {
    return !this.value;
  }

  differentTo(anotherValue: string): boolean {
    return this.value !== anotherValue;
  }

  hasMoreCharacterThan(length = 30): boolean {
    return this.value.length > length ? true : false;
  }

  hasLessCharacterThan(length = 5): boolean {
    return this.value.length < length ? true : false;
  }

  toString(): string {
    return this.value;
  }

  numericString(value: string): boolean {
    if (this.differentTo(Number(value).toString())) return true;
    return false;
  }
}
