import UiVOProxy from '../../model/UiVOProxy';
import BaseSceneMediator from './BaseSceneMediator';
import LifeStyleScene from './LifeStyleScene';
import LobbyScene, { LobbyAction } from './LobbyScene';

export default class LifeStyleSceneMediator extends BaseSceneMediator<
  LifeStyleScene
> {
  public static NAME: string = 'LifeStyleSceneMediator';

  constructor() {
    super(LifeStyleSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LobbyScene.GAME_CHOSE_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    switch (notificationName) {
      case LobbyScene.GAME_CHOSE_NOTIFICATION:
        const action: LobbyAction = args[0];
        if (action != LobbyAction.LIFESTYLE) {
          return;
        }
        this.sceneManager.start(LifeStyleScene.NAME);
        this.viewComponent.createPlayer(this.uiVOProxy.vo.avatar);
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected setView(): void {
    const scene: LifeStyleScene = new LifeStyleScene();
    this.sceneManager.add(LifeStyleScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
  }

  get uiVOProxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
