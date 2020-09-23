import { Atlases, Fonts } from '../../../../assets';
import { Translation } from '../../../../translations';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import BaseLoginView from '../BaseLoginView';
import RegisterTextField from './RegistrationTextField';

export default class RegistrationView extends BaseLoginView {
  protected titleText: Phaser.GameObjects.Text;
  protected firstNameField: RegisterTextField;
  protected lastNameField: RegisterTextField;
  protected emailField: RegisterTextField;
  protected passwordField: RegisterTextField;
  protected confirmPasswordField: RegisterTextField;

  protected createBackground(): void {
    const frame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      Atlases.Login.Atlas.Name,
      Atlases.Login.Atlas.Frames.BackgroundLogin,
    );
    this.background = this.scene.make.ninePatch({
      x: 0,
      y: 0,
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.BackgroundLogin,
      width: frame.width,
      height: frame.height,
    });
    this.add(this.background);
  }

  protected createContent(): void {
    this.createTitle();
    this.createNameFields();
    this.createEmailField();
    this.createPasswordFields();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
    };
    this.titleText = this.scene.make.extText({
      x: 0,
      y: -this.background.height * 0.4,
      text: Translation.REGISTRATION_TITLE,
      style,
    });
    this.titleText.setOrigin(0.5);
    this.add(this.titleText);
  }

  protected createNameFields(): void {
    this.firstNameField = new RegisterTextField(
      this.scene,
      'text',
      Translation.REGISTRATION_FIRST_NAME,
    );
    this.lastNameField = new RegisterTextField(
      this.scene,
      'text',
      Translation.REGISTRATION_LAST_NAME,
    );
    this.firstNameField.y = this.titleText.y + this.firstNameField.height;
    this.lastNameField.y =
      this.firstNameField.y + this.lastNameField.height * 0.6;
    this.add(this.firstNameField);
    this.add(this.lastNameField);
  }

  protected createEmailField(): void {
    this.emailField = new RegisterTextField(
      this.scene,
      'email',
      Translation.REGISTRATION_EMAIL,
    );
    this.emailField.y = this.lastNameField.y + this.emailField.height * 0.6;
    this.add(this.emailField);
  }

  protected createPasswordFields(): void {
    this.passwordField = new RegisterTextField(
      this.scene,
      'password',
      Translation.REGISTRATION_PASSWORD,
    );
    this.confirmPasswordField = new RegisterTextField(
      this.scene,
      'password',
      Translation.REGISTRATION_CONFIRM_PASSWORD,
    );
    this.passwordField.y = this.emailField.y + this.passwordField.height;
    this.confirmPasswordField.y =
      this.passwordField.y + this.confirmPasswordField.height * 0.6;
    this.add(this.passwordField);
    this.add(this.confirmPasswordField);
  }

  protected setListeners(): void {}
}
