import { BaseController } from '@app/controllers/BaseController';
import { CommandBus } from '@context/shared/domain/cqrs/CommandBus';
import { logRequest } from '@context/shared/infrastructure/decorators/LogRequest';
import { CreateCharacterCommand } from '@context/star-wars/character/domain/CreateCharacterCommand';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export class CreateCharacterController implements BaseController {
  constructor(private commandBus: CommandBus) {}

  @logRequest('CreateCharacterController')
  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { name } = req.body;
    const id = req.params.id;

    const createCharacterCommand = new CreateCharacterCommand(id, name);
    await this.commandBus.dispatch(createCharacterCommand);

    res.status(httpStatus.CREATED).send();
  }
}
