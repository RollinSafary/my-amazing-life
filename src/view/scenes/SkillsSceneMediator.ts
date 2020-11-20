import UiVOProxy from '../../model/UiVOProxy';
import BaseController from '../components/skills/controllers/BaseController';
import { postRunnable } from '../utils/phaser/PhaserUtils';
import BaseSceneMediator from './BaseSceneMediator';
import LobbyScene, { LobbyAction } from './LobbyScene';
import SkillsScene from './SkillsScene';

export default class SkillsSceneMediator extends BaseSceneMediator<
  SkillsScene
> {
  public static NAME: string = 'SkillsSceneMediator';

  constructor() {
    super(SkillsSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LobbyScene.GAME_CHOSE_NOTIFICATION);
  }

  public async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case LobbyScene.GAME_CHOSE_NOTIFICATION:
        const action: LobbyAction = args[0];
        if (action != LobbyAction.SKILLS) {
          return;
        }
        this.startScene();
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected setView(): void {
    const scene: SkillsScene = new SkillsScene();
    this.sceneManager.add(SkillsScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected async startScene(): Promise<void> {
    await super.startScene();
    this.sendNotification(SkillsScene.HELP_CLICKED_NOTIFICATION);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      SkillsScene.CONTROLLER_CHOSE_EVENT,
      this.onControllerActivation,
      this,
    );
    this.viewComponent.events.on(
      SkillsScene.CONTROLLER_VALUE_CHANGED_EVENT,
      this.onControllerValueChange,
      this,
    );
    this.viewComponent.events.on(
      SkillsScene.PRODUCE_CLICKED_EVENT,
      this.onProduce,
      this,
    );
    this.viewComponent.events.on(
      SkillsScene.REPLAY_CLICKED_EVENT,
      this.onReplay,
      this,
    );
    this.viewComponent.events.on(
      SkillsScene.PLAY_AGAIN_CLICKED_EVENT,
      this.onPlayAgain,
      this,
    );
    this.viewComponent.events.on(
      SkillsScene.RESULTS_CLICKED_EVENT,
      this.onResults,
      this,
    );
  }

  protected onControllerActivation(controller: BaseController): void {
    this.viewComponent.activateController(controller);
  }

  protected onControllerValueChange(name: string, value: number): void {
    this.sendNotification(
      SkillsScene.CONTROLLER_VALUE_CHANGED_NOTIFICATION,
      name,
      value,
    );
  }

  protected async onProduce(): Promise<void> {
    this.viewComponent.setControllersState(false);
    const success: boolean = this.uiVOProxy.checkSkillOptionValues();
    const bestSkill: string = this.uiVOProxy.getBestSkill();
    await this.viewComponent.startIndicatorsProcessing(success, bestSkill);
    if (!success) {
      this.sendNotification(SkillsScene.VALUES_CHECK_FAILED_NOTIFICATION);
      this.viewComponent.setControllersState(true);
    }
  }

  protected onReplay(): void {
    const bestSkill: string = this.uiVOProxy.getBestSkill();
    this.viewComponent.showSlideShow(bestSkill);
    this.sendNotification(SkillsScene.REPLAY_CLICKED_NOTIFICATION);
  }

  protected onPlayAgain(): void {
    this.sceneManager.stop(SkillsScene.NAME);
    postRunnable(this.sceneManager.start, this.sceneManager, SkillsScene.NAME);
    this.sendNotification(SkillsScene.PLAY_AGAIN_CLICKED_NOTIFICATION);
  }

  protected onResults(): void {
    this.sendNotification(SkillsScene.RESULTS_CLICKED_NOTIFICATION);
  }

  get uiVOProxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
