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
  protected focused: boolean;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public setText(text: string): void {
    if (!!text && text !== '') {
      this.inputDOM.value = text;
      this.onInput();
    }
  }

  public focus(): void {
    this.inputDOM.focus();
    this.focused = true;
    this.emit(BaseTextField.FOCUS_EVENT);
  }

  public blur(): void {
    this.inputDOM.blur();
    this.focused = false;
  }

  public getTextValue(): string {
    return this.inputDOM.value;
  }

  public destroy(fromScene?: boolean): void {
    document.body.removeChild(this.inputDOM);
    this.enterKey.destroy();
    super.destroy(fromScene);
  }

  protected createComponents(): void {
    this.createInputText();
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createText();
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

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_UP, this.focus, this);
    this.enterKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
    this.enterKey.on(Phaser.Input.Keyboard.Events.DOWN, this.onEnter, this);
  }

  protected onInput(): void {
    this.text.setText(this.inputDOM.value);
  }

  protected onEnter(): void {
    if (!this.focused) {
      return;
    }
    this.blur();
    postRunnable(this.emit, this, BaseTextField.INPUT_DONE_EVENT, this);
  }
}
