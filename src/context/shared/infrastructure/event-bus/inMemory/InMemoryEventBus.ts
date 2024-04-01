import EventEmitter from 'events';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { DomainEvent } from '@context/shared/domain/DomainEvent';
import { EventBus } from '@context/shared/domain/event/EventBus';

export class InMemoryEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => {
      return this.emit(event.eventName, event)
    })
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach((subscriber) => {
      subscriber.subscriberTo().forEach((event) => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
