import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Atlases, Fonts } from '../../assets';
import { Translation } from '../../translations';
import { ITextStyle } from '../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import StandardPopup from './StandardPopup';

export default class AvatarIntroPopup extends StandardPopup {
  public static NAME: string = 'AvatarIntroPopup';
  public static CLOSED_NOTIFICATION: string = `${AvatarIntroPopup.NAME}ClosedNotification`;

  protected title: ExtendedText;
  protected message: ExtendedText;
  protected startButton: SimpleButton;

  protected createComponents(): void {
    this.createColoredBlocker(0.7);
    this.createBg(
      Atlases.Popups.Atlas.Name,
      Atlases.Popups.Atlas.Frames.BackgroundRed,
      this.scene.width * 0.8,
      this.scene.height * 0.8,
    ).setAlpha(0.8);
    this.createTitle();
    this.createMessage();
    this.createStartButton();
    this.setListeners();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 40,
      fill: '#ffb80d',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.35,
      text: Translation.AVATAR_INTRO_POPUP_WELCOME_TITLE,
      style,
    });
    this.add(this.title);
    this.title.setOrigin(0.5);
  }
  protected createMessage(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 34,
      fill: '#ffb80d',
    };
    this.message = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.AVATAR_INTRO_POPUP_WELCOME_MESSAGE,
      style,
    });
    this.add(this.message);
    this.message.setWordWrapWidth(this.width * 0.9);
    this.message.setOrigin(0.5);
  }
  protected createStartButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.ButtonOrange,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      text: Translation.AVATAR_INTRO_POPUP_BUTTON_START,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const config: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.startButton = new SimpleButton(this.scene, config);
    this.add(this.startButton);
    this.startButton.y = this.height * 0.5 - this.startButton.height;
  }

  protected setListeners(): void {
    this.startButton.once(SimpleButton.CLICK_EVENT, this.onAction, this);
  }
}
