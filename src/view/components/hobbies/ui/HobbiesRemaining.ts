import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';

export default class HobbiesRemaining extends Phaser.GameObjects.Container {
  protected messageText: ExtendedText;
  protected valueText: Phaser.GameObjects.Text;
  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public setText(remaining: number): void {
    this.valueText.setText(`${remaining < 10 ? '0' : ''}${remaining}`);
  }

  protected createComponents(): void {
    this.createMessageText();
    this.createValueText();
    this.setPositions();
  }

  protected createMessageText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 30,
      fill: '#ffffff',
    };
    this.messageText = this.scene.make.extText({
      x: 0,
      y: 0,
      text: Translation.HOBBIES_UI_REMAINING,
      style,
    });
    this.add(this.messageText);
    this.messageText.setOrigin(0, 0.5);
  }
  protected createValueText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 40,
      fill: '#ffffff',
    };
    this.valueText = this.scene.make.text({
      x: 0,
      y: 0,
      text: '20',
      style,
    });
    this.add(this.valueText);
    this.valueText.setOrigin(1, 0.5);
  }

  protected setPositions(): void {
    this.setSize(
      this.messageText.width + this.valueText.width * 1.1,
      this.valueText.height,
    );
    this.messageText.x = -this.width / 2;
    this.valueText.x = this.width / 2;
  }
}
