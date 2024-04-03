import { CommandHandler } from '@context/shared/domain/cqrs/CommandHandler';
import { CreateCharacterCommand } from '../../domain/CreateCharacterCommand';
import { Command } from '@context/shared/domain/cqrs/Command';
import { CharacterCreator } from './CharacterCreator';
import { CharacterId } from '../../domain/class/CharacterId';
import { CharacterName } from '../../domain/class/CharacterName';

export class CreateCharacterCommandHandler implements CommandHandler<CreateCharacterCommand> {
  constructor(private characterUpdater: CharacterCreator) {}

  subscribedTo(): Command {
    return CreateCharacterCommand;
  }

  handle(command: CreateCharacterCommand): Promise<void> {
    const id = new CharacterId(command.id);
    const name = new CharacterName(command.name);
    return this.characterUpdater.run(id, name);
  }
}
