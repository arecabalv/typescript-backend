import { DomainEvent, DomainEventClass } from '../DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscriberTo(): Array<DomainEventClass>;
  on(domainEvent: T): Promise<void>;
}
