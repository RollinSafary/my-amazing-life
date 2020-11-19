import HobbiesScene from '../scenes/HobbiesScene';
import HobbiesHelpPopup from './HobbiesHelpPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class HobbiesHelpPopupMediator extends StandardPopupMediator<
  HobbiesHelpPopup
> {
  public static NAME: string = 'HobbiesHelpPopupMediator';

  constructor() {
    super(HobbiesHelpPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      HobbiesScene.HELP_CLICKED_NOTIFICATION,
      HobbiesScene.START_GAME_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case HobbiesScene.START_GAME_NOTIFICATION:
      case HobbiesScene.HELP_CLICKED_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new HobbiesHelpPopup());
  }
}
