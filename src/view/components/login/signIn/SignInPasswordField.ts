import { Atlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import PasswordTextField from '../registration/PasswordTextField';

export default class SignInPasswordField extends PasswordTextField {
  protected icon: Phaser.GameObjects.Image;
  constructor(scene: BaseScene) {
    super(scene, Translation.REGISTRATION_PASSWORD);
  }
  protected createComponents(): void {
    super.createComponents();
    this.createIcon();
    this.icon.x = -this.background.width * 0.5 + this.icon.width * 0.7;
    this.text.x = this.icon.x + this.icon.width * 0.6;
  }

  protected createIcon(): void {
    this.icon = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.IconLock,
    });
    this.add(this.icon);
  }
}
