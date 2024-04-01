/* eslint-disable no-console */
import { CompressionTypes, IHeaders, Kafka, KafkaMessage, logLevel } from 'kafkajs';
import KafkaConfig from './KafkaConfig';

export class KafkaConnection {
  private kafka: Kafka;

  constructor(config: KafkaConfig) {
    this.kafka = new Kafka(config);
  }

  async publish(topic: string, content: Buffer, headers? : IHeaders | undefined) {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [{ value: content, headers }],
    });
    await producer.disconnect();
  }

  async consume(groupId: string, topics: Array<string>, onMessage: (topic: string, message: KafkaMessage) => {}) {
    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    consumer.logger().setLogLevel(logLevel.INFO);
    await consumer.subscribe({ topics, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        onMessage(topic, message);
      },
    })
  }

  async retry(topic: string, content: KafkaMessage) {
    const headers = this.incrementRedeliveryCount(content);
    return await this.publish(topic, content.value!, headers);
  }

  async deadLetter(message: KafkaMessage) {
    return await this.publish('dead.letter', message.value!);
  }

  private incrementRedeliveryCount(message: KafkaMessage) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message!.headers!['redelivery_count'] as string);
      message.headers!['redelivery_count'] = (count + 1).toString();
    } else {
      message.headers!['redelivery_count'] = '1';
    }

    return message.headers;
  }

  private hasBeenRedelivered(message: KafkaMessage) {
    return message.headers !== undefined && message.headers['redelivery_count'] !== undefined;
  }
}
