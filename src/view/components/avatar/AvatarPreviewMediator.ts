import UiVOProxy from '../../../model/UiVOProxy';
import { BaseMediator } from '../../base/BaseMediator';
import AvatarPreview from './AvatarPreview';

export default class AvatarPreviewMediator extends BaseMediator<AvatarPreview> {
  public static NAME: string = 'AvatarPreviewMediator';

  constructor() {
    super(AvatarPreviewMediator.NAME, null);
  }

  public onRegister(): void {
    this.setView();
    this.updateAvatar();
  }

  public onRemove(): void {
    this.viewComponent &&
      this.viewComponent.active &&
      this.viewComponent.destroy();
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION,
      UiVOProxy.AVATAR_CONFIGURATION_CLEARED_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION:
      case UiVOProxy.AVATAR_CONFIGURATION_CLEARED_NOTIFICATION:
        this.updateAvatar();
        break;
      default:
        break;
    }
  }

  protected updateAvatar(): void {
    this.viewComponent.updateAvatar(this.proxy.vo.avatar);
  }

  protected setView(): void {
    const viewComponent: AvatarPreview = new AvatarPreview();
    this.setViewComponent(viewComponent);
    this.setViewComponentListeners();
  }

  protected setViewComponentListeners(): void {
    this.viewComponent.on(
      AvatarPreview.GENDER_BUTTON_CLICK_EVENT,
      this.onGenderClick,
      this,
    );
  }

  protected onGenderClick(gender: string): void {
    this.sendNotification(
      AvatarPreview.GENDER_BUTTON_CLICKED_NOTIFICATION,
      'gender',
      gender,
    );
  }

  get proxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
