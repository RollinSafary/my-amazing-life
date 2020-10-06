import UiVOProxy from '../../../model/UiVOProxy';
import { BaseMediator } from '../../base/BaseMediator';
import AvatarSkins from './AvatarSkins';

export default class AvatarSkinsMediator extends BaseMediator<AvatarSkins> {
  public static NAME: string = 'AvatarSkinsMediator';

  constructor() {
    super(AvatarSkinsMediator.NAME, null);
  }

  public onRegister(): void {
    super.onRegister();
    this.setView();
    this.viewComponent.updateGender(this.proxy.vo.avatar.gender);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case UiVOProxy.AVATAR_CONFIGURATION_UPDATED_NOTIFICATION:
        this.viewComponent.updateGender(this.proxy.vo.avatar.gender);
        break;
      default:
        break;
    }
  }

  protected setView(): void {
    const viewComponent: AvatarSkins = new AvatarSkins();
    this.setViewComponent(viewComponent);
    this.setViewComponentListeners();
  }

  protected setViewComponentListeners(): void {
    this.viewComponent.on(
      AvatarSkins.SKIN_CLICKED_EVENT,
      this.onSkinClick,
      this,
    );
  }

  protected onSkinClick(skinName: string, index: number): void {
    this.sendNotification(
      AvatarSkins.SKIN_CLICKED_NOTIFICATION,
      skinName,
      index,
    );
  }

  get proxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
