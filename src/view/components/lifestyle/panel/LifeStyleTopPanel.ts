import { Fonts, Images, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import BaseScene from '../../../scenes/BaseScene';
import LifeStyleScene from '../../../scenes/LifeStyleScene';
import ISimpleButtonState from '../../../utils/simpleButton/ISimpleButtonState';
import ISimpleButtonText from '../../../utils/simpleButton/ISimpleButtonText';
import SimpleButton, {
  ISimpleButtonConfig,
} from '../../../utils/simpleButton/SimpleButton';
import LifeStyleInstructions from '../LifeStyleInstructions';
import LifeStyleSubtotal from './LifeStyleSubtotal';

export default class LifeStyleTopPanel extends Phaser.GameObjects.Container {
  public instructions: LifeStyleInstructions;
  public subtotal: LifeStyleSubtotal;
  protected background: Phaser.GameObjects.Image;
  protected nextButton: SimpleButton;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.setSize(this.scene.width, this.scene.height);
    this.createComponents();
    this.prepare();
  }

  public showNextButton(): void {
    this.scene.tweens.killTweensOf(this.nextButton);
    this.scene.tweens.add({
      targets: this.nextButton,
      scaleX: 1,
      scaleY: 1,
      ease: Phaser.Math.Easing.Back.Out,
      duration: 200,
    });
  }
  public hideNextButton(): void {
    this.scene.tweens.killTweensOf(this.nextButton);
    this.scene.tweens.add({
      targets: this.nextButton,
      scaleX: 0,
      scaleY: 0,
      ease: Phaser.Math.Easing.Back.Out,
      duration: 200,
    });
  }

  public async show(): Promise<void> {
    return new Promise<void>(resolve => {
      this.subtotal.setValue(0);
      this.scene.children.bringToTop(this);
      const duration: number = 200;
      this.scene.tweens.add({
        targets: this.background,
        alpha: 0.6,
        duration,
        onComplete: () => {
          resolve();
        },
      });
      this.scene.tweens.add({
        targets: [this.instructions, this.subtotal],
        y: this.subtotal.height / 2,
        duration,
        ease: Phaser.Math.Easing.Back.Out,
      });
    });
  }

  public async hide(): Promise<void> {
    return new Promise<void>(resolve => {
      const duration: number = 200;
      this.hideNextButton();
      this.scene.tweens.add({
        targets: this.background,
        alpha: 0,
        duration,
        onComplete: () => {
          resolve();
        },
      });
      this.scene.tweens.add({
        targets: [this.instructions, this.subtotal],
        y: -this.subtotal.height,
        duration,
        ease: Phaser.Math.Easing.Back.In,
      });
    });
  }

  protected createComponents(): void {
    this.createBackground();
    this.createInstructions();
    this.createSubtotal();
    this.createNextButton();
    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: this.width / 2,
      y: this.height / 2,
      key: Images.WhitePixel.Name,
    });
    this.background.setTint(0x000000);
    this.background.setScale(this.width, this.height);
    this.add(this.background);
  }
  protected createInstructions(): void {
    this.instructions = new LifeStyleInstructions(this.scene);
    this.add(this.instructions);
  }
  protected createSubtotal(): void {
    this.subtotal = new LifeStyleSubtotal(this.scene);
    this.add(this.subtotal);
  }
  protected createNextButton(): void {
    const normalStateConfig: ISimpleButtonState = {
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.ButtonsNext,
    };
    const textConfig: ISimpleButtonText = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 36,
      fill: '#ffffff',
      text: Translation.LIFESTYLE_BUTTON_NEXT,
      origin: { x: 0.5, y: 0.5 },
    };
    const configs: ISimpleButtonConfig = {
      normalStateConfig,
      textConfig,
    };
    this.nextButton = new SimpleButton(this.scene, configs);
    this.add(this.nextButton);
  }
  protected setListeners(): void {
    this.nextButton.on(SimpleButton.CLICK_EVENT, this.onNextClick, this);
  }

  protected onNextClick(): void {
    this.scene.events.emit(LifeStyleScene.CONFIRM_EVENT);
  }

  protected prepare(): void {
    this.background.setAlpha(0);
    this.nextButton.setScale(0);
    this.nextButton.x = this.scene.width / 2;
    this.nextButton.y = this.subtotal.height * 0.65;
    this.instructions.x =
      this.nextButton.x -
      this.nextButton.width * 0.53 -
      this.instructions.width * 0.5;
    this.subtotal.x =
      this.nextButton.x +
      this.nextButton.width * 0.53 +
      this.subtotal.width * 0.5;
    this.instructions.y = -this.instructions.height;
    this.subtotal.y = -this.subtotal.height;
  }
}
