import { Atlases, Fonts } from '../../../../assets';
import { ERROR_CODE } from '../../../../constants/Constants';
import { IPlayerRegistrationData } from '../../../../model/vo/PlayerVO';
import { Translation } from '../../../../translations';
import { validateEmail } from '../../../../utils/Utils';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import ISimpleButtonText from '../../../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../../../utils/simpleButton/SimpleButton';
import {
  ISpriteButtonConfig,
  ISpriteButtonState,
} from '../../../utils/simpleButton/SimpleButtonInterfaces';
import { SpriteButton } from '../../../utils/simpleButton/SpriteButton';
import BaseTextField from '../../../utils/textField/BaseTextField';
import BaseLoginView from '../BaseLoginView';
import PasswordTextField from './PasswordTextField';
import RegisterTextField from './RegistrationTextField';

export default class RegistrationView extends BaseLoginView {
  public static NAME: string = 'RegistrationView';

  public static ERROR_EVENT: string = 'error';
  public static PLAY_AS_GUEST_EVENT: string = 'playAsGuest';
  public static BACK_EVENT: string = 'back';
  public static FORM_COMPLETE_EVENT: string = 'formComplete';

  public static PLAY_AS_GUEST_NOTIFICATION: string = `${RegistrationView.NAME}PlayAsGuestNotification`;
  public static BACK_NOTIFICATION: string = `${RegistrationView.NAME}BackNotification`;
  public static ERROR_NOTIFICATION: string = `${RegistrationView.NAME}ErrorNotification`;
  public static FORM_COMPLETE_NOTIFICATION: string = `${RegistrationView.NAME}FormCompleteNotification`;

  protected titleText: Phaser.GameObjects.Text;
  protected firstNameField: RegisterTextField;
  protected lastNameField: RegisterTextField;
  protected emailField: RegisterTextField;
  protected passwordField: PasswordTextField;
  protected confirmPasswordField: PasswordTextField;
  protected nextButton: SimpleButton;
  protected backButton: SpriteButton;

  protected fields: BaseTextField[];

  public updateFields(email: string, password: string): void {
    this.emailField.setText(email);
    this.passwordField.setText(password);
  }

  public hideBackButton(): void {
    this.backButton.setVisible(false);
  }

