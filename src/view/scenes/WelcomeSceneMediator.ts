import BaseSceneMediator from './BaseSceneMediator';
import LoadingScene from './LoadingScene';
import ServiceScene from './ServiceScene';
import WelcomeScene from './WelcomeScene';

export default class WelcomeSceneMediator extends BaseSceneMediator<
  WelcomeScene
> {
  public static NAME: string = 'WelcomeSceneMediator';

  constructor() {
    super(WelcomeSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LoadingScene.LOAD_COMPLETE_NOTIFICATION);
  }

  public async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case LoadingScene.LOAD_COMPLETE_NOTIFICATION:
        this.startScene();
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected async onSceneReady(): Promise<void> {
    super.onSceneReady();
    this.sceneManager.bringToTop(ServiceScene.NAME);
    await this.fadeScreenIn();
    this.viewComponent.startShowingAnimation();
  }

  protected setView(): void {
    const scene: WelcomeScene = new WelcomeScene();
    this.sceneManager.add(WelcomeScene.NAME, scene);
    this.setViewComponent(scene);
    this.setViewComponentListeners();
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      WelcomeScene.START_THE_GAME_EVENT,
      this.onStartButtonClick,
      this,
    );
  }

  protected async onStartButtonClick(): Promise<void> {
    await this.fadeScreenOut();
    this.stopScene();
    this.sendNotification(WelcomeScene.START_BUTTON_CLICKED_NOTIFICATION);
  }
}
