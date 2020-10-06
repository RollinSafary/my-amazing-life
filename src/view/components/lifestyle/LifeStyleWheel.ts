import { MultiAtlases } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';
import { pickAny } from '../../utils/phaser/PhaserUtils';

export default class LifeStyleWheel extends Phaser.GameObjects.Container {
  public static ROLLED_EVENT: string = 'rolled';

  protected background: Phaser.GameObjects.Image;
  protected needle: Phaser.GameObjects.Image;

  protected indexes: number[] = [];

  constructor(protected scene: BaseScene) {
    super(scene);
    this.prepareIndexes();
    this.createComponents();
  }

  public setEnabled(enabled: boolean = false): void {
    this.input.enabled = enabled;
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createNeedle();
    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.WheelBackground,
    });
    this.add(this.background);
  }

  protected createNeedle(): void {
    this.needle = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: MultiAtlases.Lifestyle.Atlas.Frames.WheelNeedle,
    });
    this.add(this.needle);
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.on(Phaser.Input.Events.POINTER_OUT, this.onPointerOut, this);
  }

  protected onPointerDown(): void {
    this.once(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
  }

  protected onPointerOut(): void {
    this.off(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);
  }

  protected onPointerUp(): void {
    this.setEnabled(false);
    if (!this.indexes.length) {
      return;
    }
    const randomIndex: number = pickAny(this.indexes);
    this.indexes.remove(randomIndex);
    this.startRotation(randomIndex);
  }

  protected startRotation(index: number): void {
    this.scene.tweens.killTweensOf([this, this.needle]);
    this.scene.tweens.add({
      targets: this.needle,
      angle:
        index * 30 +
        Phaser.Math.Between(5, 25) +
        Phaser.Math.Between(2, 4) * 360,
      duration: 2000,
      ease: Phaser.Math.Easing.Expo.InOut,
      onComplete: () => {
        this.parentContainer.emit(LifeStyleWheel.ROLLED_EVENT, index);
      },
    });
  }

  protected prepareIndexes(): void {
    for (let i: number = 0; i < 12; i++) {
      this.indexes.push(i);
    }
  }
}
