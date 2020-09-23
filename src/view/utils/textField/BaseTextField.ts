import BaseScene from '../../scenes/BaseScene';

export default abstract class BaseTextField extends Phaser.GameObjects
  .Container {
  public static INPUT_DONE_EVENT: string = 'inputDone';

  protected background: Phaser.GameObjects.Image;
  protected text: Phaser.GameObjects.Text;
  protected inputDOM: HTMLInputElement;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public focus(): void {
    this.inputDOM.focus();
  }

  public blur(): void {
    this.inputDOM.blur();
  }

  public getTextValue(): string {
    return this.text.text;
  }

  public destroy(fromScene?: boolean): void {
    document.body.removeChild(this.inputDOM);
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
    this.inputDOM.addEventListener('change', this.onEnter.bind(this));
  }
  protected abstract createBackground(): void;
  protected abstract createText(): void;

  protected setListeners(): void {}

  protected onInput(): void {
    this.text.setText(this.inputDOM.value);
  }

  protected onEnter(): void {
    this.emit(BaseTextField.INPUT_DONE_EVENT);
  }
}
