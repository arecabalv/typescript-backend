import { Request, Response } from 'express';
import WinstonLogger from '../logger/WinstonLogger';

export function logRequest(className: string) {
  return function logRequest(_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const logger = new WinstonLogger();

    descriptor.value = async function(req: Request, res: Response, ...args: any[]) {
      const startTime = new Date();

      logger.info(`[${startTime.toISOString()}] Incoming request to Class ${className} Method ${propertyKey} with 
          headers: ${JSON.stringify(req.headers)}, cookies: ${req.cookies} and body: ${JSON.stringify(req.body)}`);

      try {
        const result = await Reflect.apply(originalMethod, this, [req, res, ...args]);

        const endTime = new Date();
        logger.info(`[${endTime.toISOString()}] Class ${className} Method ${propertyKey} executed successfully. 
        Execution time: ${endTime.getTime() - startTime.getTime()}ms`);

        return result;
      } catch (error) {
        throw error;
      } finally {
        res.on('finish', () => {
          const endTime = new Date();
          logger.info(`[${endTime.toISOString()}] Request to Class ${className} Method ${propertyKey} finished with status: ${res.statusCode}.`);
        });
      }
    };
  };
}
