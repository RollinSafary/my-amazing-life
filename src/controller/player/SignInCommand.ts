import { AsyncMacroCommand, SimpleCommand } from '@candywings/pure-mvc';
import { ERROR_CODE } from '../../constants/Constants';
import { PlayerVO } from '../../model/vo/PlayerVO';
import { getUserDataByEmail } from '../../view/utils/FirebaseUtils';
import RegisterPlayerVOProxyCommand from './RegisterPlayerVOProxyCommand';

export default class SignInCommand extends AsyncMacroCommand<SimpleCommand> {
  public static NAME: string = 'SignInCommand';
  public static ERROR_NOTIFICATION = `${SignInCommand.NAME}ErrorNotification`;
  public async execute(
    notificationName: string,
    email: string,
    password: string,
  ): Promise<void> {
    const data: PlayerVO = await getUserDataByEmail(email);
    switch (true) {
      case !data:
        this.sendNotification(
          SignInCommand.ERROR_NOTIFICATION,
          ERROR_CODE.SIGN_IN_NOT_EXISTING_USER,
        );
        break;
      case !!data && data.password !== password:
        this.sendNotification(
          SignInCommand.ERROR_NOTIFICATION,
          ERROR_CODE.SIGN_IN_WRONG_PASSWORD,
        );
        break;
      default:
        super.execute(notificationName, data);
        break;
    }
  }

  public initializeMacroCommand(): void {
    this.addSubCommand(RegisterPlayerVOProxyCommand);
  }
}
