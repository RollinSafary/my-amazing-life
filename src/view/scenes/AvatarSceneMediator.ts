import AvatarPreviewMediator from '../components/avatar/AvatarPreviewMediator';
import AvatarSkinsMediator from '../components/avatar/AvatarSkinsMediator';
import AvatarScene, { AvatarAction } from './AvatarScene';
import BaseSceneMediator from './BaseSceneMediator';
import LoginScene from './LoginScene';

export default class AvatarSceneMediator extends BaseSceneMediator<
  AvatarScene
> {
  public static NAME: string = 'AvatarSceneMediator';

  constructor() {
    super(AvatarSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LoginScene.LOGIN_COMPLETE_NOTIFICATION);
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case LoginScene.LOGIN_COMPLETE_NOTIFICATION:
        this.sceneManager.start(AvatarScene.NAME);
        this.fadeScreenIn();
        this.registerViews();
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
