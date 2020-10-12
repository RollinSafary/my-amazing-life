import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../assets';
import { ILifeStyleSectionConfig } from '../../../constants/Constants';
import { Translation } from '../../../translations';
import BaseScene from '../../scenes/BaseScene';
import { ITextStyle } from '../../utils/phaser/PhaserUtils';

export default class LifeStyleInstructions extends Phaser.GameObjects
  .Container {
  protected background: Phaser.GameObjects.Image;
  protected title: ExtendedText;
  protected text: ExtendedText;
  protected sectionConfig: ILifeStyleSectionConfig;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public setSectionConfig(config: ILifeStyleSectionConfig): void {
    this.sectionConfig = config;
    this.text.setText(
      (Translation as any)[
        `LIFESTYLE_INSTRUCTIONS_DETAILS_${this.sectionConfig.x}_${this.sectionConfig.y}`
      ],
    );
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.displayWidth, this.background.displayHeight);
    this.createTitle();
    this.createText();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.TopBackground,
    });
    this.add(this.background);
    this.background.setAlpha(0.8);
  }

  protected createTitle(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 28,
      fill: '#89b7cf',
    };
    this.title = this.scene.make.extText({
      x: 0,
      y: -this.height * 0.35,
      text: Translation.LIFESTYLE_INSTRUCTIONS_TITLE,
      style,
    });
    this.title.setOrigin(0.5);
    this.title.setAlign('center');
    this.add(this.title);
  }
  protected createText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 20,
      fill: '#89b7cf',
    };
    this.text = this.scene.make.extText({
      x: 0,
      y: this.title.y + this.title.height * 0.55,
      text: Translation.LIFESTYLE_INSTRUCTIONS_TITLE,
      style,
    });
    this.text.setOrigin(0.5, 0);
    this.text.setWordWrapWidth(this.width * 0.9);
    this.add(this.text);
  }
}
