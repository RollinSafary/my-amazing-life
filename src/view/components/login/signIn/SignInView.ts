import { Atlases } from '../../../../assets';
import {
  ISpriteButtonConfig,
  ISpriteButtonState,
} from '../../../utils/simpleButton/SimpleButtonInterfaces';
import { SpriteButton } from '../../../utils/simpleButton/SpriteButton';
import BaseTextField from '../../../utils/textField/BaseTextField';
import BaseLoginView from '../BaseLoginView';
import SignInTextField from './SignInTextField';

export default class SignInView extends BaseLoginView {
  public static NAME: string = 'SignInView';
  public static NEXT_BUTTON_CLICKED_EVENT: string = 'nextButtonClicked';
  public static EMAIL_ENTERED_NOTIFICATION: string = `${SignInView.NAME}EmailEnteredNotification`;

  protected icon: Phaser.GameObjects.Image;
  protected userNameField: any;
  protected nextButton: SpriteButton;

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

  public async show(): Promise<void> {
    this.prepare();
    await this.showBackground();
    await this.showIcon();
    await this.showTextField();
    await this.showNextButton();
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

  protected async showTextField(): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this.userNameField,
        alpha: 1,
        duration: 300,
        ease: Phaser.Math.Easing.Expo.InOut,
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  protected async showNextButton(): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this.nextButton,
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
    this.createUserNameField();
    this.createNextButton();
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

  protected createUserNameField(): void {
    this.userNameField = new SignInTextField(this.scene);
    this.add(this.userNameField);
  }
  protected createNextButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ButtonNext,
    };
    const config: ISpriteButtonConfig = {
      normalStateConfig,
    };
    this.nextButton = new SpriteButton(this.scene, config);
    this.add(this.nextButton);
    this.nextButton.y = this.height * 0.25;
  }
  protected setListeners(): void {
    this.userNameField.on(
      BaseTextField.INPUT_DONE_EVENT,
      this.onNextButtonClick,
      this,
    );
    this.nextButton.on(SpriteButton.CLICK_EVENT, this.onNextButtonClick, this);
  }

  protected onNextButtonClick(): void {
    this.emit(
      SignInView.NEXT_BUTTON_CLICKED_EVENT,
      this.userNameField.getTextValue(),
    );
  }

  private prepare(): void {
    this.background.resize(this.background.width, 0);
    this.icon.setScale(0);
    this.userNameField.setAlpha(0);
    this.nextButton.setScale(0);
  }
}
