import GameFacade from '../../GameFacade';
import BaseSceneMediator from './BaseSceneMediator';
import BootScene from './BootScene';

export default class BootSceneMediator extends BaseSceneMediator<BootScene> {
  public static NAME: string = 'BootSceneMediator';

  constructor() {
    super(BootSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(GameFacade.STARTUP_NOTIFICATION);
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case GameFacade.STARTUP_NOTIFICATION:
        this.sceneManager.start(BootScene.NAME);
        break;
      default:
        this.handleDefaultNotifications(notificationName);
        break;
    }
  }

  protected onSceneDestroy(): void {
    super.onSceneDestroy();
    this.facade.removeMediator(BootSceneMediator.NAME, this.id);
  }

  private async onLoadComplete(): Promise<void> {
    this.sceneManager.stop(BootScene.NAME);
    this.sceneManager.remove(BootScene.NAME);
    this.facade.sendNotification(BootScene.LOAD_COMPLETE_NOTIFICATION);
  }

  protected setView(): void {
    const scene: BootScene = new BootScene();
    this.sceneManager.add(BootScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      BootScene.LOAD_COMPLETE_EVENT,
      this.onLoadComplete,
      this,
    );
  }
}