  protected createBackground(): void {
    const frame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      Atlases.Popups.Atlas.Name,
      Atlases.Popups.Atlas.Frames.BackgroundOrange,
    );
    this.background = this.scene.make.ninePatch({
      x: 0,
      y: 0,
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.BackgroundOrange,
      width: frame.width,
      height: frame.height * 1.5,
    });
    this.add(this.background);
  }

  protected createContent(): void {
    this.createTitle();
    this.fields = [];
    this.createNameFields();
    this.createEmailField();
    this.createPasswordFields();
    this.createNextButton();
    this.createBackButton();
    this.setFieldsPositions();
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
    this.add(this.firstNameField);
    this.add(this.lastNameField);
    this.fields.push(this.firstNameField, this.lastNameField);
  }

  protected createEmailField(): void {
    this.emailField = new RegisterTextField(
      this.scene,
      'email',
      Translation.REGISTRATION_EMAIL,
    );
    this.add(this.emailField);
    this.fields.push(this.emailField);
  }

  protected createPasswordFields(): void {
    this.passwordField = new PasswordTextField(
      this.scene,
      Translation.REGISTRATION_PASSWORD,
    );
    this.confirmPasswordField = new PasswordTextField(
      this.scene,
      Translation.REGISTRATION_CONFIRM_PASSWORD,
    );
    this.add(this.passwordField);
    this.add(this.confirmPasswordField);
    this.fields.push(this.passwordField, this.confirmPasswordField);
  }

  protected createNextButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.ButtonRed,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      text: Translation.REGISTRATION_BUTTON_NEXT,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const config: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.nextButton = new SimpleButton(this.scene, config);
    this.add(this.nextButton);
    this.nextButton.y = this.height * 0.4;
  }
  protected createBackButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ButtonBack,
    };
    const config: ISpriteButtonConfig = {
      normalStateConfig,
    };
    this.backButton = new SpriteButton(this.scene, config);
    this.add(this.backButton);
    this.backButton.setScale(0.7);
    this.backButton.x = -this.width * 0.5 + this.backButton.displayWidth * 0.5;
    this.backButton.y = this.height * 0.5 + this.backButton.displayHeight * 0.8;
  }

  protected setFieldsPositions(): void {
    const line: Phaser.Geom.Line = new Phaser.Geom.Line(
      0,
      this.titleText.y - this.titleText.height * 0.5,
      0,
      this.nextButton.y,
    );
    const points: Phaser.Geom.Point[] = line.getPoints(this.fields.length + 1);
    points.shift();
    for (let i: number = 0; i < this.fields.length; i++) {
      this.fields[i].y = points[i].y;
    }
  }

  protected setListeners(): void {
    this.nextButton.on(SpriteButton.CLICK_EVENT, this.onNextButtonClick, this);
    this.backButton.on(SpriteButton.CLICK_EVENT, this.onBackButtonClick, this);
    for (const field of this.fields) {
      field.on(BaseTextField.INPUT_DONE_EVENT, this.onInputDone, this);
      field.on(BaseTextField.FOCUS_EVENT, this.onFieldFocus, this);
    }
  }

  protected onFieldFocus(focusedField: BaseTextField): void {
    for (const field of this.fields) {
      if (field === focusedField) {
        continue;
      }
      field.blur();
    }
  }

  protected onInputDone(field: BaseTextField): void {
    if (!this.checkFieldConditions(field)) {
      return;
    }
    const index: number = this.fields.indexOf(field);
    const nextField: BaseTextField = this.fields[index + 1];
    nextField ? nextField.focus() : this.onNextButtonClick();
  }

  protected onNextButtonClick(): void {
    for (const field of this.fields) {
      if (this.checkFieldConditions(field)) {
      } else {
        break;
      }
    }
    const data: IPlayerRegistrationData = {
      firstName: this.firstNameField.getTextValue(),
      lastName: this.lastNameField.getTextValue(),
      email: this.emailField.getTextValue(),
      password: this.passwordField.getTextValue(),
    };
    this.emit(RegistrationView.FORM_COMPLETE_EVENT, data);
  }

  protected onBackButtonClick(): void {
    this.emit(RegistrationView.BACK_EVENT);
  }

  protected checkFieldConditions(field: BaseTextField): boolean {
    switch (true) {
      case field == this.firstNameField:
        if (this.firstNameField.getTextValue().length === 0) {
          this.firstNameField.focus();
          this.emit(
            RegistrationView.ERROR_EVENT,
            ERROR_CODE.REGISTRATION_UNFILLED_FIELD,
          );
          return false;
        }
        return true;
      case field == this.lastNameField:
        if (this.lastNameField.getTextValue().length === 0) {
          this.lastNameField.focus();
          this.emit(
            RegistrationView.ERROR_EVENT,
            ERROR_CODE.REGISTRATION_UNFILLED_FIELD,
          );
          return false;
        }
        return true;
      case field == this.emailField:
        if (!validateEmail(field.getTextValue())) {
          this.emailField.focus();
          this.emit(
            RegistrationView.ERROR_EVENT,
            ERROR_CODE.REGISTRATION_INVALID_EMAIL,
          );
          return false;
        }
        return true;
      case field == this.passwordField:
        if (this.passwordField.getTextValue().length < 6) {
          this.passwordField.focus();
          this.emit(
            RegistrationView.ERROR_EVENT,
            ERROR_CODE.REGISTRATION_SHORT_PASSWORD,
          );
          return false;
        }
        return true;
      case field == this.confirmPasswordField:
        if (
          this.passwordField.getTextValue() !==
          this.confirmPasswordField.getTextValue()
        ) {
          this.confirmPasswordField.focus();
          this.emit(
            RegistrationView.ERROR_EVENT,
            ERROR_CODE.REGISTRATION_MISMATCH_PASSWORD,
          );
          return false;
        }
        return true;
      default:
        return false;
    }
  }
}
