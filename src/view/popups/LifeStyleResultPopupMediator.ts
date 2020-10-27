import { gameConfig } from '../../constants/GameConfig';
import UiVOProxy from '../../model/UiVOProxy';
import { ILifeStyleChoices } from '../../model/vo/UiVO';
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
    this.subscribeToNotifications(
      LifeStyleScene.SHOW_RESULT_NOTIFICATION,
      LifeStyleScene.HELP_CLICKED_NOTIFICATION,
    );
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
      case LifeStyleScene.HELP_CLICKED_NOTIFICATION:
        const testObject: ILifeStyleChoices = {
          '0-1': 200,
          '0-2': 580,
          '1-0': 550,
          '1-3': 405.4,
          '2-0': 808,
          '2-3': 100,
          '4-0': 25,
          '4-3': 100,
          '5-0': 235,
          '5-3': 445.94,
          '6-1': 200,
          '6-2': 1256,
        };
        this.showView(
          gameConfig.canvasWidth / 2,
          gameConfig.canvasHeight / 2,
          testObject,
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
