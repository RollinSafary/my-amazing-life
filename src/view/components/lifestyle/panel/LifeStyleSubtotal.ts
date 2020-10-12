import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import LifeStyleScene from '../../../scenes/LifeStyleScene';
import { ITextStyle } from '../../../utils/phaser/PhaserUtils';
import ISimpleButtonState from '../../../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../../../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../../../utils/simpleButton/SimpleButton';

export default class LifeStyleSubtotal extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected title: ExtendedText;
  protected fieldBackground: Phaser.GameObjects.Image;
  protected amountText: Phaser.GameObjects.Text;
  protected clearButton: SimpleButton;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public setValue(value: number): void {
    this.amountText.setText(`${value}`);
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createTitle();
    this.createFieldBackground();
    this.createAmountText();
    this.createClearButton();
    this.setListeners();
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
      x: -this.width * 0.45,
      y: -this.height * 0.35,
      text: Translation.LIFESTYLE_SUBTITLE_TITLE,
      style,
    });
    this.title.setOrigin(0, 0.5);
    this.add(this.title);
  }
  protected createFieldBackground(): void {
    this.fieldBackground = this.scene.make.image({
      x: this.title.x,
      y: this.title.y + this.title.height * 0.55,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.TopField,
    });
    this.fieldBackground.setOrigin(0);
    this.add(this.fieldBackground);
  }

  protected createAmountText(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 26,
      fill: '#ffffff',
    };
    this.amountText = this.scene.make.text({
      x: this.fieldBackground.x + this.fieldBackground.width * 0.9,
      y: this.fieldBackground.y + this.fieldBackground.height * 0.5,
      text: '0',
      style,
    });
    this.amountText.setOrigin(1, 0.5);
    this.add(this.amountText);
  }
  protected createClearButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.ButtonsClear,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 22,
      fill: '#ffffff',
      text: Translation.LIFESTYLE_BUTTON_CLEAR,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.clearButton = new SimpleButton(this.scene, configs);
    this.clearButton.x = this.width * 0.5 - this.clearButton.width * 0.7;
    this.add(this.clearButton);
  }

  protected setListeners(): void {
    this.clearButton.on(SimpleButton.CLICK_EVENT, this.onClearClick, this);
  }

  protected onClearClick(): void {
    this.scene.events.emit(LifeStyleScene.CLEAR_EVENT);
  }
}
