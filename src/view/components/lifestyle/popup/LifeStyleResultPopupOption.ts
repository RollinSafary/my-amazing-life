import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { MultiAtlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';

export default class LifeStyleResultPopupOption extends Phaser.GameObjects
  .Container {
  protected nameText: ExtendedText;
  protected line: Phaser.GameObjects.Image;
  protected valueText: Phaser.GameObjects.Text;

  constructor(
    protected scene: BaseScene,
    public name: string,
    public value: number = 0,
  ) {
    super(scene);
    this.createComponents();
    this.setAlpha(0);
  }

  public setValue(value: number): void {
    this.value = value;
  }

  public async show(value: number = this.value): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this,
        alpha: 1,
        duration: 200,
        onComplete: () => {
          const target: any = {
            value: 0,
          };
          this.scene.tweens.add({
            targets: target,
            value,
            duration: 300,
            onUpdate: () => {
              this.valueText.setText(`${Math.floor(target.value)}`);
            },
            onComplete: () => {
              this.valueText.setText(`${value}`);
              resolve();
            },
          });
        },
      });
    });
  }

  protected createComponents(): void {
    this.createLine();
    this.createNameText();
    this.createValueText();
    this.line.y = this.nameText.height * 0.6 + this.line.height * 0.5;
    this.setSize(
      this.line.displayWidth,
      this.nameText.height * 1.1 + this.line.height,
    );
  }

  protected createLine(): void {
    this.line = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.PopupLine,
    });
    this.add(this.line);
    this.line.setScale(1.2, 1);
  }

  protected createNameText(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 30,
      fill: '#ffffff',
    };
    this.nameText = this.scene.make.extText({
      x: -this.line.displayWidth * 0.49,
      y: 0,
      text: this.name,
      style,
    });
    this.add(this.nameText);
    this.nameText.setOrigin(0, 0.5);
  }

  protected createValueText(): void {
    const style: ITextStyle = {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#ffffff',
    };
    this.valueText = this.scene.make.extText({
      x: this.line.displayWidth * 0.49,
      y: 0,
      text: `0`,
      style,
    });
    this.add(this.valueText);
    this.valueText.setOrigin(1, 0.5);
  }
}
