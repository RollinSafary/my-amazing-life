import SkillsScene from '../scenes/SkillsScene';
import SkillsHelpPopup from './SkillsHelpPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class SkillsHelpPopupMediator extends StandardPopupMediator<
  SkillsHelpPopup
> {
  public static NAME: string = 'SkillsHelpPopupMediator';

  constructor() {
    super(SkillsHelpPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(SkillsScene.HELP_CLICKED_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case SkillsScene.HELP_CLICKED_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new SkillsHelpPopup());
  }
}
