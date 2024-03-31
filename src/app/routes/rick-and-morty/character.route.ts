import { Router, Request, Response, NextFunction } from 'express';
import container from '@app/dependency-injection';
import { FindCharacterController } from '@app/controllers/rick-and-morty/find/FindCharacterController';

export const register = (router: Router) => {
  router.get('/rickandmorty/character/:id', (req: Request, res: Response, next: NextFunction) => {
    const characterController: FindCharacterController = container.get('RickAndMorty.Character.Find.Controller');
    return characterController.run(req, res, next);
  });
};
