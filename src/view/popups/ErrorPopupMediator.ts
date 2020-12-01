import { ERROR_CODE } from '../../constants/Constants';
import { gameConfig } from '../../constants/GameConfig';
import SignInCommand from '../../controller/player/SignInCommand';
import RegistrationView from '../components/login/registration/RegistrationView';
import SignInView from '../components/login/signIn/SignInView';
import AvatarScene from '../scenes/AvatarScene';
import ErrorPopup from './ErrorPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class ErrorPopupMediator extends StandardPopupMediator<
  ErrorPopup
> {
  public static NAME: string = 'ErrorPopupMediator';

  constructor() {
    super(ErrorPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      SignInView.ERROR_NOTIFICATION,
      RegistrationView.ERROR_NOTIFICATION,
      SignInCommand.ERROR_NOTIFICATION,
      AvatarScene.ERROR_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case SignInView.ERROR_NOTIFICATION:
      case RegistrationView.ERROR_NOTIFICATION:
      case SignInCommand.ERROR_NOTIFICATION:
      case AvatarScene.ERROR_NOTIFICATION:
        const errorCode: ERROR_CODE = args[0];
        this.showView(
          gameConfig.canvasWidth * 0.5,
          gameConfig.canvasHeight * 0.5,
          errorCode,
        );
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new ErrorPopup());
  }
}
