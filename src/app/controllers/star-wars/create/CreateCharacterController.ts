import { BaseController } from '@app/controllers/BaseController';
import { logRequest } from '@context/shared/infrastructure/decorators/LogRequest';
import { CharacterUpdater } from '@context/star-wars/character/application/CharacterUpdater';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export class CreateCharacterController implements BaseController {
  constructor(private characterUpdater: CharacterUpdater) {}

  @logRequest('CreateCharacterController')
  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { name } = req.body;
    const id = req.params.id;
    await this.characterUpdater.run(name, id);
    res.status(httpStatus.CREATED).send();
  }
}
