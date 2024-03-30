export abstract class NumberValueObject {
  constructor(readonly value: number) {}

  equalsTo(otherNumber: number): boolean {
    return this.value === otherNumber;
  }

  isBiggerThan(otherNumber: number): boolean {
    return this.value > otherNumber;
  }

  isSmallerThan(otherNumber: number): boolean {
    return this.value < otherNumber;
  }

  isEmpty(): boolean {
    return !this.value;
  }
}
