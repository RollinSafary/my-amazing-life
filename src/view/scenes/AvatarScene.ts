import { Atlases, Fonts, Images } from '../../assets';
import { Translation } from '../../translations';
import AvatarPreview from '../components/avatar/AvatarPreview';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import { IButtonState } from '../utils/simpleButton/SimpleButtonInterfaces';
import BaseScene from './BaseScene';

export enum AvatarAction {
  CLEAR,
  SUBMIT,
}

export default class AvatarScene extends BaseScene {
  public static NAME: string = 'AvatarScene';
  public static ACTION_DONE_EVENT: string = 'actionDone';
  public static CLEAR_NOTIFICATION: string = `${AvatarScene.NAME}ClearNotification`;
  public static SUBMIT_NOTIFICATION: string = `${AvatarScene.NAME}SubmitNotification`;
  public static ERROR_NOTIFICATION: string = `${AvatarScene.NAME}ErrorNotification`;
  public static STARTED_NOTIFICATION: string = `${AvatarScene.NAME}StartedNotification`;

  protected background: Phaser.GameObjects.Image;
  protected logo: Phaser.GameObjects.Image;
  protected previewSection: AvatarPreview;
  protected clearButton: SimpleButton;
  protected submitButton: SimpleButton;

  constructor() {
    super(AvatarScene.NAME);
  }

  public create(): void {
    this.createBackground();
    this.createLogo();
    this.createButtons();
    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.make.image({
      x: this.width / 2,
      y: this.height / 2,
      key: Images.WhitePixel.Name,
    });
    this.background.setScale(this.width, this.height);
    this.add.existing(this.background);
    this.background.setTint(0x01788e);
  }
  protected createLogo(): void {
    this.logo = this.make.image({
      x: 0,
      y: 0,
      key: Atlases.Avatar.Atlas.Name,
      frame: Atlases.Avatar.Atlas.Frames.Logo,
    });
    this.logo.setScale(0.5);
    this.logo.x = this.width - this.logo.displayWidth / 2 - this.height * 0.04;
    this.logo.y = this.logo.displayHeight / 2 + this.height * 0.04;
    this.add.existing(this.logo);
  }

  protected createButtons(): void {
    this.createSubmitButton();
    this.createClearButton();
  }

  protected createSubmitButton(): void {
    const normalStateConfig: IButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ControlButton,
    };
    const textConfig: ISimpleButtonText = {
      text: Translation.AVATAR_BUTTON_SUBMIT,
      fontSize: 30,
      fontFamily: Fonts.ArialBlack.Name,
      fill: '#b10003',
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.submitButton = new SimpleButton(this, configs);
    this.add.existing(this.submitButton);
    this.submitButton.setScale((this.width * 0.15) / this.submitButton.width);
    this.submitButton.x = this.logo.x;
    this.submitButton.y =
      this.height - this.submitButton.displayHeight * 0.5 - this.height * 0.04;
  }
  protected createClearButton(): void {
    const normalStateConfig: IButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ControlButton,
    };
    const textConfig: ISimpleButtonText = {
      text: Translation.AVATAR_BUTTON_CLEAR,
      fontSize: 30,
      fontFamily: Fonts.ArialBlack.Name,
      fill: '#b10003',
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.clearButton = new SimpleButton(this, configs);
    this.add.existing(this.clearButton);
    this.clearButton.setScale((this.width * 0.15) / this.clearButton.width);
    this.clearButton.x = this.submitButton.x;
    this.clearButton.y =
      this.submitButton.y - this.clearButton.displayHeight * 1.5;
  }

  protected setListeners(): void {
    this.clearButton.on(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, AvatarAction.CLEAR),
    );
    this.submitButton.on(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, AvatarAction.SUBMIT),
    );
  }

  protected onAction(action: AvatarAction): void {
    this.events.emit(AvatarScene.ACTION_DONE_EVENT, action);
  }
}
