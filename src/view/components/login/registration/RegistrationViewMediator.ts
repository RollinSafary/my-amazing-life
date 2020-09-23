import CheckAndRegisterPlayerVOProxyCommand from '../../../../controller/player/CheckAndRegisterPlayerVOProxyCommand';
import LoginScene from '../../../scenes/LoginScene';
import { getScene } from '../../../utils/phaser/PhaserUtils';
import BaseLoginViewMediator from '../BaseLoginViewMediator';
import RegistrationView from './RegistrationView';

export default class RegistrationViewMediator extends BaseLoginViewMediator<
  RegistrationView
> {
  public static NAME: string = 'RegistrationViewMediator';
  constructor() {
    super(RegistrationViewMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      CheckAndRegisterPlayerVOProxyCommand.ACCOUNT_DOES_NOT_EXIST_NOTIFICATION,
    );
  }

  protected handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case CheckAndRegisterPlayerVOProxyCommand.ACCOUNT_DOES_NOT_EXIST_NOTIFICATION:
        this.setView();
        break;
      default:
        break;
    }
  }

  protected setView(): void {
    const viewComponent: RegistrationView = new RegistrationView(
      getScene(LoginScene.NAME),
    );
    this.setViewComponent(viewComponent);
  }
  protected setViewComponentListeners(): void {
    //
  }
}
