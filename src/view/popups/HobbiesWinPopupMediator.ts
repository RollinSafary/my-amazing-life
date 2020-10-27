import { gameConfig } from '../../constants/GameConfig';
import UiVOProxy from '../../model/UiVOProxy';
import HobbiesScene from '../scenes/HobbiesScene';
import HobbiesWinPopup, { HobbiesWinPopupAction } from './HobbiesWinPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class HobbiesWinPopupMediator extends StandardPopupMediator<
  HobbiesWinPopup
> {
  public static NAME: string = 'HobbiesWinPopupMediator';

  constructor() {
    super(HobbiesWinPopupMediator.NAME);
  }
  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      UiVOProxy.HOBBIES_GAME_COMPLETE_NOTIFICATION,
      HobbiesScene.HELP_CLICKED_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case UiVOProxy.HOBBIES_GAME_COMPLETE_NOTIFICATION:
        const cluster: string = args[0];
        this.showView(
          gameConfig.canvasWidth / 2,
          gameConfig.canvasHeight / 2,
          cluster,
        );
        break;
      case HobbiesScene.HELP_CLICKED_NOTIFICATION:
        this.showView(
          gameConfig.canvasWidth / 2,
          gameConfig.canvasHeight / 2,
          'it',
        );
        break;

      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new HobbiesWinPopup());
  }

  protected onAction(action: HobbiesWinPopupAction): void {
    super.onAction();
    action === HobbiesWinPopupAction.PLAY_AGAIN
      ? this.sendNotification(HobbiesWinPopup.PLAY_AGAIN_NOTIFICATION)
      : this.sendNotification(HobbiesWinPopup.MENU_CLICKED_NOTIFICATION);
  }
}
