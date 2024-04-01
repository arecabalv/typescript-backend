import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { KafkaConsumer } from './KafkaConsumer';
import { KafkaConnection } from './KafkaConnection';
import { DomainEvent } from '@context/shared/domain/DomainEvent';
import { DomainEventSubscriber } from '@context/shared/domain/event/DomainEventSubscriber';

export class KafkaConsumerFactory {
  constructor(private deserializer: DomainEventDeserializer, private connection: KafkaConnection) { }

  build(subscriber: DomainEventSubscriber<DomainEvent>) {
    return new KafkaConsumer(subscriber, this.deserializer, this.connection);
  }
}
