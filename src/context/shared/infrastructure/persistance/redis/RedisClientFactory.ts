/* eslint-disable arrow-body-style */
import { RedisClientType, createClient } from 'redis';
import RedisConfig from './RedisConfig';
import Logger from '@context/shared/domain/Logger';
import { Nullable } from '@context/shared/domain/Nullable';

export class RedisClientFactory {
  private static clients: { [key: string]: RedisClientType } = {};

  static async createClient(contextName: string, config: RedisConfig, logger: Logger) {
    let client = RedisClientFactory.getClient(contextName);

    if (!client) {
      client = await RedisClientFactory.createAndConnectClient(config, logger);
      RedisClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<RedisClientType> {
    return RedisClientFactory.clients[contextName];
  }

  private static registerClient(client: RedisClientType, contextName: string): void {
    RedisClientFactory.clients[contextName] = client;
  }

  private static async createAndConnectClient(config: RedisConfig, logger: Logger): Promise<RedisClientType> {
    const client = createClient({
      ...config,
      socket: {
        reconnectStrategy() {
          logger.info(`<RedisClientFactory> Reconnecting to redis server on: ${new Date().toJSON()}`)
          return 5000;
        },
      },
    })
        .on('connect', () => logger.info(`<RedisClientFactory> [CONNECT ON]: ${new Date().toJSON()}`))
        .on('ready', () => logger.info(`<RedisClientFactory> [READY ON]: ${new Date().toJSON()}`))
        .on('error', (err) => logger.error(`<RedisClientFactory> [ERROR]: ${err} [ON]: ${new Date().toJSON()}`));

    try {
      await client.connect();
    } catch (err) {
      logger.error(`<RedisClientFactory> [CONNECT ERROR]: ${err} [ON]: ${new Date().toJSON()}`);
    }

    return client as RedisClientType;
  }
}
