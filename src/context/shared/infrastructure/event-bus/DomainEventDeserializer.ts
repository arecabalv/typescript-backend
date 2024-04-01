import { DomainEventClass } from '@context/shared/domain/DomainEvent';
import { DomainEventSubscribers } from './DomainEventSubscribers';

type DomainEventJSON = {
  type: string;
  aggregateId: string;
  attributes: string;
  id: string;
  occurredOn: string;
  maxRetries: number;
}

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscribers) {
    const mapping = new DomainEventDeserializer();
    subscribers.items.forEach((subscriber) => {
      subscriber.subscriberTo().forEach(mapping.registerEvent.bind(mapping));
    });

    return mapping;
  }

  private registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME;
    this.set(eventName, domainEvent);
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data as DomainEventJSON;
    const { type, aggregateId, attributes, id, occurredOn, maxRetries } = eventData;
    const eventClass = super.get(type);

    if (!eventClass) {
      throw Error(`DomainEvent mapping not found for event ${type}`);
    }

    return eventClass.fromPrimitives({
      aggregateId,
      attributes,
      occurredOn: new Date(occurredOn),
      eventId: id,
      maxRetries,
    });
  }
}
