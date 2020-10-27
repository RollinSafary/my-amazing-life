import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiVOProxy from '../../model/UiVOProxy';
import HobbiesWinPopup from '../popups/HobbiesWinPopup';
import LifeStyleResultPopup from '../popups/LifeStyleResultPopup';
import BaseSceneMediator from './BaseSceneMediator';
import LobbyScene, { LobbyAction } from './LobbyScene';
import PersonalityScene from './PersonalityScene';

export default class LobbySceneMediator extends BaseSceneMediator<LobbyScene> {
  public static NAME: string = 'LobbySceneMediator';

  constructor() {
    super(LobbySceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION,
      LifeStyleResultPopup.MENU_CLICKED_NOTIFICATION,
      PersonalityScene.MENU_CLICKED_NOTIFICATION,
      HobbiesWinPopup.MENU_CLICKED_NOTIFICATION,
      PlayerVOProxy.SAVE_COMPLETE_NOTIFICATION,
    );
  }

  public async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case PersonalityScene.MENU_CLICKED_NOTIFICATION:
      case LifeStyleResultPopup.MENU_CLICKED_NOTIFICATION:
      case HobbiesWinPopup.MENU_CLICKED_NOTIFICATION:
      case UiVOProxy.AVATAR_CONFIGURATION_SAVED_NOTIFICATION:
        await this.startScene();
        this.viewComponent.setAvatarConfig(this.uiVOProxy.vo.avatar);
        this.updateButtons();
        break;
      case PlayerVOProxy.SAVE_COMPLETE_NOTIFICATION:
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
      personality: !!this.playerVOProxy.vo.games.lifestyle,
      hobbies: !!this.playerVOProxy.vo.games.personality,
      skills: !!this.playerVOProxy.vo.games.hobbies,
    });
    !!this.playerVOProxy.vo.backup && this.viewComponent.showResultsButton();
  }

  protected setView(): void {
    const scene: LobbyScene = new LobbyScene();
    this.sceneManager.add(LobbyScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      LobbyScene.ACTION_DONE_EVENT,
      this.onAction,
      this,
    );
  }

  protected onAction(action: LobbyAction): void {
    switch (action) {
      case LobbyAction.BACK:
        this.stopScene();
        this.sendNotification(LobbyScene.BACK_NOTIFICATION);
        break;
      case LobbyAction.HELP:
        this.sendNotification(LobbyScene.HELP_NOTIFICATION);
        break;
      case LobbyAction.RESULTS:
        this.sendNotification(LobbyScene.RESULTS_NOTIFICATION);
        break;
      case LobbyAction.LIFESTYLE:
      case LobbyAction.PERSONALITY:
      case LobbyAction.HOBBIES:
      case LobbyAction.SKILLS:
        this.stopScene();
        this.sendNotification(LobbyScene.GAME_CHOSE_NOTIFICATION, action);
        break;
      default:
        break;
    }
  }

  get uiVOProxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }

  get playerVOProxy(): PlayerVOProxy {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME);
  }
}
