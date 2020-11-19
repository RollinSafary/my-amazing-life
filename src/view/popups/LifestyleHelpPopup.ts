import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Atlases } from '../../assets';
import { Translation } from '../../translations';
import { ITextStyle } from '../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import StandardPopup from './StandardPopup';

export enum LifeStyleHelpAction {
  CONTINUE,
  PLAY,
}
export class LifestyleHelpPopup extends StandardPopup {
  public static NAME: string = 'LifestyleHelpPopup';

  protected title: ExtendedText;
  protected message: ExtendedText;
  protected closeButton: SimpleButton;

  public showNextPart(): void {
    this.message.setText(Translation.LIFESTYLE_HELP_POPUP_MESSAGE_1);
    this.closeButton.setText(Translation.LIFESTYLE_BUTTON_PLAY);
    this.closeButton.once(SimpleButton.CLICK_EVENT, this.onAction, this);
  }

  protected createComponents(): void {
    this.createColoredBlocker(0.7);
    this.createBg(
      Atlases.Popups.Atlas.Name,
      Atlases.Popups.Atlas.Frames.BackgroundBlue,
      this.scene.width * 0.7,
      this.scene.height * 0.8,
    ).setAlpha(0.8);
    this.createTitle();
    this.createExtendedText();
    this.createCloseButton();
    this.setListeners();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#64d9ff',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.4,
      text: Translation.LIFESTYLE_HELP_POPUP_TITLE,
      style,
    });
    this.title.setOrigin(0.5);
    this.add(this.title);
  }
  protected createExtendedText(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 36,
      fill: '#ffffff',
    };
    this.message = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.LIFESTYLE_HELP_POPUP_MESSAGE_0,
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
      fontFamily: 'Arial',
      fontSize: 36,
      fill: '#ffffff',
      text: Translation.LIFESTYLE_BUTTON_CONTINUE,
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
    this.closeButton.once(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, LifeStyleHelpAction.CONTINUE),
    );
  }
}
