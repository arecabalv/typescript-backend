import config from '@app/config';
import KafkaConfig from '../../event-bus/kafka/KafkaConfig';
import { logLevel } from 'kafkajs';

export class KafkaConfigFactory {
  static createConfig(): KafkaConfig {
    return {
      brokers: [config.KAFKA.CONNECTIONS[0].BROKERS],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: config.KAFKA.CONNECTIONS[0].SASL.USERNAME,
        password: config.KAFKA.CONNECTIONS[0].SASL.PASSWORD,
      },
      logLevel: logLevel.ERROR,
      connectionTimeout: 5000,
    }
  }
}
