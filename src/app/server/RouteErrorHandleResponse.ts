import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import container from '../dependency-injection';
import Logger from '@context/shared/domain/Logger';

const logger: Logger = container.get('Shared.Logger');

export const RouteErrorHandlerResponse = (req: Request, res: Response, _next: NextFunction): Response => {
  printRequest(req);
  return res.status(httpStatus.BAD_REQUEST).send({ error: `😝 invalid method '${req.method}' or invalid request '${req.originalUrl}'. Please check documentation 🐥` });
};

const printRequest = (req: Request): void => {
  logger.error(`baseUrl: ${req.baseUrl}`)
  logger.error(`body: ${JSON.stringify(req.body)}`)
  logger.error(`headers: ${JSON.stringify(req.headers)}`)
  logger.error(`hostname: ${req.hostname}`)
  logger.error(`ip: ${req.ip}`)
  logger.error(`method: ${req.method}`)
  logger.error(`originalUrl: ${req.originalUrl}`)
  logger.error(`params: ${JSON.stringify(req.params)}`)
  logger.error(`query: ${JSON.stringify(req.query)}`)
  logger.error(`secure: ${JSON.stringify(req.secure)}`)
  logger.error(`subdomains: ${JSON.stringify(req.subdomains)}`)
  logger.error(`trailers: ${JSON.stringify(req.trailers)}`)
};
