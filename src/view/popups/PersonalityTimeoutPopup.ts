import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Atlases, Fonts } from '../../assets';
import { gameConfig } from '../../constants/GameConfig';
import { Translation } from '../../translations';
import { ITextStyle } from '../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import { SpriteButton } from '../utils/simpleButton/SpriteButton';
import StandardPopup from './StandardPopup';

export default class PersonalityTimeoutPopup extends StandardPopup {
  public static NAME: string = 'PersonalityTimeoutPopup';
  public static OK_CLICKED_NOTIFICATION: string = `${PersonalityTimeoutPopup.NAME}OkClickedNotification`;

  protected title: ExtendedText;
  protected text: ExtendedText;
  protected okButton: SpriteButton;

  protected createBody(): void {
    this.createColoredBlocker(0.6);
    this.createBg(
      Atlases.Login.Atlas.Name,
      Atlases.Login.Atlas.Frames.BackgroundError,
      gameConfig.designWidth * 0.4,
      gameConfig.designHeight * 0.4,
    );
    this.createTitle();
    this.createText();
    this.createOkButton();
    this.setListeners();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#ffcc00',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.4,
      text: Translation.PERSONALITY_TIMEOUT_TITLE,
      style,
    });
    this.title.setOrigin(0.5);
    this.add(this.title);
  }

  protected createText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
    };
    this.text = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.PERSONALITY_TIMEOUT_TEXT,
      style,
    });
    this.text.setOrigin(0.5);
    this.add(this.text);
    this.text.setWordWrapWidth(this.width * 0.9);
  }

  protected createOkButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ButtonOk,
    };
    // const textConfig: ISimpleButtonText = {
    //   fontFamily: Fonts.ArialBlack.Name,
    //   fontSize: 28,
    //   fill: '#ffffff',
    //   text: Translation.PERSONALITY_TIMEOUT_BUTTON_OK,
    //   origin: { x: 0.5, y: 0.5 },
    // };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
    };
    this.okButton = new SpriteButton(this.scene, configs);
    this.add(this.okButton);
    this.okButton.y =
      this.text.y + this.text.height * 0.55 + this.okButton.height * 0.5;
  }

  protected setListeners(): void {
    this.okButton.on(SimpleButton.CLICK_EVENT, this.onAction, this);
  }
}
