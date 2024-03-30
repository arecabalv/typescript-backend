import { Character } from '@context/rick-and-morty/domain/class/Character';
import { CharacterRepository } from '@context/rick-and-morty/domain/contract/CharactersRepository';
import { NotFoundError } from '@context/shared/domain/errors/NotFoundError';
import AxiosClientFactory from '@context/shared/infrastructure/client/AxiosClientFactory';
import httpStatus from 'http-status';
import { APICharacterResponse } from '../interfaces/ApiCharacterResponse';

export class ApiCharacterRepository extends AxiosClientFactory implements CharacterRepository {
  async findOne(id: number): Promise<Character> {
    const response = await this.invoke<APICharacterResponse, void>(`https://rickandmortyapi.com/api/character/${id}`, 'GET');
    if (response.status === httpStatus.NOT_FOUND) throw new NotFoundError(`rick and morty character with id ${id} not found`);
    
    const { name, species } = response.data;
    return Character.fromPrimitives({ id, name, species });
  }
}