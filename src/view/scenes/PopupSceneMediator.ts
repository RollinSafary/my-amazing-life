import AvatarInstructionsPopupMediator from '../popups/AvatarInstructionsPopupMediator';
import AvatarIntroPopupMediator from '../popups/AvatarIntroPopupMediator';
import ErrorPopupMediator from '../popups/ErrorPopupMediator';
import HobbiesWinPopupMediator from '../popups/HobbiesWinPopupMediator';
import LifeStyleResultPopupMediator from '../popups/LifeStyleResultPopupMediator';
import PersonalityTimeoutPopupMediator from '../popups/PersonalityTimeoutPopupMediator';
import PopupManager from '../utils/PopupManager';
import BaseSceneMediator from './BaseSceneMediator';
import LoadingScene from './LoadingScene';
import PopupScene from './PopupScene';

export default class PopupSceneMediator extends BaseSceneMediator<PopupScene> {
  public static NAME: string = 'PopupSceneMediator';
  protected popupManager: PopupManager;
  constructor(viewComponent?: PopupScene) {
    super(PopupSceneMediator.NAME, viewComponent);
    this.popupManager = PopupManager.getInstance();
  }

  public onRegister(): void {
    super.onRegister();
    this.unsubscribeToNotification(
      PopupScene.WAKE_NOTIFICATION,
      PopupScene.SLEEP_NOTIFICATION,
    );
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(LoadingScene.LOAD_COMPLETE_NOTIFICATION);
  }

  public handleNotification(notificationName: string, ...args: any[]): void {
    super.handleNotification(notificationName);
    switch (notificationName) {
      case LoadingScene.LOAD_COMPLETE_NOTIFICATION:
        this.registerGamePopups();
        break;
      default:
        console.warn(`${notificationName} is unhandled!`);
        break;
    }
  }

  public onSceneReady(): void {
    super.onSceneReady();
  }

  public onSceneWake(): void {
    this.sceneManager.bringToTop(PopupScene.NAME);
    super.onSceneWake();
  }

  public onSceneSleep(): void {
    this.sceneManager.sendToBack(PopupScene.NAME);
    super.onSceneSleep();
  }

  protected setView(): void {
    const popupScene: PopupScene = new PopupScene();
    this.sceneManager.add(PopupScene.NAME, popupScene);
    this.setViewComponent(popupScene);
    this.sceneManager.start(PopupScene.NAME);
    this.sceneManager.sleep(PopupScene.NAME);
    super.setView();
  }

  private registerGamePopups(): void {
    this.registerRegistrationErrorPopup();
    this.registerAvatarIntroPopup();
    this.registerAvatarInstructionsPopup();
    this.registerLifeStyleResultPopup();
    this.registerPersonalityTimeoutPopup();
    this.registerHobbiesWinPopup();
    this.sendNotification(PopupScene.REGISTERED_NOTIFICATION);
  }

  private registerRegistrationErrorPopup(): void {
    this.facade.registerMediator(new ErrorPopupMediator());
  }
  private registerAvatarIntroPopup(): void {
    this.facade.registerMediator(new AvatarIntroPopupMediator());
  }
  private registerAvatarInstructionsPopup(): void {
    this.facade.registerMediator(new AvatarInstructionsPopupMediator());
  }
  private registerLifeStyleResultPopup(): void {
    this.facade.registerMediator(new LifeStyleResultPopupMediator());
  }
  private registerPersonalityTimeoutPopup(): void {
    this.facade.registerMediator(new PersonalityTimeoutPopupMediator());
  }
  private registerHobbiesWinPopup(): void {
    this.facade.registerMediator(new HobbiesWinPopupMediator());
  }
}
