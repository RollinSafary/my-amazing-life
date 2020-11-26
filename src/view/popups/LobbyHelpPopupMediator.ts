import LobbyScene from '../scenes/LobbyScene';
import LobbyHelpPopup from './LobbyHelpPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class LobbyHelpPopupMediator extends StandardPopupMediator<
  LobbyHelpPopup
> {
  public static NAME: string = 'LobbyHelpPopupMediator';

  constructor() {
    super(LobbyHelpPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LobbyScene.HELP_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case LobbyScene.HELP_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new LobbyHelpPopup());
  }

  protected onViewHideComplete(): void {
    super.onViewHideComplete();
    this.facade.removeMediator(LobbyHelpPopupMediator.NAME);
  }
}
