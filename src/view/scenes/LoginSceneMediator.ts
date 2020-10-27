import PlayerVOProxy from '../../model/PlayerVOProxy';
import RegistrationViewMediator from '../components/login/registration/RegistrationViewMediator';
import SignInViewMediator from '../components/login/signIn/SignInViewMediator';
import BaseSceneMediator from './BaseSceneMediator';
import LoginScene from './LoginScene';
import WelcomeScene from './WelcomeScene';

export default class LoginSceneMediator extends BaseSceneMediator<LoginScene> {
  public static NAME: string = 'LoginSceneMediator';

  constructor() {
    super(LoginSceneMediator.NAME, null);
  }

  public registerNotificationInterests(): void {
    this.subscribeToNotifications(
      WelcomeScene.START_BUTTON_CLICKED_NOTIFICATION,
      PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION,
    );
  }

  public async handleNotification(
    notificationName: string,
    ...args: any[]
  ): Promise<void> {
    switch (notificationName) {
      case WelcomeScene.START_BUTTON_CLICKED_NOTIFICATION:
        this.sceneManager.start(LoginScene.NAME);
        this.registerViews();
        await this.fadeScreenIn();
        this.sendNotification(LoginScene.SHOW_LOGIN_WINDOW_NOTIFICATION);
        break;
      case PlayerVOProxy.INITIALIZE_COMPLETE_NOTIFICATION:
        this.removeScene();
        break;
      default:
        this.handleDefaultNotifications(notificationName, ...args);
        break;
    }
  }

  protected registerViews(): void {
    this.facade.registerMediator(new SignInViewMediator());
    this.facade.registerMediator(new RegistrationViewMediator());
  }

  protected setView(): void {
    const scene: LoginScene = new LoginScene();
    this.sceneManager.add(LoginScene.NAME, scene);
    this.setViewComponent(scene);
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
  }

  protected async onStartButtonClick(): Promise<void> {
    await this.fadeScreenOut();
    this.stopScene();
  }

  protected async removeScene(): Promise<void> {
    await this.fadeScreenOut();
    this.facade.removeMediator(SignInViewMediator.NAME);
    this.facade.removeMediator(RegistrationViewMediator.NAME);
    this.sceneManager.stop(LoginScene.NAME);
    this.sendNotification(LoginScene.LOGIN_COMPLETE_NOTIFICATION);
  }
}
