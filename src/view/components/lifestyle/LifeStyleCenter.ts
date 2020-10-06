import { Images } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';
import LifeStyleTitle from './LifeStyleTitle';
import LifeStyleWheel from './LifeStyleWheel';

export default class LifeStyleCenter extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected wheel: LifeStyleWheel;
  protected title: LifeStyleTitle;

  constructor(protected scene: BaseScene, width: number, height: number) {
    super(scene);
    this.setSize(width, height);
    this.createComponents();
  }

  protected createComponents(): void {
    this.createBackground();
    this.createWheel();
    this.createTitle();
    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add(this.background);
    this.background.setScale(this.width, this.height);
    this.background.setTint(0xd5eff5);
  }
  protected createWheel(): void {
    this.wheel = new LifeStyleWheel(this.scene);
    this.add(this.wheel);
    console.warn(this.height);
    console.warn(this.wheel.height);

    this.wheel.setScale((this.height * 1.05) / this.wheel.height);
    console.warn(this.wheel.displayHeight);
    this.wheel.x = this.width / 2 - this.wheel.displayWidth / 2;
    this.wheel.y = this.height / 2 - this.wheel.displayHeight * 0.4825;
  }
  protected createTitle(): void {
    //
  }

  protected setListeners(): void {}
}
