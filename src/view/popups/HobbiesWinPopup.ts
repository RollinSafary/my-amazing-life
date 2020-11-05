import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../assets';
import { Translation } from '../../translations';
import { ITextStyle } from '../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../utils/simpleButton/SimpleButton';
import StandardPopup from './StandardPopup';

export enum HobbiesWinPopupAction {
  MENU,
  PLAY_AGAIN,
}
export default class HobbiesWinPopup extends StandardPopup {
  public static NAME: string = 'HobbiesWinPopup';
  public static PLAY_AGAIN_NOTIFICATION: string = `${HobbiesWinPopup.NAME}PlayAgainNotification`;
  public static MENU_CLICKED_NOTIFICATION: string = `${HobbiesWinPopup.NAME}MenuClickedNotification`;

  protected title: ExtendedText;
  protected messagePart0: ExtendedText;
  protected clusterName: ExtendedText;
  protected messagePart1: ExtendedText;
  protected playAgainButton: SimpleButton;
  protected menuButton: SimpleButton;

  public prepareToShow(x: number, y: number, cluster: string): void {
    this.createMessage(cluster);
    super.prepareToShow(x, y);
  }

  protected createComponents(): void {
    this.createColoredBlocker(0.7);
    this.createBgImage(
      MultiAtlases.Hobbies.Atlas.Name,
      MultiAtlases.Hobbies.Atlas.Frames.PopupBackground,
    );
    this.createTitle();
    this.createButtons();
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 56,
      fill: '#ffdc3d',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.475,
      text: Translation.HOBBIES_WIN_POPUP_TITLE,
      style,
    });
    this.add(this.title);
    this.title.setOrigin(0.5, 0);
    this.title.setWordWrapWidth(this.width * 0.9);
    this.title.setAlign('center');
  }

  protected createButtons(): void {
    this.createPlayAgainButton();
    this.createMenuButton();
    this.setListeners();
  }

  protected createPlayAgainButton(): void {
    const textConfig: ISimpleButtonText = {
      text: Translation.HOBBIES_BUTTON_PLAY_AGAIN,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 36,
      fill: '#1f4226',
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.PopupButtonPlayAgain,
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.playAgainButton = new SimpleButton(this.scene, configs);
    this.add(this.playAgainButton);
    this.playAgainButton.x = -this.width * 0.2;
    this.playAgainButton.y = this.height * 0.4;
  }

  protected createMenuButton(): void {
    const textConfig: ISimpleButtonText = {
      text: Translation.HOBBIES_BUTTON_MENU,
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 36,
      fill: '#1f4226',
      origin: {
        x: 0.5,
        y: 0.5,
      },
    };
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.PopupButtonMenu,
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.menuButton = new SimpleButton(this.scene, configs);
    this.add(this.menuButton);
    this.menuButton.x = -this.playAgainButton.x;
    this.menuButton.y = this.playAgainButton.y;
  }

  protected createMessage(cluster: string): void {
    this.createMessagePart0();
    this.createClusterName(cluster);
    this.createMessagePart1();
  }

  protected createMessagePart0(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#ffffff',
    };
    this.messagePart0 = this.scene.make.extText({
      x: 0,
      y: this.title.y + this.title.height * 1.1,
      text: Translation.HOBBIES_WIN_POPUP_MESSAGE_PART_0,
      style,
    });
    this.add(this.messagePart0);
    this.messagePart0.setOrigin(0.5, 0);
    this.messagePart0.setAlign('center');
    this.messagePart0.setWordWrapWidth(this.width * 0.9);
  }
  protected createClusterName(clusterName: string): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 45,
      fill: '#ffdc3d',
    };
    this.clusterName = this.scene.make.extText({
      x: 0,
      y: this.messagePart0.y + this.messagePart0.height * 1.1,
      text: `hobbies-cluster-name-${clusterName}`,
      style,
    });
    this.add(this.clusterName);
    this.clusterName.setOrigin(0.5, 0);
    this.clusterName.setWordWrapWidth(this.width * 0.8);
  }

  protected createMessagePart1(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#ffffff',
    };
    this.messagePart1 = this.scene.make.extText({
      x: 0,
      y: this.clusterName.y + this.clusterName.height * 1.1,
      text: Translation.HOBBIES_WIN_POPUP_MESSAGE_PART_1,
      style,
    });
    this.add(this.messagePart1);
    this.messagePart1.setOrigin(0.5, 0);
    this.messagePart1.setAlign('center');
    this.messagePart1.setWordWrapWidth(this.width * 0.9);
  }

  protected setListeners(): void {
    this.menuButton.on(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, HobbiesWinPopupAction.MENU),
    );
    this.playAgainButton.on(
      SimpleButton.CLICK_EVENT,
      this.onAction.bind(this, HobbiesWinPopupAction.PLAY_AGAIN),
    );
  }
}
