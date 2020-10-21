import { MultiAtlases } from '../../../../assets';
import BaseScene from '../../../scenes/BaseScene';

export default class CircleControllerHook extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected shadow: Phaser.GameObjects.Image;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
  }

  public setFrame(frame: string): void {
    this.background.setFrame(frame);
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createShadow();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.SphereBackground,
    });
    this.add(this.background);
  }

  protected createShadow(): void {
    this.shadow = this.scene.make.image({
      x: -this.width * 0.15,
      y: 0,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.SphereDialShadow,
    });
    this.add(this.shadow);
    this.shadow.setAlpha(0.8);
  }
}
