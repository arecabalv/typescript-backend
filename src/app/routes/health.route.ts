import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import HealthController from '@app/controllers/health/HealthController';

export const register = (router: Router) => {
  const controller: HealthController = container.get('Controller.Health');
  router.get('/health', (req: Request, res: Response, next: NextFunction) => {
    return controller.run(req, res, next);
  });
};
