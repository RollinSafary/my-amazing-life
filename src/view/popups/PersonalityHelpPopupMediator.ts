import PersonalityScene from '../scenes/PersonalityScene';
import PersonalityHelpPopup from './PersonalityHelpPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class PersonalityHelpPopupMediator extends StandardPopupMediator<
  PersonalityHelpPopup
> {
  public static NAME: string = 'PersonalityHelpPopupMediator';

  constructor() {
    super(PersonalityHelpPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(PersonalityScene.HELP_CLICKED_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case PersonalityScene.HELP_CLICKED_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new PersonalityHelpPopup());
  }
}
