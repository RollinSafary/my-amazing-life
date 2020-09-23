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
    this.setViewComponentListeners();
  }

  protected setViewComponentListeners(): void {
    super.setViewComponentListeners();
  }

  protected async onStartButtonClick(): Promise<void> {
    await this.fadeScreenOut();
    this.stopScene();
  }
}
