import LifeStyleScene from '../scenes/LifeStyleScene';
import { LifeStyleHelpAction, LifestyleHelpPopup } from './LifestyleHelpPopup';
import StandardPopupMediator from './StandardPopupMediator';

export default class LifestyleHelpPopupMediator extends StandardPopupMediator<
  LifestyleHelpPopup
> {
  public static NAME: string = 'LifestyleHelpPopupMediator';

  constructor() {
    super(LifestyleHelpPopupMediator.NAME);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LifeStyleScene.HELP_CLICKED_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case LifeStyleScene.HELP_CLICKED_NOTIFICATION:
        this.showView();
        break;
      default:
        break;
    }
  }

  protected createView(): void {
    super.createView(new LifestyleHelpPopup());
  }

  protected onAction(action: LifeStyleHelpAction): void {
    action === LifeStyleHelpAction.CONTINUE
      ? this.viewComponent.showNextPart()
      : super.onAction();
  }
}
