
import { NotFoundError } from '@context/shared/domain/errors/NotFoundError';
import AxiosClientFactory from '@context/shared/infrastructure/client/AxiosClientFactory';
import httpStatus from 'http-status';
import { APICharacterResponse } from '../interfaces/ApiCharacterResponse';
import { CharacterRepository } from '../../domain/contract/CharactersRepository';
import { Character } from '../../domain/class/Character';

export class ApiCharacterRepository extends AxiosClientFactory implements CharacterRepository {
  async findOne(id: number): Promise<Character> {
    const response = await this.invoke<APICharacterResponse, void>(`https://rickandmortyapi.com/api/character/${id}`, 'GET');
    if (response.status === httpStatus.NOT_FOUND) throw new NotFoundError(`rick and morty character with id ${id} not found`, 'R&M-001');

    const { name, species } = response.data;
    return Character.fromPrimitives({ id, name, species });
  }
}
