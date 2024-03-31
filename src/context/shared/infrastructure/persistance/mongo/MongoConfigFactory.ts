import config from '@app/config';
import MongoConfig from './MongoConfig';

export class MongoConfigFactory {
  static createConfig(db: string): MongoConfig {
    const mongoConfig = config.MONGO.CONNECTIONS.find((mongoConfig) => {
      return mongoConfig.DATABASE === db
    });

    if (!mongoConfig) {
      throw new Error(`Mongo config for db ${db} not found`);
    }

    return { url: mongoConfig.URL }
  }
}
