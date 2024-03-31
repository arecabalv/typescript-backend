import { Character } from '../class/Character';

export abstract class CharacterRepository {
  abstract findOne(id: number): Promise<Character>
}