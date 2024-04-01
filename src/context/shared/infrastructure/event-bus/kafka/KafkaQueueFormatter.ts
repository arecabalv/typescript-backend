import { DomainEvent } from '@context/shared/domain/DomainEvent';
import { DomainEventSubscriber } from '@context/shared/domain/event/DomainEventSubscriber';

export class KafkaQueueFormatter {
  constructor(private moduleName: string) { }

  format(subscriber: DomainEventSubscriber<DomainEvent>) {
    const value = subscriber.constructor.name;
    const name = value
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
    return `${this.moduleName}.${name}`;
  }
}
