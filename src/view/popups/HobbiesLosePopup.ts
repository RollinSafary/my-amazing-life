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

export enum HobbiesLoseAction {
  PLAY_AGAIN,
  MENU,
}
export class HobbiesLosePopup extends StandardPopup {
  public static NAME: string = 'HobbiesLosePopup';
  public static PLAY_AGAIN_CLICKED_NOTIFICATION: string = `${HobbiesLosePopup.NAME}PlayAgainClickedNotification`;
  public static MENU_CLICKED_NOTIFICATION: string = `${HobbiesLosePopup.NAME}MenuClickedNotification`;

  protected message: ExtendedText;
  protected playAgainButton: SimpleButton;
  protected menuButton: SimpleButton;

  protected createComponents(): void {
    this.createColoredBlocker(0.7);
    this.createBg(
      Atlases.Popups.Atlas.Name,
      Atlases.Popups.Atlas.Frames.BackgroundYellow,
      this.scene.width * 0.6,
      this.scene.height * 0.6,
    );
    this.createExtendedText();
    this.createPlayAgainButton();
    this.createMenuButton();
    this.setListeners();
  }

  protected createExtendedText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 42,
      fill: '#ffffff',
    };
    this.message = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.45,
      text: Translation.HOBBIES_LOSE_POPUP_MESSAGE,
      style,
    });
    this.message.setOrigin(0.5, 0);
    this.message.setAlign('left');
    this.add(this.message);
    this.message.setWordWrapWidth(this.width * 0.9);
  }
  protected createPlayAgainButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.ButtonYellow,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#1f4226',
      text: Translation.HOBBIES_LOSE_POPUP_BUTTON_PLAY_AGAIN,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.playAgainButton = new SimpleButton(this.scene, configs);
    this.playAgainButton.x = -this.width * 0.25;
    this.playAgainButton.y = this.height * 0.35;
    this.add(this.playAgainButton);
  }

  protected createMenuButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: Atlases.Popups.Atlas.Name,
      frame: Atlases.Popups.Atlas.Frames.ButtonYellow,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#1f4226',
      text: Translation.HOBBIES_LOSE_POPUP_BUTTON_MENU,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.menuButton = new SimpleButton(this.scene, configs);
    this.menuButton.x = this.width * 0.25;
    this.menuButton.y = this.playAgainButton.y;
    this.add(this.menuButton);
  }

  protected setListeners(): void {
    this.playAgainButton.on(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, HobbiesLoseAction.PLAY_AGAIN),
    );
    this.menuButton.on(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, HobbiesLoseAction.MENU),
    );
  }
}
