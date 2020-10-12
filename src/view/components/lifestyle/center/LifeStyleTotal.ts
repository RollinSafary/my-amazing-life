import { Fonts, MultiAtlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';

export default class LifeStyleTotal extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected currencyIconText: Phaser.GameObjects.Text;
  protected valueText: Phaser.GameObjects.Text;
  protected currentValue: number = 0;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public async setValue(value: number): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.killTweensOf(this);
      this.scene.tweens.add({
        targets: this,
        currentValue: value,
        duration: 400,
        onUpdate: () => {
          this.valueText.setText(`${Math.floor(this.currentValue)}`);
        },
        onComplete: () => {
          this.currentValue = value;
          this.valueText.setText(`${this.currentValue}`);
          resolve();
        },
      });
    });
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createCurrency();
    this.createValueText();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.CenterTotalBackground,
    });
    this.add(this.background);
  }

  protected createCurrency(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 36,
      fill: '#477b8a',
    };
    this.currencyIconText = this.scene.make.text({
      x: -this.width * 0.6,
      y: 0,
      text: '$',
      style,
    });
    this.currencyIconText.setOrigin(0.5);
    this.add(this.currencyIconText);
  }

  protected createValueText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 36,
      fill: '#fbfbfb',
    };
    this.valueText = this.scene.make.text({
      x: this.width * 0.4,
      y: 0,
      text: `${this.currentValue}`,
      style,
    });
    this.valueText.setOrigin(1, 0.5);
    this.valueText.setStroke('#888888', 1);
    this.add(this.valueText);
  }
}
