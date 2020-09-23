import { SimpleCommand } from '@candywings/pure-mvc';
import PlayerVOProxy from '../../model/PlayerVOProxy';
import PlayerVO from '../../model/vo/PlayerVO';
import { getUserDataByEmail } from '../../view/utils/FirebaseUtils';

export default class CheckAndRegisterPlayerVOProxyCommand extends SimpleCommand {
  public static NAME: string = 'CheckAndRegisterPlayerVOProxyCommand';
  public static ACCOUNT_DOES_NOT_EXIST_NOTIFICATION = `${CheckAndRegisterPlayerVOProxyCommand.NAME}AccountDoesNotExistNotification`;
  public async execute(notificationName: string, email: string): Promise<void> {
    const data: PlayerVO = await getUserDataByEmail(email);
    if (data) {
      this.facade.registerProxy(new PlayerVOProxy(data));
    } else {
      this.sendNotification(
        CheckAndRegisterPlayerVOProxyCommand.ACCOUNT_DOES_NOT_EXIST_NOTIFICATION,
        email,
      );
    }
  }
}
