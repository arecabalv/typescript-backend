import { BaseController } from '@app/controllers/BaseController';
import { QueryBus } from '@context/shared/domain/cqrs/QueryBus';
import { logRequest } from '@context/shared/infrastructure/decorators/LogRequest';
import { FindCharacterQuery } from '@context/star-wars/character/application/find/FindCharacterQuery';
import { FindCharacterResponse } from '@context/star-wars/character/application/find/FindCharacterResponse';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export class FindCharacterController implements BaseController {
  constructor(private queryBus: QueryBus) {}

  @logRequest('FindCharacterController')
  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const id = req.params.id;

    const query = new FindCharacterQuery(id);
    const { character } = await this.queryBus.ask<FindCharacterResponse>(query);

    res.status(httpStatus.OK).send(character.toPrimitives());
  }
}
