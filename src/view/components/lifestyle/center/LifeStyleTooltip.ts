import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, Images, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import LifeStyleWheel from './LifeStyleWheel';

export default class LifeStyleTooltip extends Phaser.GameObjects.Container {
  protected cover: Phaser.GameObjects.Image;
  protected background: Phaser.GameObjects.Image;
  protected message: ExtendedText;
  constructor(protected scene: BaseScene, protected wheel: LifeStyleWheel) {
    super(scene);
    this.createComponents();
  }

  public updateTooltip(index: number = 0): void {
    this.background.setTexture(
      MultiAtlases.Lifestyle.Atlas.Name,
      (MultiAtlases.Lifestyle.Atlas.Frames as any)[`TooltipBackground${index}`],
    );
    this.message.setText(
      (Translation as any)[`LIFESTYLE_TUTORIAL_TEXT_${index}`],
    );
    this.message.x = this.background.x - this.width * 0.4;
    this.message.y = this.background.y - this.height * 0.1;
  }

  protected createComponents(): void {
    this.createCover();
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createMessage();
  }

  protected createCover(): void {
    this.cover = this.scene.make.image({
      x: this.scene.width / 2,
      y: this.scene.height / 2,
      key: Images.WhitePixel.Name,
    });
    this.add(this.cover);
    this.cover.setScale(this.scene.width, this.scene.height);
    this.cover.setTint(0x1d2f3a);
    this.cover.setAlpha(0.8);
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.TooltipBackground0,
    });
    this.add(this.background);
    this.background.x =
      this.wheel.x - this.wheel.width * 0.5 - this.background.width * 0.48;
    this.background.y = this.wheel.y - this.background.height * 0.05;
  }

  protected createMessage(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 32,
      fill: '#305a69',
    };
    this.message = this.scene.make.extText({
      x: this.background.x - this.width * 0.4,
      y: this.background.y - this.height * 0.1,
      text: Translation.LIFESTYLE_TUTORIAL_TEXT_0,
      style,
    });
    this.add(this.message);
    this.message.setOrigin(0);
    this.message.setAlign('left');
    this.message.setWordWrapWidth(this.width * 0.7);
    this.add(this.message);
  }
}
