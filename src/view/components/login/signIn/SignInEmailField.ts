import { Atlases, Fonts } from '../../../../assets';
import { Translation } from '../../../../translations';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import BaseTextField from '../../../utils/textField/BaseTextField';

export default class SignInEmailField extends BaseTextField {
  protected icon: Phaser.GameObjects.Image;

  protected createComponents(): void {
    super.createComponents();
    this.createIcon();
    this.icon.x = -this.background.width * 0.5 + this.icon.width * 0.7;
    this.text.x = this.icon.x + this.icon.width * 0.6;
    this.textStartX = this.text.x;
  }

  protected createIcon(): void {
    this.icon = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.IconMail,
    });
    this.add(this.icon);
  }

  protected createInputText(): void {
    super.createInputText();
    this.inputDOM.type = 'email';
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.Field,
    });
    this.add(this.background);
  }
  protected createText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 20,
      fill: '#757575',
    };
    this.text = this.scene.make.text({
      x: 0,
      y: 0,
      text: this.scene.i18n.translate(Translation.REGISTRATION_EMAIL, {}),
      style,
    });
    this.text.setOrigin(0, 0.5);
    this.add(this.text);
  }
}
