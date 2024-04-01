import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher';
import { KafkaConnection } from './KafkaConnection';
import { KafkaEventBus } from './KafkaEventBus';
import { KafkaQueueFormatter } from './KafkaQueueFormatter';

export class KafkaEventBusFactory {
  static create(connection: KafkaConnection, domainEventFailoverPublisher: DomainEventFailoverPublisher, kafkaQueueFormatter: KafkaQueueFormatter): KafkaEventBus {
    return new KafkaEventBus(connection, domainEventFailoverPublisher, kafkaQueueFormatter);
  }
}
