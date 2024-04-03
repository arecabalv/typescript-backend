import { Command } from '@context/shared/domain/cqrs/Command';

export class CreateCharacterCommand extends Command {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
