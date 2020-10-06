import UiVOProxy from '../../model/UiVOProxy';
import AvatarPreviewMediator from '../components/avatar/AvatarPreviewMediator';
import AvatarSkinsMediator from '../components/avatar/AvatarSkinsMediator';
import { delayRunnable } from '../utils/phaser/PhaserUtils';
import AvatarScene, { AvatarAction } from './AvatarScene';
import BaseSceneMediator from './BaseSceneMediator';
import LobbyScene from './LobbyScene';
import LoginScene from './LoginScene';

export default class AvatarSceneMediator extends BaseSceneMediator<
  AvatarScene
> {
  public static NAME: string = 'AvatarSceneMediator';

  constructor() {
    super(AvatarSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      LoginScene.LOGIN_COMPLETE_NOTIFICATION,
      LobbyScene.BACK_NOTIFICATION,
      UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case LobbyScene.BACK_NOTIFICATION:
      case LoginScene.LOGIN_COMPLETE_NOTIFICATION:
        this.sceneManager.start(AvatarScene.NAME);
        this.fadeScreenIn();
        this.registerViews();
        delayRunnable(this.viewComponent, 500, this.onAction, this);
        break;
      case UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION:
        this.stopScene();
        break;
      default:
        this.handleDefaultNotifications(notificationName);
        break;
    }
  }

  protected onSceneDestroy(): void {
    super.onSceneDestroy();
    this.facade.removeMediator(AvatarSceneMediator.NAME, this.id);
  }

  protected setView(): void {
    const scene: AvatarScene = new AvatarScene();
    this.sceneManager.add(AvatarScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      AvatarScene.ACTION_DONE_EVENT,
      this.onAction,
      this,
    );
  }

  protected registerViews(): void {
    this.facade.registerMediator(new AvatarPreviewMediator());
    this.facade.registerMediator(new AvatarSkinsMediator());
  }

  protected onAction(action: AvatarAction): void {
    action == AvatarAction.CLEAR
      ? this.sendNotification(AvatarScene.CLEAR_NOTIFICATION)
      : this.sendNotification(AvatarScene.SUBMIT_NOTIFICATION);
  }
}
