import { ERROR_CODE } from '../../../../constants/Constants';
import PlayerVOProxy from '../../../../model/PlayerVOProxy';
import { IPlayerRegistrationData } from '../../../../model/vo/PlayerVO';
import LoginScene from '../../../scenes/LoginScene';
import { getScene } from '../../../utils/phaser/PhaserUtils';
import BaseLoginViewMediator from '../BaseLoginViewMediator';
import SignInView from '../signIn/SignInView';
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
      SignInView.SIGN_UP_NOTIFICATION,
      PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION,
    );
  }

  protected handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION:
        this.removeView();
        break;
      case SignInView.SIGN_UP_NOTIFICATION:
        this.setView();
        const email: string = args[0];
        const password: string = args[1];
        this.viewComponent.updateFields(email, password);
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
    this.setViewComponentListeners();
  }
  protected setViewComponentListeners(): void {
    this.viewComponent.on(RegistrationView.ERROR_EVENT, this.onError, this);
    this.viewComponent.on(RegistrationView.BACK_EVENT, this.onBack, this);
    this.viewComponent.on(
      RegistrationView.PLAY_AS_GUEST_EVENT,
      this.onGuest,
      this,
    );
    this.viewComponent.on(
      RegistrationView.FORM_COMPLETE_EVENT,
      this.onFormComplete,
      this,
    );
  }

  protected onBack(): void {
    this.removeView();
    this.sendNotification(RegistrationView.BACK_NOTIFICATION);
  }

  protected onGuest(): void {
    this.removeView();
    this.sendNotification(RegistrationView.PLAY_AS_GUEST_NOTIFICATION);
  }

  protected onError(errorCode: ERROR_CODE): void {
    this.sendNotification(RegistrationView.ERROR_NOTIFICATION, errorCode);
  }

  protected onFormComplete(data: IPlayerRegistrationData): void {
    this.sendNotification(RegistrationView.FORM_COMPLETE_NOTIFICATION, data);
  }

  private removeView(): void {
    if (!this.viewComponent) {
      return;
    }
    this.viewComponent.destroy();
    this.viewComponent = null;
  }
}
