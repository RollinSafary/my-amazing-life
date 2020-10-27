import { ERROR_CODE } from '../../../../constants/Constants';
import SignInCommand from '../../../../controller/player/SignInCommand';
import PlayerVOProxy from '../../../../model/PlayerVOProxy';
import LoginScene from '../../../scenes/LoginScene';
import { getScene } from '../../../utils/phaser/PhaserUtils';
import BaseLoginViewMediator from '../BaseLoginViewMediator';
import RegistrationView from '../registration/RegistrationView';
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
      RegistrationView.BACK_NOTIFICATION,
      LoginScene.SHOW_LOGIN_WINDOW_NOTIFICATION,
      PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION,
      SignInCommand.ERROR_NOTIFICATION,
    );
  }

  protected async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case RegistrationView.BACK_NOTIFICATION:
      case LoginScene.SHOW_LOGIN_WINDOW_NOTIFICATION:
        this.setView();
        this.viewComponent.show();
        break;
      case PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION:
        this.removeView();
        break;
      case SignInCommand.ERROR_NOTIFICATION:
        this.viewComponent.setListeners();
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
    this.viewComponent.on(SignInView.ERROR_EVENT, this.onError, this);
    this.viewComponent.on(SignInView.SIGN_IN_EVENT, this.onSignInClick, this);
    this.viewComponent.on(SignInView.SIGN_UP_EVENT, this.onSignUpClick, this);
  }

  protected onError(errorCode: ERROR_CODE): void {
    this.sendNotification(SignInView.ERROR_NOTIFICATION, errorCode);
  }

  protected onSignInClick(email: string, password: string): void {
    this.viewComponent.removeListeners();
    this.sendNotification(
      SignInView.SIGN_IN_NOTIFICATION,
      email.toLowerCase(),
      password,
    );
  }

  protected async onSignUpClick(
    email: string,
    password: string,
  ): Promise<void> {
    await this.removeView();
    this.sendNotification(
      SignInView.SIGN_UP_NOTIFICATION,
      email.toLowerCase(),
      password,
    );
  }

  private async removeView(): Promise<void> {
    if (!this.viewComponent) {
      return;
    }
    await this.viewComponent.hide();
    this.viewComponent.destroy();
    this.viewComponent = null;
  }

  private imitateLogin(): void {
    this.sendNotification(
      SignInView.SIGN_IN_NOTIFICATION,
      'test@gmail.com',
      'testgmail',
    );
  }
}
