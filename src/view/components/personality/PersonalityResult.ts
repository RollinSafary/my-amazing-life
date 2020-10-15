import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, Images } from '../../../assets';
import { Translation } from '../../../translations';
import BaseScene from '../../scenes/BaseScene';
import { ITextStyle } from '../../utils/phaser/PhaserUtils';

export class PersonalityResult extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected progress: Phaser.GameObjects.Image;
  protected nameText: ExtendedText;
  protected valueText: ExtendedText;

  constructor(
    protected scene: BaseScene,
    protected config: IPersonalityResultConfig,
  ) {
    super(scene);
    this.createComponents();
  }

  public async animateProgress(): Promise<void> {
    return new Promise<void>(resolve => {
      const target: any = {
        value: 0,
      };
      this.scene.tweens.add({
        targets: target,
        value: this.config.value,
        onUpdate: () => {
          this.progress.setScale(
            (this.background.displayWidth * target.value) / 100,
            this.progress.scaleY,
          );
          this.valueText.setText(Translation.PERSONALITY_OPTION_VALUE, {
            value: Math.floor(target.value),
          });
        },
        onComplete: () => {
          this.progress.setScale(
            (this.background.displayWidth * this.config.value) / 100,
            this.progress.scaleY,
          );
          this.valueText.setText(Translation.PERSONALITY_OPTION_VALUE, {
            value: this.config.value,
          });
          resolve();
        },
      });
    });
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(
      this.background.displayWidth,
      this.background.displayHeight * 2,
    );
    this.createProgress();
    this.createNameText();
    this.createValueText();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add(this.background);
    this.background.setScale(452, this.scene.height / 12);
    this.background.setTint(this.config.color);
  }
  protected createProgress(): void {
    this.progress = this.scene.make.image({
      x: -this.width * 0.5,
      y: this.background.displayHeight,
      key: Images.WhitePixel.Name,
    });
    this.add(this.progress);
    this.progress.setScale(0, this.background.displayHeight);
    // this.progress.setTint(this.config.color);
    this.progress.setAlpha(0.6);
    this.progress.setOrigin(0, 0.5);
  }

  protected createNameText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 34,
      fill: '#ffffff',
    };
    this.nameText = this.scene.make.extText({
      x: -this.width * 0.49,
      y: 0,
      text: (Translation as any)[
        `PERSONALITY_OPTION_${this.config.colorName.toUpperCase()}`
      ],
      style,
    });
    this.nameText.setOrigin(0, 0.5);
    this.add(this.nameText);
  }

  protected createValueText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 24,
      fill: '#ffffff',
    };
    this.valueText = this.scene.make.extText({
      x: this.width * 0.49,
      y: 0,
      text: Translation.PERSONALITY_OPTION_VALUE,
      style,
      i18nOptions: {
        value: 0,
      },
    });
    this.valueText.setOrigin(1, 0.5);
    this.add(this.valueText);
  }
}

export interface IPersonalityResultConfig {
  colorName: string;
  color: number;
  value: number;
}
