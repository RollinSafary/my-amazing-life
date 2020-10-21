import { Images, MultiAtlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';
import {
  loopRunnable,
  removeRunnable,
} from '../../../utils/phaser/PhaserUtils';

export default class SlideShow extends Phaser.GameObjects.Container {
  protected slide: Phaser.GameObjects.Image;
  protected runnable: Phaser.Time.TimerEvent;
  protected index: number = 0;
  protected currentFrames: string[];

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
    this.setVisible(false);
  }

  public async start(
    keyword: string,
    count: number = 1,
    duration: number = 1000,
  ): Promise<void> {
    return new Promise<void>(resolve => {
      this.stop();
      this.setVisible(true);
      this.currentFrames = [`slide-show/${keyword}-default`];
      for (let i: number = 0; i < count - 1; i++) {
        this.currentFrames.push(`slide-show/${keyword}-${i}`);
      }
      this.index = -1;
      this.updateSlide();
      this.runnable = loopRunnable(
        this.scene,
        duration,
        this.updateSlide,
        this,
        resolve,
      );
    });
  }

  public stop(): void {
    removeRunnable(this.runnable);
  }

  protected updateSlide(resolve?: () => Promise<void>): void {
    this.index++;
    if (this.index >= this.currentFrames.length) {
      this.stop();
      !!resolve && resolve();
      return;
    }
    this.slide.setTexture(
      MultiAtlases.Skills.Atlas.Name,
      this.currentFrames[this.index],
    );
  }

  protected createComponents(): void {
    this.createSlide();
  }

  protected createSlide(): void {
    this.slide = this.scene.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add(this.slide);
  }
}
