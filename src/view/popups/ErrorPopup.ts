import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Atlases, Fonts } from '../../assets';
import { ERROR_CODE } from '../../constants/Constants';
import { Translation } from '../../translations';
import PopupScene from '../scenes/PopupScene';
import { getScene, ITextStyle } from '../utils/phaser/PhaserUtils';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import { ISpriteButtonState } from '../utils/simpleButton/SimpleButtonInterfaces';
import { SpriteButton } from '../utils/simpleButton/SpriteButton';
import StandardPopup from './StandardPopup';

export default class ErrorPopup extends StandardPopup {
  public static NAME: string = 'ErrorPopup';

  protected title: ExtendedText;
  protected message: ExtendedText;
  protected okButton: SimpleButton;

  constructor() {
    super(getScene(PopupScene.NAME));
  }

  public prepareToShow(x: number, y: number, errorCode: ERROR_CODE): void {
    this.message.setText((Translation as any)[`ERROR_${errorCode}`]);
    super.prepareToShow(x, y);
  }

  protected createComponents(): void {
    this.createColoredBlocker(0.5);
    this.createBgImage(
      Atlases.Login.Atlas.Name,
      Atlases.Login.Atlas.Frames.BackgroundError,
    );
    this.createTitle();
    this.createText();
    this.createOkButton();
    this.setListeners();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 50,
      fill: '#ffffff',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.4,
      text: Translation.REGISTRATION_ERROR_POPUP_TITLE,
      style,
    });
    this.add(this.title);
    this.title.setOrigin(0.5);
  }

  protected createText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 36,
      fill: '#ffb80d',
    };
    this.message = this.scene.make.extText({
      x: 0,
      y: 0,
      text: '',
      style,
    });
    this.add(this.message);
    this.message.setOrigin(0.5);
    this.message.setAlign('center');
    this.message.setWordWrapWidth(this.width * 0.9);
  }

  protected createOkButton(): void {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Login.Atlas.Name,
      frame: Atlases.Login.Atlas.Frames.ButtonOrange,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
      text: Translation.ERROR_BUTTON_OK,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const config: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.okButton = new SimpleButton(this.scene, config);
    this.okButton.y = this.height * 0.3;
    this.add(this.okButton);
  }

  protected setListeners(): void {
    this.okButton.on(SpriteButton.CLICK_EVENT, this.onAction, this);
  }

  protected blockerPointerDown(): void {
    this.onAction(StandardPopup.ACTION_CLOSE);
  }
}
