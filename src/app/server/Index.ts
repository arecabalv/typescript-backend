import container from '@app/dependency-injection';
import Logger from '../../context/shared/infrastructure/logger/WinstonLogger';
const logger: Logger = container.get('Shared.Logger');
import { Run } from './Run';

try {
  new Run().start().then();
} catch (error: any) {
  logger.error(`catch ${error}`)
  process.exit(1);
}

process.on('uncaughtException', (_err) => {
  logger.error(`uncaughtException ${_err.stack}`)
  process.exit(1);
});
