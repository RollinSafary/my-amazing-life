import PersonalityScene from '../scenes/PersonalityScene';
import PersonalityTimeoutPopup from './PersonalityTimeoutPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class PersonalityTimeoutPopupMediator extends StandardPopupMediator<
  PersonalityTimeoutPopup
> {
  public static NAME: string = 'PersonalityTimeoutPopupMediator';

  constructor() {
    super(PersonalityTimeoutPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(PersonalityScene.TIMER_COMPLETE_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case PersonalityScene.TIMER_COMPLETE_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new PersonalityTimeoutPopup());
  }

  protected onAction(): void {
    super.onAction();
    this.sendNotification(PersonalityTimeoutPopup.OK_CLICKED_NOTIFICATION);
  }
}
