import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, Images, MultiAtlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import { LifeStylePanelItem } from './LifeStylePanelItem';

export class LifeStylePanelItemPrice extends Phaser.GameObjects.Container {
  public parentContainer: LifeStylePanelItem;
  protected background: Phaser.GameObjects.Image;
  protected priceText: ExtendedText;
  protected nameText: ExtendedText;

  constructor(
    protected scene: BaseScene,
    protected config: ILifeStylePanelItemPriceConfig,
  ) {
    super(scene);
    this.createComponents();
    this.setAlpha(0.6);
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.displayWidth, this.background.displayHeight);
    this.createNameText();
    this.createPriceText();
    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    const frame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      MultiAtlases.Lifestyle.Atlas.Name,
      MultiAtlases.Lifestyle.Atlas.Frames.PanelTextBox,
    );
    this.background.setScale(frame.width * 0.45, frame.height * 0.4);
    this.background.setTint(0x00ff00);
    this.add(this.background);
  }

  protected createNameText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
    };
    this.nameText = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.25,
      text: this.config.nameKey,
      style,
      i18nOptions: {
        value: this.config.value,
      },
    });
    this.nameText.setOrigin(0.5);
    this.add(this.nameText);
  }

  protected createPriceText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#ffffff',
    };
    this.priceText = this.scene.make.extText({
      x: 0,
      y: this.height * 0.25,
      text: this.config.key,
      style,
      i18nOptions: {
        value: this.config.value,
      },
    });
    this.priceText.setOrigin(0.5);
    this.add(this.priceText);
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_OVER, this.onHover, this);
    this.on(Phaser.Input.Events.POINTER_OUT, this.onOut, this);
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
  }

  protected onDown(): void {
    this.once(Phaser.Input.Events.POINTER_UP, this.onClick, this);
  }

  protected onHover(): void {
    this.setAlpha(1);
  }

  protected onOut(): void {
    this.setAlpha(0.6);
    this.off(Phaser.Input.Events.POINTER_UP, this.onClick, this);
  }

  protected onClick(): void {
    this.parentContainer.emitChoice(this.config.value);
  }
}

export interface ILifeStylePanelItemPriceConfig {
  nameKey: string;
  key: string;
  value: number;
}
