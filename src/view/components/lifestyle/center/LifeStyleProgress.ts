import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';

export default class LifeStyleProgress extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected fill: Phaser.GameObjects.TileSprite;
  protected text: ExtendedText;
  public progress: number = 0;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public async setProgress(progress: number): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.killTweensOf(this);
      this.scene.tweens.add({
        targets: this,
        progress: Math.min(progress, 1),
        duration: 400,
        onUpdate: () => {
          this.fill.width = this.progress * this.frame.width;
        },
        onComplete: () => {
          this.progress = progress;
          this.fill.width = this.progress * this.frame.width;
          resolve();
        },
      });
    });
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createFill();
    this.createText();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.CenterProgressBackground,
    });
    this.add(this.background);
  }

  protected createFill(): void {
    this.fill = this.scene.make.tileSprite({
      x: -this.frame.width * 0.5,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.CenterProgressFill,
      height: this.frame.height,
    });
    this.fill.setOrigin(0, 0.5);
    this.add(this.fill);
    this.fill.width = 0;
  }

  protected createText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 20,
      fill: '#d9e9ed',
    };
    this.text = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.PROGRESS,
      style,
    });
    this.text.setStroke('#b6ccd1', 1);
    this.text.setOrigin(0.5);
    this.add(this.text);
  }

  get frame(): Phaser.Textures.Frame {
    return this.scene.textures.getFrame(
      MultiAtlases.Lifestyle.Atlas.Name,
      MultiAtlases.Lifestyle.Atlas.Frames.CenterProgressFill,
    );
  }
}
