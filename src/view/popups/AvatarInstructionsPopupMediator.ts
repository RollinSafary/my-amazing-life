import AvatarInstructionsPopup from './AvatarInstructionsPopup';
import AvatarIntroPopup from './AvatarIntroPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class AvatarInstructionsPopupMediator extends StandardPopupMediator<
  AvatarInstructionsPopup
> {
  public static NAME: string = 'AvatarInstructionsPopupMediator';

  constructor() {
    super(AvatarInstructionsPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(AvatarIntroPopup.CLOSED_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case AvatarIntroPopup.CLOSED_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new AvatarInstructionsPopup());
  }
}
