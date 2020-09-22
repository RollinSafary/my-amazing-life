import BaseScene from '../../scenes/BaseScene';
import BasePerson from './BasePerson';

export default class FemalePerson extends BasePerson {
  constructor(scene: BaseScene) {
    super(scene, 'female');
  }

  public async startHandShake(): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.killTweensOf(this.arm);
      this.scene.tweens.add({
        targets: this.arm,
        angle: -30,
        duration: 500,
        ease: Phaser.Math.Easing.Expo.InOut,
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  protected setArmPosition(): void {
    this.arm.x = this.character.width * 0.292;
    this.arm.y = -this.character.height * 0.052;
  }
}
