import { DomainEventSubscribers } from '@context/shared/infrastructure/event-bus/DomainEventSubscribers';
import { DomainEvent } from '../DomainEvent';

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: DomainEventSubscribers): void; // Dependencia circular
}
