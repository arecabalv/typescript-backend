import { SASLOptions, logLevel } from 'kafkajs';

type KafkaConfig = {
  brokers: string[],
  ssl?: boolean,
  sasl?: SASLOptions,
  logLevel: logLevel,
  connectionTimeout: number,
}

export default KafkaConfig;
