import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { KafkaConnection } from './KafkaConnection';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { KafkaConsumerFactory } from './KafkaConsumerFactory';
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher';
import { KafkaQueueFormatter } from './KafkaQueueFormatter';
import { Logger } from 'winston';
import container from '@app/dependency-injection';
import { EventBus } from '@context/shared/domain/event/EventBus';
import { DomainEvent } from '@context/shared/domain/DomainEvent';
import { DomainEventSubscriber } from '@context/shared/domain/event/DomainEventSubscriber';

export class KafkaEventBus implements EventBus {
  private connection: KafkaConnection;
  private domainEventFailoverPublisher: DomainEventFailoverPublisher;
  private kafkaQueueFormatter: KafkaQueueFormatter;
  private logger: Logger = container.get('Shared.Logger');

  constructor(connection: KafkaConnection, domainEventFailoverPublisher: DomainEventFailoverPublisher, kafkaQueueFormatter: KafkaQueueFormatter) {
    this.connection = connection;
    this.domainEventFailoverPublisher = domainEventFailoverPublisher
    this.kafkaQueueFormatter = kafkaQueueFormatter;
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        const content = this.toBuffer(event);
        await this.connection.publish(event.eventName, content);
      } catch (error) {
        this.logger.error(`[ PUBLISH KAFKA ERROR ] DomainEvent: ${event.eventName}, OcurredOn: ${event.occurredOn}`);
        this.domainEventFailoverPublisher.publish(event);
      }
    }
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    const deserializer = DomainEventDeserializer.configure(subscribers);
    const consumerFactory = new KafkaConsumerFactory(deserializer, this.connection);
    for (const subscriber of subscribers.items) {
      const groupId = this.kafkaQueueFormatter.format(subscriber);
      const kafkaConsumer = consumerFactory.build(subscriber);
      const topics = this.findTopics(subscriber);

      await this.connection.consume(groupId, topics, kafkaConsumer.onMessage.bind(kafkaConsumer))
    }
  }

  private findTopics(subscriber: DomainEventSubscriber<DomainEvent>): Array<string> {
    const topics: Array<string> = [];
    subscriber.subscriberTo().forEach((eventName) => {
      return topics.push(eventName.EVENT_NAME)
    });

    return topics;
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventJsonSerializer.serialize(event);

    return Buffer.from(eventPrimitives);
  }
}

