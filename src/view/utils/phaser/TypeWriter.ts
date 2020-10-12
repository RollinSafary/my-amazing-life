import BaseScene from '../../scenes/BaseScene';

export default class TypeWriter extends Phaser.GameObjects.Container {
  protected text: string = '';
  protected index: number = 0;
  protected runnable: Phaser.Time.TimerEvent;

  constructor(
    protected scene: BaseScene,
    protected textObject: Phaser.GameObjects.Text,
  ) {
    super(scene);
    this.add(this.textObject);
    this.text = this.textObject.text;
    this.textObject.setText(' ');
  }
  public async play(duration: number, delay: number = 0): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this,
        index: this.text.length,
        duration,
        delay,
        onUpdate: () => {
          this.textObject.setText(
            this.text.substring(0, Math.floor(this.index)),
          );
        },
        onComplete: () => {
          this.textObject.setText(this.text);
          resolve();
        },
      });
    });
  }
}
