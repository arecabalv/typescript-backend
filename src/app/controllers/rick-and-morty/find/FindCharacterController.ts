import { BaseController } from '@app/controllers/BaseController';
import { CharacterFinder } from '@context/rick-and-morty/character/application/CharacterFinder';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { logRequest } from '@context/shared/infrastructure/decorators/LogRequest';

export class FindCharacterController implements BaseController {
  constructor(private characterFinder: CharacterFinder) {}

  @logRequest('FindCharacterController')
  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const id = req.params.id;

    const character = await this.characterFinder.run(Number(id));
    res.status(httpStatus.OK).send(character.toPrimitives());
  }
}
