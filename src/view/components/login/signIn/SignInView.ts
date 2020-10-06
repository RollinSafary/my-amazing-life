import { Atlases } from '../../../../assets';
import { ERROR_CODE } from '../../../../constants/Constants';
import { validateEmail } from '../../../../utils/Utils';
import {
  ISpriteButtonConfig,
  ISpriteButtonState,
} from '../../../utils/simpleButton/SimpleButtonInterfaces';
import { SpriteButton } from '../../../utils/simpleButton/SpriteButton';
import BaseTextField from '../../../utils/textField/BaseTextField';
import BaseLoginView from '../BaseLoginView';
import SignInEmailField from './SignInEmailField';
import SignInPasswordField from './SignInPasswordField';

export default class SignInView extends BaseLoginView {
  public static NAME: string = 'SignInView';

  public static SIGN_IN_EVENT: string = 'signIn';
  public static SIGN_UP_EVENT: string = 'signUp';
  public static ERROR_EVENT: string = 'error';

  public static ERROR_NOTIFICATION: string = `${SignInView.NAME}ErrorNotification`;
  public static SIGN_IN_NOTIFICATION: string = `${SignInView.NAME}SignInNotification`;
  public static SIGN_UP_NOTIFICATION: string = `${SignInView.NAME}SignUpNotification`;

  protected icon: Phaser.GameObjects.Image;
  protected emailField: SignInEmailField;
  protected passwordField: SignInPasswordField;
  protected signInButton: SpriteButton;
  protected signUpButton: SpriteButton;

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
      height: frame.height * 1.4,
    });
    this.add(this.background);
  }

  public async show(): Promise<void> {
    this.prepare();
    await this.showBackground();
    await this.showIcon();
    await this.showFields();
    await this.showButtons();
  }

  public async hide(): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 200,
        onComplete: () => resolve(),
      });
    });
  }

  protected async showBackground(): Promise<void> {
    return new Promise<void>(resolve => {
      if (!this.scene) {
        return;
      }
      const target: any = {
        height: this.background.height,
      };
      const frame: Phaser.Textures.Frame = this.scene.textures.getFrame(
        Atlases.Login.Atlas.Name,
        Atlases.Login.Atlas.Frames.BackgroundLogin,
      );
      this.scene.tweens.add({
        targets: target,
        height: frame.height,
        duration: 500,
        ease: Phaser.Math.Easing.Back.Out,
        onUpdate: () => {
          this.background.resize(this.background.width, target.height);
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  protected async showIcon(): Promise<void> {
    return new Promise<void>(resolve => {
      if (!this.scene) {
        return;
      }
      this.scene.tweens.add({
        targets: this.icon,
        scaleX: 1,
        scaleY: 1,
        duration: 300,
        ease: Phaser.Math.Easing.Back.Out,
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  protected async showFields(): Promise<void> {
    return new Promise<void>(resolve => {
      if (!this.scene) {
        return;
      }
      this.scene.tweens.add({
        targets: [this.emailField, this.passwordField],
        alpha: 1,
        duration: 300,
        ease: Phaser.Math.Easing.Expo.InOut,
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  protected async showButtons(): Promise<void> {
    return new Promise<void>(resolve => {
      if (!this.scene) {
        return;
      }
      this.scene.tweens.add({
        targets: [this.signInButton, this.signUpButton],
        scaleX: 1,
        scaleY: 1,
        duration: 300,
        ease: Phaser.Math.Easing.Back.Out,
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  protected createContent(): void {
    this.createIcon();
    this.createFields();
    this.createButtons();
  }

  protected createIcon(): void {
    this.icon = this.scene.make.image({
      x: 0,
      y: -this.height * 0.25,
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.LoginIcon,
    });
    this.add(this.icon);
  }

  protected createFields(): void {
    this.createEmailField();
    this.createPasswordField();
  }

  protected createEmailField(): void {
    this.emailField = new SignInEmailField(this.scene);
    this.add(this.emailField);
    this.emailField.y = -this.emailField.height * 0.6;
  }
  protected createPasswordField(): void {
    this.passwordField = new SignInPasswordField(this.scene);
    this.add(this.passwordField);
    this.passwordField.y = this.passwordField.height * 0.6;
  }

  protected createButtons(): void {
    this.createSignInButton();
    this.createSignUpButton();
  }

  protected createSignInButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ButtonNext,
    };
    const config: ISpriteButtonConfig = {
      normalStateConfig,
    };
    this.signInButton = new SpriteButton(this.scene, config);
    this.add(this.signInButton);
    this.signInButton.x = -this.signInButton.width * 0.6;
    this.signInButton.y = this.height * 0.25;
  }

  public setListeners(): void {
    this.emailField.on(
      BaseTextField.INPUT_DONE_EVENT,
      this.onSignInClick,
      this,
    );
    this.signInButton.on(SpriteButton.CLICK_EVENT, this.onSignInClick, this);
    this.signUpButton.on(SpriteButton.CLICK_EVENT, this.onSignUpClick, this);
  }

  public removeListeners(): void {
    this.emailField.off(
      BaseTextField.INPUT_DONE_EVENT,
      this.onSignInClick,
      this,
    );
    this.signInButton.off(SpriteButton.CLICK_EVENT, this.onSignInClick, this);
    this.signUpButton.off(SpriteButton.CLICK_EVENT, this.onSignUpClick, this);
  }

  protected createSignUpButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ButtonOk,
    };
    const config: ISpriteButtonConfig = {
      normalStateConfig,
    };
    this.signUpButton = new SpriteButton(this.scene, config);
    this.add(this.signUpButton);
    this.signUpButton.x = this.signInButton.width * 0.6;
    this.signUpButton.y = this.height * 0.25;
  }

  protected onSignInClick(): void {
    switch (true) {
      case !validateEmail(this.emailField.getTextValue()):
        this.emit(
          SignInView.ERROR_EVENT,
          ERROR_CODE.REGISTRATION_INVALID_EMAIL,
        );
        return;
      case this.passwordField.getTextValue().length < 6:
        this.emit(
          SignInView.ERROR_EVENT,
          ERROR_CODE.REGISTRATION_SHORT_PASSWORD,
        );
        return;
      default:
        this.emit(
          SignInView.SIGN_IN_EVENT,
          this.emailField.getTextValue(),
          this.passwordField.getTextValue(),
        );
        break;
    }
  }

  protected onSignUpClick(): void {
    this.emit(
      SignInView.SIGN_UP_EVENT,
      this.emailField.getTextValue(),
      this.passwordField.getTextValue(),
    );
  }

  private prepare(): void {
    this.background.resize(this.background.width, 0);
    this.icon.setScale(0);
    this.emailField.setAlpha(0);
    this.passwordField.setAlpha(0);
    this.signInButton.setScale(0);
    this.signUpButton.setScale(0);
  }
}
