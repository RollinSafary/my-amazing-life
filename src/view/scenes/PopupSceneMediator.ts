import AvatarInstructionsPopupMediator from '../popups/AvatarInstructionsPopupMediator';
import AvatarIntroPopupMediator from '../popups/AvatarIntroPopupMediator';
import ErrorPopupMediator from '../popups/ErrorPopupMediator';
import HobbiesHelpPopupMediator from '../popups/HobbiesHelpPopupMediator';
import HobbiesLosePopupMediator from '../popups/HobbiesLosePopupMediator';
import HobbiesWinPopupMediator from '../popups/HobbiesWinPopupMediator';
import LifestyleHelpPopupMediator from '../popups/LifestyleHelpPopupMediator';
import LifeStyleResultPopupMediator from '../popups/LifeStyleResultPopupMediator';
import LobbyHelpPopupMediator from '../popups/LobbyHelpPopupMediator';
import PersonalityHelpPopupMediator from '../popups/PersonalityHelpPopupMediator';
import PersonalityTimeoutPopupMediator from '../popups/PersonalityTimeoutPopupMediator';
import SkillsHelpPopupMediator from '../popups/SkillsHelpPopupMediator';
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
    this.registerLobbyHelpPopup();
    this.registerLifestyleHelpPopup();
    this.registerLifeStyleResultPopup();
    this.registerPersonalityHelpPopup();
    this.registerPersonalityTimeoutPopup();
    this.registerHobbiesHelpPopup();
    this.registerHobbiesLosePopup();
    this.registerHobbiesWinPopup();
    this.registerSkillsHelpPopup();
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
  private registerLobbyHelpPopup(): void {
    this.facade.registerMediator(new LobbyHelpPopupMediator());
  }
  private registerLifestyleHelpPopup(): void {
    this.facade.registerMediator(new LifestyleHelpPopupMediator());
  }
  private registerLifeStyleResultPopup(): void {
    this.facade.registerMediator(new LifeStyleResultPopupMediator());
  }
  private registerPersonalityHelpPopup(): void {
    this.facade.registerMediator(new PersonalityHelpPopupMediator());
  }
  private registerPersonalityTimeoutPopup(): void {
    this.facade.registerMediator(new PersonalityTimeoutPopupMediator());
  }
  private registerHobbiesHelpPopup(): void {
    this.facade.registerMediator(new HobbiesHelpPopupMediator());
  }
  private registerHobbiesLosePopup(): void {
    this.facade.registerMediator(new HobbiesLosePopupMediator());
  }
  private registerHobbiesWinPopup(): void {
    this.facade.registerMediator(new HobbiesWinPopupMediator());
  }
  private registerSkillsHelpPopup(): void {
    this.facade.registerMediator(new SkillsHelpPopupMediator());
  }
}
