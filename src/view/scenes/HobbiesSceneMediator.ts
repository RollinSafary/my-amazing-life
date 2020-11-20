import UiVOProxy from '../../model/UiVOProxy';
import HobbiesHelpPopup from '../popups/HobbiesHelpPopup';
import { HobbiesLosePopup } from '../popups/HobbiesLosePopup';
import HobbiesWinPopup from '../popups/HobbiesWinPopup';
import StandardPopup from '../popups/StandardPopup';
import BaseSceneMediator from './BaseSceneMediator';
import HobbiesScene from './HobbiesScene';
import LobbyScene, { LobbyAction } from './LobbyScene';

export default class HobbiesSceneMediator extends BaseSceneMediator<
  HobbiesScene
> {
  public static NAME: string = 'HobbiesSceneMediator';

  constructor() {
    super(HobbiesSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      LobbyScene.GAME_CHOSE_NOTIFICATION,
      UiVOProxy.HOBBIES_CLUSTERS_PREPARED_NOTIFICATION,
      UiVOProxy.HOBBIES_CLUSTER_ELEMENT_CHOICE_NOTIFICATION,
      UiVOProxy.HOBBIES_GAME_COMPLETE_NOTIFICATION,
      HobbiesLosePopup.PLAY_AGAIN_CLICKED_NOTIFICATION,
      HobbiesLosePopup.MENU_CLICKED_NOTIFICATION,
      HobbiesWinPopup.PLAY_AGAIN_NOTIFICATION,
      HobbiesWinPopup.MENU_CLICKED_NOTIFICATION,
      StandardPopup.HIDE_COMPLETE_NOTIFICATION,
    );
  }

  public async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case LobbyScene.GAME_CHOSE_NOTIFICATION:
        const action: LobbyAction = args[0];
        if (action != LobbyAction.HOBBIES) {
          return;
        }
        this.startTheGame();
        break;
      case UiVOProxy.HOBBIES_CLUSTERS_PREPARED_NOTIFICATION:
        this.viewComponent.startGame();
        break;
      case UiVOProxy.HOBBIES_CLUSTER_ELEMENT_CHOICE_NOTIFICATION:
        const frameName: string = args[0];
        this.viewComponent.makeImageSelected(
          frameName,
          this.uiVOProxy.vo.hobbiesImagePairs.length,
        );
        break;
      case UiVOProxy.HOBBIES_GAME_COMPLETE_NOTIFICATION:
        this.sceneManager.pause(HobbiesScene.NAME);
        break;
      case HobbiesWinPopup.PLAY_AGAIN_NOTIFICATION:
        this.restartTheGame();
        break;
      case HobbiesLosePopup.MENU_CLICKED_NOTIFICATION:
      case HobbiesWinPopup.MENU_CLICKED_NOTIFICATION:
        this.sceneManager.stop(HobbiesScene.NAME);
        break;
      case StandardPopup.HIDE_COMPLETE_NOTIFICATION:
        const name: string = args[0];
        if (name !== HobbiesHelpPopup.NAME) {
          return;
        }
        this.viewComponent.resume();
        break;
      case HobbiesLosePopup.PLAY_AGAIN_CLICKED_NOTIFICATION:
        this.restartTheGame();
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected setView(): void {
    const scene: HobbiesScene = new HobbiesScene();
    this.sceneManager.add(HobbiesScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      HobbiesScene.GENERATE_ITEMS_EVENT,
      this.generateItems,
      this,
    );
    this.viewComponent.events.on(
      HobbiesScene.HOBBY_CHOSE_EVENT,
      this.onHobbyChose,
      this,
    );
    this.viewComponent.events.on(
      HobbiesScene.HELP_CLICKED_EVENT,
      this.onHelpClick,
      this,
    );
    this.viewComponent.events.on(
      HobbiesScene.LIVES_SPENT_EVENT,
      this.onLose,
      this,
    );
  }

  protected generateItems(cameraState: number): void {
    this.viewComponent.generateDecorations();
    this.viewComponent.generateObstacles();
    if (cameraState % 3 === 0) {
      const imagePair = this.uiVOProxy.vo.hobbiesImagePairs.getFirst();
      this.viewComponent.setImagePair(imagePair);
    }
  }

  protected onHobbyChose(frameName: string): void {
    this.sendNotification(HobbiesScene.HOBBY_CHOSE_NOTIFICATION, frameName);
  }

  protected onHelpClick(): void {
    this.viewComponent.pause();
    this.sendNotification(HobbiesScene.HELP_CLICKED_NOTIFICATION);
  }

  protected async startTheGame(): Promise<void> {
    await this.startScene();
    this.sendNotification(HobbiesScene.START_GAME_NOTIFICATION);
  }
  protected async restartTheGame(): Promise<void> {
    await this.stopScene();
    await this.startTheGame();
  }

  protected onLose(): void {
    this.sendNotification(HobbiesScene.LIVES_SPENT_NOTIFICATION);
  }

  get uiVOProxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
