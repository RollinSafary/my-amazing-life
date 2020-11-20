import { Images, MultiAtlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';
import LifeStyleProgress from './LifeStyleProgress';
import LifeStyleTotal from './LifeStyleTotal';

export default class LifeStyleCenter extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected title: Phaser.GameObjects.Image;
  protected total: LifeStyleTotal;
  protected progress: LifeStyleProgress;

  constructor(protected scene: BaseScene, width: number, height: number) {
    super(scene);
    this.setSize(width, height);
    this.createComponents();
  }

  public async setTotal(value: number): Promise<void> {
    await this.total.setValue(value);
  }

  public async setProgress(value: number): Promise<void> {
    await this.progress.setProgress(value);
  }

  protected createComponents(): void {
    this.createBackground();
    this.createTitle();
    this.createTotal();
    this.createProgress();
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

  protected createTitle(): void {
    this.title = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.CenterTitle,
    });
    this.add(this.title);
    this.title.x = -this.width * 0.5 + this.title.width * 0.525;
    this.title.y =
      this.height * 0.5 - this.title.height * 0.5 - this.title.width * 0.025;
  }

  protected createTotal(): void {
    this.total = new LifeStyleTotal(this.scene);
    this.add(this.total);
    this.total.x =
      this.title.x - this.title.width * 0.5 + this.total.width * 0.7;
    this.total.y = -this.height * 0.5 + this.total.height * 0.7;
  }

  protected createProgress(): void {
    this.progress = new LifeStyleProgress(this.scene);
    this.add(this.progress);
    this.progress.x = this.total.x;
    const totalBottom: number = this.total.y + this.total.height * 0.5;
    const titleTop: number = this.title.y - this.title.height * 0.5;
    this.progress.y = (titleTop + totalBottom) * 0.5;
  }
}
