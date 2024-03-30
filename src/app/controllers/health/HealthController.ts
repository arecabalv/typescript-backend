import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { version } from '@root/package.json';

export default class HealthController implements BaseController {
  async run(_req: Request, res: Response, _next: NextFunction) {
    const data = { status: 'UP', version };
    res.status(httpStatus.OK).send(data);
  }
}
