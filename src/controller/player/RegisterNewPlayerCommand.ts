import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';
import { IPlayerRegistrationData, PlayerVO } from '../../model/vo/PlayerVO';
import { setUserDataAsync } from '../../view/utils/FirebaseUtils';
import RegisterPlayerVOProxyCommand from './RegisterPlayerVOProxyCommand';

export default class RegisterNewPlayerCommand extends AsyncMacroCommand<
  SimpleCommand
> {
  public async execute(
    notificationName: string,
    data: IPlayerRegistrationData,
  ): Promise<void> {
    const playerData: PlayerVO = new PlayerVO(data);
    setUserDataAsync(playerData);
    super.execute(notificationName, playerData);
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterPlayerVOProxyCommand);
  }
}
