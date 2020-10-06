import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';
import { ITextStyle } from '../../utils/phaser/PhaserUtils';

export default class LifeStylePanelItem extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected shadow: Phaser.GameObjects.Image;
  protected innerBox: Phaser.GameObjects.Image;
  protected icon: Phaser.GameObjects.Image;
  protected textBox: Phaser.GameObjects.Image;
  protected title: ExtendedText;
  protected description: ExtendedText;
  protected price: Phaser.GameObjects.Text;

  constructor(
    protected scene: BaseScene,
    protected color: number,
    protected xIndex: number,
    protected yIndex: number,
    protected index: number,
  ) {
    super(scene);
    this.createComponents();
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createShadow();
    this.createInnerBox();
    this.createIcon();
    this.createTextBox();
    this.createTitle();
    this.createDescription();
    this.createPrice();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelBorder,
    });
    this.add(this.background);
    this.background.setTint(this.color);
  }

  protected createShadow(): void {
    this.shadow = this.scene.make.image({
      x: this.width * 0.1,
      y: this.height * 0.1,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelBorder,
    });
    this.add(this.shadow);
    this.shadow.setTintFill(0x8e8e8e);
    this.shadow.setAlpha(0.5);
    this.sendToBack(this.shadow);
  }
  protected createInnerBox(): void {
    this.innerBox = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelInnerBox,
    });
    this.add(this.innerBox);
    this.innerBox.setAlpha(0.5);
  }
  protected createIcon(): void {
    this.icon = this.scene.make.image({
      x: 0,
      y: -this.height * 0.2,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: (MultiAtlases.Lifestyle.Atlas.Frames as any)[
        `PanelIcon${this.xIndex}${this.yIndex}${this.index}`
      ],
    });
    this.add(this.icon);
  }
  protected createTextBox(): void {
    this.textBox = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      // frame: MultiAtlases.Lifestyle.Atlas.Frames.PanelTextBox
    });
    this.textBox.y =
      this.icon.y + this.icon.height / 2 + this.textBox.height / 2;
    this.add(this.textBox);
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 26,
      fill: this.color.toString(16),
    };
  }
  protected createDescription(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 26,
      fill: '#000000',
    };
  }
  protected createPrice(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 26,
      fill: this.color.toString(16),
    };
  }
}
