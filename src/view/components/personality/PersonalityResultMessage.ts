import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, Images, MultiAtlases } from '../../../assets';
import { gameConfig } from '../../../constants/GameConfig';
import { Translation } from '../../../translations';
import BaseScene from '../../scenes/BaseScene';
import PersonalityScene from '../../scenes/PersonalityScene';
import { ITextStyle } from '../../utils/phaser/PhaserUtils';
import TypeWriter from '../../utils/phaser/TypeWriter';
import ISimpleButtonState from '../../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../../utils/simpleButton/SimpleButton';

export default class PersonalityResultMessage extends Phaser.GameObjects
  .Container {
  protected background: Phaser.GameObjects.Image;
  protected messageText: TypeWriter;
  protected playAgainButton: SimpleButton;
  protected menuButton: SimpleButton;

  constructor(protected scene: BaseScene, protected colorName: string) {
    super(scene);
    this.createComponents();
    this.setAlpha(0);
  }

  public async show(): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this,
        alpha: 1,
        duration: 300,
        onComplete: () => {
          this.startTypeWriting();
        },
      });
    });
  }

  protected async startTypeWriting(): Promise<void> {
    await this.messageText.play(4000);
    this.scene.tweens.add({
      targets: [this.playAgainButton, this.menuButton],
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 200,
      ease: Phaser.Math.Easing.Back.Out,
    });
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.displayWidth, this.background.displayHeight);
    this.createMessageText();
    this.createButtons();
    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add(this.background);
    this.background.setScale(
      gameConfig.designWidth * 0.5,
      gameConfig.designHeight * 0.5,
    );
    this.background.setTint(0x000000);
    this.background.setAlpha(0.7);
  }

  protected createMessageText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 24,
      fill: '#ffffff',
    };
    const text: ExtendedText = this.scene.make.extText({
      x: -this.width * 0.49,
      y: 0,
      text: (Translation as any)[
        `PERSONALITY_RECOMMENDATION_${this.colorName.toUpperCase()}`
      ],
      style,
    });
    text.setOrigin(0, 0);
    text.setWordWrapWidth(this.width);
    this.messageText = new TypeWriter(this.scene, text);
    this.add(this.messageText);
    this.messageText.y = -this.height * 0.48;
  }

  protected createButtons(): void {
    this.createPlayAgainButton();
    this.createMenuButton();
  }

  protected createPlayAgainButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Personality.Atlas.Name,
      frame: MultiAtlases.Personality.Atlas.Frames.ButtonPlayAgain,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
      text: Translation.PERSONALITY_BUTTON_PLAY_AGAIN,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.playAgainButton = new SimpleButton(this.scene, configs);
    this.add(this.playAgainButton);
    this.playAgainButton.x = -this.playAgainButton.width * 0.6;
    this.playAgainButton.y =
      this.height * 0.5 - this.playAgainButton.height * 0.6;
    this.playAgainButton.setScale(0);
  }
  protected createMenuButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Personality.Atlas.Name,
      frame: MultiAtlases.Personality.Atlas.Frames.ButtonMenu,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
      text: Translation.PERSONALITY_BUTTON_MENU,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.menuButton = new SimpleButton(this.scene, configs);
    this.add(this.menuButton);
    this.menuButton.x = -this.playAgainButton.x;
    this.menuButton.y = this.playAgainButton.y;
    this.menuButton.setScale(0);
  }

  protected setListeners(): void {
    this.playAgainButton.on(
      SimpleButton.CLICK_EVENT,
      this.onPlayAgainClick,
      this,
    );
    this.menuButton.on(SimpleButton.CLICK_EVENT, this.onMenuClick, this);
  }

  protected onPlayAgainClick(): void {
    this.scene.events.emit(PersonalityScene.PLAY_CLICKED_EVENT);
  }
  protected onMenuClick(): void {
    this.scene.events.emit(PersonalityScene.MENU_CLICKED_EVENT);
  }
}
