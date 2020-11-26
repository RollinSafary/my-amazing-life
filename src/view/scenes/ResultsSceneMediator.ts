import PlayerVOProxy from '../../model/PlayerVOProxy';
import UiVOProxy from '../../model/UiVOProxy';
import BaseSceneMediator from './BaseSceneMediator';
import { ResultSceneAction, ResultsScene } from './ResultsScene';
import SkillsScene from './SkillsScene';

export default class ResultsSceneMediator extends BaseSceneMediator<
  ResultsScene
> {
  public static NAME: string = 'ResultsSceneMediator';

  constructor() {
    super(ResultsSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      SkillsScene.RESULTS_CLICKED_NOTIFICATION,
      PlayerVOProxy.BACKUP_COMPLETE_NOTIFICATION,
    );
  }

  public handleNotification(notificationName: string): void {
    switch (notificationName) {
      case SkillsScene.RESULTS_CLICKED_NOTIFICATION:
        this.startScene(ResultsScene.NAME, [
          this.uiVOProxy.vo,
          !!this.playerVOProxy.vo.backup,
        ]);
        break;
      case PlayerVOProxy.BACKUP_COMPLETE_NOTIFICATION:
        this.viewComponent.showJobButton();
        break;
      default:
        this.handleDefaultNotifications(notificationName);
        break;
    }
  }

  protected setView(): void {
    const scene: ResultsScene = new ResultsScene();
    this.sceneManager.add(ResultsScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      ResultsScene.ACTION_DONE_EVENT,
      this.onAction,
      this,
    );
  }

  protected onAction(action: ResultSceneAction): void {
    this.stopScene();
    switch (action) {
      case ResultSceneAction.JOB:
        this.sendNotification(ResultsScene.JOB_CLICKED_NOTIFICATION);
      case ResultSceneAction.MENU:
        this.stopScene();
        this.sendNotification(ResultsScene.MENU_CLICKED_NOTIFICATION);
        break;
      case ResultSceneAction.SAVE:
        this.sendNotification(ResultsScene.SAVE_CLICKED_NOTIFICATION);
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
