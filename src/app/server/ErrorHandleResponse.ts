import { NextFunction, Response, Request } from 'express';
import { BaseError } from '@context/shared/domain/BaseError';
import container from '../dependency-injection';
import { ZodError } from 'zod';
import httpStatus from 'http-status';
import { generateErrorMessage } from 'zod-error';
import Logger from '@context/shared/domain/Logger';

const logger: Logger = container.get('Shared.Logger');

export const ErrorHandlerResponse = (error: Error | any, req: Request, res: Response, _next: NextFunction): Response => {
  printError(error, req);
  if (error instanceof BaseError || error.status) return res.status(error.status).send(error.info);
  if (error instanceof ZodError || error.issues) return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: processZodError(error) });
  return res.status(500).send();
};

const processZodError = (error: ZodError): string => {
  return generateErrorMessage(error.issues, {
    transform: ({ errorMessage }) => {
      return errorMessage
    },
  });
}

const printError = (error: Error, req: Request): void => {
  logger.error(`--------- [REQUEST FAIL]: ${req.originalUrl} 
      --------- [REQUEST HEADERS]: ${JSON.stringify(req.headers)}
      --------- [REQUEST BODY]: ${JSON.stringify(req.body)}
      --------- [REQUEST PARAMS]: ${JSON.stringify(req.params)}
      --------- [REQUEST QUERY]: ${JSON.stringify(req.query)}
      --------- [ERROR STACK]: ${error.stack}
      --------- [ERROR MESSAGE]: ${error.message}
      --------- [ERROR NAME]: ${error.name}`);
};
