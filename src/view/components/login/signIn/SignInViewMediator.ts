import CheckAndRegisterPlayerVOProxyCommand from '../../../../controller/player/CheckAndRegisterPlayerVOProxyCommand';
import LoginScene from '../../../scenes/LoginScene';
import { getScene } from '../../../utils/phaser/PhaserUtils';
import BaseLoginViewMediator from '../BaseLoginViewMediator';
import SignInView from './SignInView';

export default class SignInViewMediator extends BaseLoginViewMediator<
  SignInView
> {
  public static NAME: string = 'SignInViewMediator';

  constructor() {
    super(SignInViewMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      LoginScene.SHOW_LOGIN_WINDOW_NOTIFICATION,
      CheckAndRegisterPlayerVOProxyCommand.NAME,
    );
  }

  protected handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case LoginScene.SHOW_LOGIN_WINDOW_NOTIFICATION:
        this.setView();
        this.setViewComponentListeners();
        this.viewComponent.show();
        break;
      case CheckAndRegisterPlayerVOProxyCommand.NAME:
        this.viewComponent.hide();
        break;
      default:
        break;
    }
  }

  protected setView(): void {
    const viewComponent: SignInView = new SignInView(getScene(LoginScene.NAME));
    this.setViewComponent(viewComponent);
  }
  protected setViewComponentListeners(): void {
    this.viewComponent.on(
      SignInView.NEXT_BUTTON_CLICKED_EVENT,
      this.onNextClick,
      this,
    );
  }

  protected onNextClick(email: string): void {
    this.sendNotification(SignInView.EMAIL_ENTERED_NOTIFICATION, email);
  }
}
