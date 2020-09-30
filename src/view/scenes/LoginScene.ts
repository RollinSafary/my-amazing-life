import { Images } from '../../assets';
import BaseScene from './BaseScene';

export default class LoginScene extends BaseScene {
  public static NAME: string = 'LoginScene';
  public static SHOW_LOGIN_WINDOW_NOTIFICATION: string = `${LoginScene.NAME}ShowLoginWindowNotification`;
  public static LOGIN_COMPLETE_NOTIFICATION: string = `${LoginScene.NAME}LoginCompleteNotification`;

  private background: Phaser.GameObjects.Image;

  constructor() {
    super(LoginScene.NAME);
  }

  public create(): void {
    this.createBackground();
  }

  private createBackground(): void {
    this.background = this.make.image({
      x: this.width * 0.5,
      y: this.height * 0.5,
      key: Images.WhitePixel.Name,
    });
    this.background.setScale(this.width, this.height);
    this.background.setTintFill(0x961f00);
    this.add.existing(this.background);
  }
}
