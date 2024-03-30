import { BaseController } from '@app/controllers/BaseController';
import { CharacterFinder } from '@context/rick-and-morty/application/CharacterFinder';
import { Request, Response, NextFunction } from 'express';

export class FindCharacterController implements BaseController {
  constructor(private characterFinder: CharacterFinder) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const id = req.params.id;

    const character = await this.characterFinder.run(Number(id));
    res.status(200).send(character.toPrimitives());
  }
}
