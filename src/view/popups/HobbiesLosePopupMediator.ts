import HobbiesScene from '../scenes/HobbiesScene';
import { HobbiesLoseAction, HobbiesLosePopup } from './HobbiesLosePopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class HobbiesLosePopupMediator extends StandardPopupMediator<
  HobbiesLosePopup
> {
  public static NAME: string = 'HobbiesLosePopupMediator';

  constructor() {
    super(HobbiesLosePopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(HobbiesScene.LIVES_SPENT_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case HobbiesScene.LIVES_SPENT_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new HobbiesLosePopup());
  }

  protected onAction(action: HobbiesLoseAction): void {
    super.onAction();
    switch (action) {
      case HobbiesLoseAction.PLAY_AGAIN:
        this.sendNotification(HobbiesLosePopup.PLAY_AGAIN_CLICKED_NOTIFICATION);
        break;
      case HobbiesLoseAction.MENU:
        this.sendNotification(HobbiesLosePopup.MENU_CLICKED_NOTIFICATION);
        break;
      default:
        break;
    }
  }
}
