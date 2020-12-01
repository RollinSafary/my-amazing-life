import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';
import { PlayerVO } from '../../model/vo/PlayerVO';
import RegistrationView from '../../view/components/login/registration/RegistrationView';
import RegisterNewPlayerCommand from './RegisterNewPlayerCommand';
import RegisterPlayerVOProxyCommand from './RegisterPlayerVOProxyCommand';

export default class PlayAsGuestCommand extends AsyncMacroCommand<
  SimpleCommand
> {
  public async execute(notificationName: string): Promise<void> {
    this.facade.registerCommand(
      RegistrationView.FORM_COMPLETE_NOTIFICATION,
      RegisterNewPlayerCommand,
    );
    const playerData: PlayerVO = new PlayerVO(null);
    super.execute(notificationName, playerData);
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterPlayerVOProxyCommand);
  }
}
