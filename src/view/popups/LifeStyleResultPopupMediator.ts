import { gameConfig } from '../../constants/GameConfig';
import UiVOProxy from '../../model/UiVOProxy';
import LifeStyleScene from '../scenes/LifeStyleScene';
import LifeStyleResultPopup, {
  LifeStyleResultPopupAction,
} from './LifeStyleResultPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class LifeStyleResultPopupMediator extends StandardPopupMediator<
  LifeStyleResultPopup
> {
  public static NAME: string = 'LifeStylePopupResultPopupMediator';

  constructor() {
    super(LifeStyleResultPopupMediator.NAME);
  }
  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LifeStyleScene.SHOW_RESULT_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case LifeStyleScene.SHOW_RESULT_NOTIFICATION:
        const uiVOProxy: UiVOProxy = this.facade.retrieveProxy(UiVOProxy.NAME);
        this.showView(
          gameConfig.canvasWidth / 2,
          gameConfig.canvasHeight / 2,
          uiVOProxy.vo.lifeStyleChoices,
        );
        break;

      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new LifeStyleResultPopup());
  }

  protected onAction(action: LifeStyleResultPopupAction): void {
    super.onAction();
    action === LifeStyleResultPopupAction.PLAY_AGAIN
      ? this.sendNotification(LifeStyleResultPopup.PLAY_AGAIN_NOTIFICATION)
      : this.sendNotification(LifeStyleResultPopup.MENU_CLICKED_NOTIFICATION);
  }
}
