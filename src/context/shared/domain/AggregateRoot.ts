type PrimitivesValues = any;

export abstract class AggregateRoot {
  abstract toPrimitives(): PrimitivesValues;
}