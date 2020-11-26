import RegistrationView from '../../view/components/login/registration/RegistrationView';
import PlayerCommand from './PlayerCommand';
import RegisterGuestPlayerCommand from './RegisterGuestPlayerCommand';

export default class SaveCurrentPlayerCommand extends PlayerCommand {
  public static NAME: string = 'SaveCurrentPlayerCommand';
  public static REGISTER_USER_NOTIFICATION = `${SaveCurrentPlayerCommand.NAME}RegisterUserNotification`;
  public execute(): void {
    if (this.proxy.vo.guest) {
      this.facade.registerCommand(
        RegistrationView.FORM_COMPLETE_NOTIFICATION,
        RegisterGuestPlayerCommand,
      );
      this.sendNotification(
        SaveCurrentPlayerCommand.REGISTER_USER_NOTIFICATION,
      );
    } else {
      this.proxy.saveResults();
    }
  }
}
