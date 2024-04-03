import { Character } from '../../domain/class/Character';

export class FindCharacterResponse {
  constructor(readonly character: Character) {}
}
