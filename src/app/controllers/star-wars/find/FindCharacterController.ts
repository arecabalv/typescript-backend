import { BaseController } from '@app/controllers/BaseController';
import { CharacterFinder } from '@context/star-wars/character/application/CharacterFinder';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export class FindCharacterController implements BaseController {
  constructor(private characterFinder: CharacterFinder) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const id = req.params.id;

    const character = await this.characterFinder.run(id);
    res.status(httpStatus.OK).send(character.toPrimitives());
  }
}
