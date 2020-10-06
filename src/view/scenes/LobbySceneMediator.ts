import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiVOProxy from '../../model/UiVOProxy';
import BaseSceneMediator from './BaseSceneMediator';
import LobbyScene from './LobbyScene';

export default class LobbySceneMediator extends BaseSceneMediator<LobbyScene> {
  public static NAME: string = 'LobbySceneMediator';

  constructor() {
    super(LobbySceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION,
    );
  }

  public async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION:
        await this.startScene();
        this.viewComponent.setAvatarConfig(this.uiVOProxy.vo.avatar);
        this.updateButtons();
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected updateButtons(): void {
    this.viewComponent.updateSections({
      lifeStyle: true,
      personality: this.playerVOProxy.isLifeStyleComplete(),
      hobbies: this.playerVOProxy.isPersonalityComplete(),
      skills: this.playerVOProxy.isHobbiesComplete(),
    });
    this.playerVOProxy.vo.saved_result_exist !== 'false' &&
      this.viewComponent.showResultsButton();
  }

  protected setView(): void {
    const scene: LobbyScene = new LobbyScene();
    this.sceneManager.add(LobbyScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
  }

  get uiVOProxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }

  get playerVOProxy(): PlayerVOProxy {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME);
  }
}
