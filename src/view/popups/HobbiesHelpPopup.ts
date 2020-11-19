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

export default class HobbiesHelpPopup extends StandardPopup {
  public static NAME: string = 'HobbiesHelpPopup';

  protected title: ExtendedText;
  protected message: ExtendedText;
  protected closeButton: SimpleButton;

  protected createComponents(): void {
    this.createColoredBlocker(0.7);
    this.createBg(
      Atlases.Popups.Atlas.Name,
      Atlases.Popups.Atlas.Frames.BackgroundYellow,
      this.scene.width * 0.7,
      this.scene.height * 0.8,
    );
    this.createTitle();
    this.createExtendedText();
    this.createCloseButton();
    this.setListeners();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 36,
      fill: '#fdb512',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.4,
      text: Translation.HOBBIES_HELP_POPUP_TITLE,
      style,
    });
    this.title.setOrigin(0.5);
    this.add(this.title);
  }
  protected createExtendedText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
    };
    this.message = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.HOBBIES_HELP_POPUP_MESSAGE,
      style,
    });
    this.message.setOrigin(0.5);
    this.message.setAlign('center');
    this.add(this.message);
    this.message.setWordWrapWidth(this.width * 0.9);
  }
  protected createCloseButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.ButtonOrange,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#ffffff',
      text: Translation.HOBBIES_HELP_POPUP_BUTTON_PLAY,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.closeButton = new SimpleButton(this.scene, configs);
    this.closeButton.y = this.height * 0.4;
    this.add(this.closeButton);
  }

  protected setListeners(): void {
    this.closeButton.on(SimpleButton.CLICK_EVENT, this.onAction, this);
  }
}
