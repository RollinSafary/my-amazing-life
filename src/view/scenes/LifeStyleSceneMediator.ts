import { ILifeStyleSectionConfig } from '../../constants/Constants';
import UiVOProxy from '../../model/UiVOProxy';
import { LifeStylePanelItem } from '../components/lifestyle/panel/LifeStylePanelItem';
import LifeStyleResultPopup from '../popups/LifeStyleResultPopup';
import { postRunnable } from '../utils/phaser/PhaserUtils';
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
    this.subscribeToNotifications(
      LobbyScene.GAME_CHOSE_NOTIFICATION,
      UiVOProxy.LIFE_STYLE_OPTION_SELECTED_NOTIFICATION,
      UiVOProxy.LIFE_STYLE_OPTION_CONFIRMED_NOTIFICATION,
      UiVOProxy.LIFE_STYLE_GAME_COMPLETE_NOTIFICATION,
      LifeStyleResultPopup.MENU_CLICKED_NOTIFICATION,
      LifeStyleResultPopup.PLAY_AGAIN_NOTIFICATION,
    );
  }

  public async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case LifeStyleResultPopup.PLAY_AGAIN_NOTIFICATION:
        this.stopScene();
        postRunnable(this.startScene, this);
        break;
      case LobbyScene.GAME_CHOSE_NOTIFICATION:
        const action: LobbyAction = args[0];
        if (action != LobbyAction.LIFESTYLE) {
          return;
        }
        this.startScene();
        break;
      case UiVOProxy.LIFE_STYLE_OPTION_SELECTED_NOTIFICATION:
        const showNextButton: boolean = args[0];
        this.viewComponent.updateSubtotal(
          this.uiVOProxy.vo.lifeStyleSubtotal,
          showNextButton,
        );
        break;
      case UiVOProxy.LIFE_STYLE_OPTION_CONFIRMED_NOTIFICATION:
        await this.viewComponent.hidePanels();
        this.viewComponent.updateProgress(this.uiVOProxy.vo.lifeStyleProgress);
        await this.viewComponent.updateTotal(this.uiVOProxy.vo.lifeStyleTotal);
        this.viewComponent.enableWheel();
        break;
      case UiVOProxy.LIFE_STYLE_GAME_COMPLETE_NOTIFICATION:
        await this.viewComponent.hidePanels();
        this.sendNotification(LifeStyleScene.SHOW_RESULT_NOTIFICATION);
        break;
      case LifeStyleResultPopup.MENU_CLICKED_NOTIFICATION:
        this.stopScene();
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

  protected async startScene(): Promise<void> {
    this.sceneManager.start(LifeStyleScene.NAME);
    this.viewComponent.createPlayer(this.uiVOProxy.vo.avatar);
    this.viewComponent.enableWheel();
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
    this.viewComponent.events.on(
      LifeStylePanelItem.CLICK_EVENT,
      this.onOptionSelection,
      this,
    );
    this.viewComponent.events.on(
      LifeStyleScene.CONFIRM_EVENT,
      this.onConfirm,
      this,
    );
    this.viewComponent.events.on(
      LifeStyleScene.CLEAR_EVENT,
      this.onClear,
      this,
    );
    this.viewComponent.events.on(
      LifeStyleScene.MOVE_TO_SECTION_EVENT,
      this.onMoveToSection,
      this,
    );
    this.viewComponent.events.on(
      LifeStyleScene.HELP_CLICKED_EVENT,
      this.onHelpClick,
      this,
    );
  }

  protected onOptionSelection(
    config: ILifeStyleSectionConfig,
    index: number,
    value: number,
  ): void {
    this.sendNotification(
      LifeStyleScene.OPTION_SELECTED_NOTIFICATION,
      config,
      index,
      value,
    );
  }

  protected onConfirm(): void {
    this.sendNotification(LifeStyleScene.OPTION_CONFIRMED_NOTIFICATION);
  }
  protected onClear(): void {
    this.sendNotification(LifeStyleScene.OPTION_CLEAR_NOTIFICATION);
  }

  protected onMoveToSection(): void {
    this.viewComponent.movePlayerToSection();
  }

  protected onHelpClick(): void {
    this.sendNotification(LifeStyleScene.HELP_CLICKED_NOTIFICATION);
  }

  get uiVOProxy(): UiVOProxy {
    return this.facade.retrieveProxy(UiVOProxy.NAME);
  }
}
