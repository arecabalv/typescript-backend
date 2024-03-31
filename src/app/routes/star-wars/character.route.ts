import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import { CreateCharacterController } from '@app/controllers/star-wars/create/CreateCharacterController';
import { FindCharacterController } from '@app/controllers/star-wars/find/FindCharacterController';

export const register = (router: Router) => {
  const createCharacterController: CreateCharacterController = container.get('StarWars.Character.Put.Controller');
  const findCharacterController: FindCharacterController = container.get('StarWars.Character.Get.Controller');

  router.put('/starwars/character/:id', (req: Request, res: Response, next: NextFunction) => {
    return createCharacterController.run(req, res, next);
  });

  router.get('/starwars/character/:id', (req: Request, res: Response, next: NextFunction) => {
    return findCharacterController.run(req, res, next);
  });
};
