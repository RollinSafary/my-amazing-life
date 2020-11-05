import BaseScene from '../../scenes/BaseScene';
import { postRunnable } from '../phaser/PhaserUtils';

export default abstract class BaseTextField extends Phaser.GameObjects
  .Container {
  public static FOCUS_EVENT: string = 'focused';
  public static INPUT_DONE_EVENT: string = 'inputDone';

  protected background: Phaser.GameObjects.Image;
  protected text: Phaser.GameObjects.Text;
  protected inputDOM: HTMLInputElement;
  protected enterKey: Phaser.Input.Keyboard.Key;
  protected maskGraphics: Phaser.GameObjects.Graphics;
  protected focused: boolean;
  protected textStartX: number;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
    this.textStartX = this.text.x;
    postRunnable(this.updateMask, this);
  }

  public setText(text: string): void {
    if (!!text && text !== '') {
      this.inputDOM.value = text;
      this.onInput();
    }
  }

  public updateMask(): void {
    const matrix = this.getWorldTransformMatrix();
    this.maskGraphics.clear();
    this.maskGraphics.fillStyle(0xffffff);
    this.maskGraphics.fillRect(
      matrix.tx - this.displayWidth * 0.45,
      matrix.ty - this.displayHeight * 0.5,
      this.displayWidth * 0.9,
      this.displayHeight,
    );
  }

  public focus(): void {
    this.inputDOM.focus();
    this.focused = true;
    this.emit(BaseTextField.FOCUS_EVENT, this);
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.1,
      scaleY: 1.1,
      onUpdate: () => {
        this.updateMask();
      },
      duration: 200,
      ease: Phaser.Math.Easing.Expo.InOut,
    });
  }

  public blur(): void {
    this.inputDOM.blur();
    this.focused = false;
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: 200,
      ease: Phaser.Math.Easing.Expo.InOut,
    });
  }

  public getTextValue(): string {
    return this.inputDOM.value;
  }

  public destroy(fromScene?: boolean): void {
    this.inputDOM.remove();
    this.enterKey.destroy();
    super.destroy(fromScene);
  }

  protected createComponents(): void {
    this.createInputText();
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createText();
    this.createMask();
    this.setListeners();
  }

  protected createInputText(): void {
    this.inputDOM = document.createElement('input');
    document.body.prepend(this.inputDOM);
    this.inputDOM.type = 'email';
    this.inputDOM.className = 'textField';
    this.inputDOM.addEventListener('input', this.onInput.bind(this));
  }
  protected abstract createBackground(): void;
  protected abstract createText(): void;

  protected createMask(): void {
    this.maskGraphics = this.scene.make.graphics({});

    this.text.setMask(
      new Phaser.Display.Masks.GeometryMask(this.scene, this.maskGraphics),
    );
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_UP, this.focus, this);
    this.enterKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
    this.enterKey.on(Phaser.Input.Keyboard.Events.DOWN, this.onEnter, this);
  }

  protected onInput(): void {
    this.text.setText(`${this.inputDOM.value}`);
    this.text.x =
      this.text.width <= this.width * 0.9
        ? this.textStartX
        : this.textStartX - (this.text.width - this.width * 0.9);
  }

  protected onEnter(): void {
    if (!this.focused) {
      return;
    }
    this.blur();
    postRunnable(this.emit, this, BaseTextField.INPUT_DONE_EVENT, this);
  }
}
