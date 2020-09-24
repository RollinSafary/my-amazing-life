import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';
import { IPlayerRegistrationData } from '../../model/vo/PlayerVO';
import RegisterPlayerVOProxyCommand from './RegisterPlayerVOProxyCommand';

export default class RegisterNewPlayerCommand extends AsyncMacroCommand<
  SimpleCommand
> {
  public async execute(
    notificationName: string,
    data: IPlayerRegistrationData,
  ): Promise<void> {
    console.warn({ data });
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterPlayerVOProxyCommand);
  }
}
