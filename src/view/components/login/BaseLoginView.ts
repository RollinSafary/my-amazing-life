import { NinePatch } from '@koreez/phaser3-ninepatch';
import BaseScene from '../../scenes/BaseScene';

export default abstract class BaseLoginView extends Phaser.GameObjects
  .Container {
  protected background: NinePatch;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.scene.add.existing(this);
    this.createComponents();
    this.setDepth(1);
    this.x = this.scene.width * 0.5;
    this.y = this.scene.height * 0.5;
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createContent();
    this.setListeners();
  }

  protected abstract createBackground(): void;
  protected abstract createContent(): void;
  protected abstract setListeners(): void;
}
