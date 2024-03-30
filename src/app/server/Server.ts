import express from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import { hostname } from 'os';
import container from '@app/dependency-injection';
import { registerRoutes } from '../routes';
import { ErrorHandlerResponse } from './ErrorHandleResponse';
import { RouteErrorHandlerResponse } from './RouteErrorHandleResponse';
import Logger from '@context/shared/domain/Logger';

export class Server {
  public app = express();

  private readonly port: number;
  private httpServer?: http.Server;
  private logger: Logger;

  constructor(port: number) {
    this.port = port;
    this.logger = container.get('Shared.Logger');

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));

    const router = Router();
    this.app.use(router, ErrorHandlerResponse);
    this.app.use(router);
    registerRoutes(router);
    this.app.use(RouteErrorHandlerResponse);
  }

  listen = async (): Promise<void> => {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(this.port, () => {
        this.logger.info(`Server is running at ${hostname}:${this.port}`);
        this.logger.info('Press CTRL-C to stop');
        resolve();
      });
    });
  };

  getHTTPServer = () => {
    return this.httpServer;
  };

  stop = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  };
}
