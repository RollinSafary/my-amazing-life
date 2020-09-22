import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';
import LoadingScene from './LoadingScene';

export default class LoadingSceneMediator extends BaseSceneMediator<
  LoadingScene
> {
  public static NAME: string = 'LoadingSceneMediator';

  constructor() {
    super(LoadingSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(BootScene.LOAD_COMPLETE_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE_NOTIFICATION:
        this.sceneManager.start(LoadingScene.NAME);
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected setView(): void {
    const scene: LoadingScene = new LoadingScene();
    this.sceneManager.add(LoadingScene.NAME, scene);
    this.setViewComponent(scene);
    this.setViewComponentListeners();
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      LoadingScene.LOAD_COMPLETE_EVENT,
      this.onLoadComplete,
      this,
    );
  }

  private async onLoadComplete(): Promise<void> {
    await this.fadeScreenOut();
    this.stopScene();
    this.sendNotification(LoadingScene.LOAD_COMPLETE_NOTIFICATION);
  }
}
