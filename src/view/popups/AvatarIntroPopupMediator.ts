import AvatarScene from '../scenes/AvatarScene';
import AvatarIntroPopup from './AvatarIntroPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class AvatarIntroPopupMediator extends StandardPopupMediator<
  AvatarIntroPopup
> {
  public static NAME: string = 'AvatarIntroPopupMediator';

  constructor() {
    super(AvatarIntroPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(AvatarScene.STARTED_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case AvatarScene.STARTED_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new AvatarIntroPopup());
  }

  protected onAction(): void {
    super.onAction();
    this.sendNotification(AvatarIntroPopup.CLOSED_NOTIFICATION);
    this.facade.removeMediator(AvatarIntroPopupMediator.NAME);
  }
}
