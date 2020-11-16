import UiVOProxy from '../../model/UiVOProxy';
import { IPersonalityResultsConfig } from '../components/personality/PersonalityResults';
import PersonalityHelpPopup from '../popups/PersonalityHelpPopup';
import StandardPopup from '../popups/StandardPopup';
import { postRunnable } from '../utils/phaser/PhaserUtils';
import BaseSceneMediator from './BaseSceneMediator';
import LobbyScene, { LobbyAction } from './LobbyScene';
import PersonalityScene from './PersonalityScene';

export default class PersonalitySceneMediator extends BaseSceneMediator<
  PersonalityScene
> {
  public static NAME: string = 'PersonalitySceneMediator';

  constructor() {
    super(PersonalitySceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      LobbyScene.GAME_CHOSE_NOTIFICATION,
      UiVOProxy.PERSONALITY_CHOICE_NOTIFICATION,
      UiVOProxy.PERSONALITY_SECTOR_RESET_NOTIFICATION,
      UiVOProxy.PERSONALITY_SECTOR_READY_NOTIFICATION,
      UiVOProxy.PERSONALITY_SECTOR_COMPLETE_NOTIFICATION,
      UiVOProxy.PERSONALITY_GAME_COMPLETE_NOTIFICATION,
      StandardPopup.SHOW_COMPLETE_NOTIFICATION,
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
        if (action != LobbyAction.PERSONALITY) {
          return;
        }
        this.startScene();
        break;
      case UiVOProxy.PERSONALITY_CHOICE_NOTIFICATION:
        const markerName: string = args[0];
        const index: number = args[1];
        this.viewComponent.updateMarkerIndex(markerName, index);
        break;
      case UiVOProxy.PERSONALITY_SECTOR_READY_NOTIFICATION:
        this.viewComponent.showPath();
        break;
      case UiVOProxy.PERSONALITY_SECTOR_RESET_NOTIFICATION:
        this.viewComponent.resetSector();
        break;
      case UiVOProxy.PERSONALITY_SECTOR_COMPLETE_NOTIFICATION:
        this.viewComponent.showSector(
          this.proxy.vo.personalityChoices.length - 1,
        );
        break;
      case UiVOProxy.PERSONALITY_GAME_COMPLETE_NOTIFICATION:
        const config: IPersonalityResultsConfig = {
          results: this.proxy.vo.personalityResult,
          option: this.proxy.vo.personalityBestOption,
        };
        this.viewComponent.createResults(config);
        await this.viewComponent.showSector(
          this.proxy.vo.personalityChoices.length,
        );
        this.viewComponent.showResults();
        break;
      case StandardPopup.SHOW_COMPLETE_NOTIFICATION: {
        const name: string = args[0];
        if (name !== PersonalityHelpPopup.NAME) {
          return;
        }
        this.viewComponent.pauseTimer();
        break;
      }
      case StandardPopup.HIDE_COMPLETE_NOTIFICATION: {
        const name: string = args[0];
        if (name !== PersonalityHelpPopup.NAME) {
          return;
        }
        this.viewComponent.resumeTimer();
        break;
      }
      default:
        break;
    }
  }

  protected setView(): void {
    const scene: PersonalityScene = new PersonalityScene();
    this.sceneManager.add(PersonalityScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected async startScene(): Promise<void> {
    await super.startScene();
    this.viewComponent.createPlayer(this.proxy.vo.avatar);
    this.onHelpClick();
  }

  protected setViewComponentListeners(): void {
    this.viewComponent.events.on(
      PersonalityScene.MARKER_CLICKED_EVENT,
      this.onMarkerClick,
      this,
    );
    this.viewComponent.events.on(
      PersonalityScene.RESET_CLICKED_EVENT,
      this.onResetClick,
      this,
    );
    this.viewComponent.events.on(
      PersonalityScene.HELP_CLICKED_EVENT,
      this.onHelpClick,
      this,
    );
    this.viewComponent.events.on(
      PersonalityScene.PATH_COMPLETE_EVENT,
      this.onPathComplete,
      this,
    );
    this.viewComponent.events.on(
      PersonalityScene.TIMER_COMPLETE_EVENT,
      this.onTimerComplete,
      this,
    );
    this.viewComponent.events.on(
      PersonalityScene.MENU_CLICKED_EVENT,
      this.onMenuClick,
      this,
    );
    this.viewComponent.events.on(
      PersonalityScene.PLAY_CLICKED_EVENT,
      this.onPlayClick,
      this,
    );
  }

  protected onMarkerClick(markerName: string): void {
    this.sendNotification(
      PersonalityScene.MARKER_CLICKED_NOTIFICATION,
      this.viewComponent.sectorIndex,
      markerName,
    );
  }

  protected onPathComplete(): void {
    this.sendNotification(PersonalityScene.PATH_COMPLETE_NOTIFICATION);
  }

  protected onResetClick(): void {
    this.sendNotification(PersonalityScene.RESET_CLICKED_NOTIFICATION);
  }

  protected onHelpClick(): void {
    this.sendNotification(PersonalityScene.HELP_CLICKED_NOTIFICATION);
  }

  protected onTimerComplete(): void {
    this.sendNotification(PersonalityScene.TIMER_COMPLETE_NOTIFICATION);
  }

  protected onMenuClick(): void {
    this.sendNotification(PersonalityScene.MENU_CLICKED_NOTIFICATION);
    this.stopScene();
  }

  protected onPlayClick(): void {
    this.stopScene();
    postRunnable(this.startScene, this);
  }

  get proxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
