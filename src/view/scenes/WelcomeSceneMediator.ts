import BaseSceneMediator from './BaseSceneMediator';
import LoadingScene from './LoadingScene';
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
        await this.startScene();
        this.viewComponent.startShowingAnimation();
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected setView(): void {
    const scene: WelcomeScene = new WelcomeScene();
    this.sceneManager.add(WelcomeScene.NAME, scene);
    this.setViewComponent(scene);
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
    await this.stopScene();
    this.sendNotification(WelcomeScene.START_BUTTON_CLICKED_NOTIFICATION);
  }
}
