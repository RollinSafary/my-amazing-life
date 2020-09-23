import { Atlases } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';
import {
  ISpriteButtonConfig,
  ISpriteButtonState,
} from '../../utils/simpleButton/SimpleButtonInterfaces';
import { SpriteButton } from '../../utils/simpleButton/SpriteButton';

export default class WelcomeStartButton extends SpriteButton {
  constructor(scene: BaseScene) {
    const normalStateConfig: ISpriteButtonState = {
      key: Atlases.Welcome.Atlas.Name,
      frame: Atlases.Welcome.Atlas.Frames.ButtonStart,
    };
    const config: ISpriteButtonConfig = {
      normalStateConfig,
    };
    super(scene, config);
    this.scene.add.existing(this);
  }

  public async show(): Promise<void> {
    return new Promise<void>(resolve => {
      this.scene.tweens.add({
        targets: this,
        scaleX: 1,
        scaleY: 1,
        duration: 400,
        ease: Phaser.Math.Easing.Back.Out,
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  public startHighlightAnimation(): void {
    const duration: number = 1000;
    this.scene.tweens.add({
      targets: this,
      onStart: () => {
        this.scene.tweens.add({
          targets: this,
          angle: -5,
          duration,
          yoyo: true,
          onComplete: () => {
            this.scene.tweens.add({
              targets: this,
              angle: 5,
              duration,
              yoyo: true,
            });
          },
        });
      },
      delay: 1000,
      duration: 200,
      scaleX: 1.1,
      scaleY: 0.9,
      repeatDelay: 5000,
      yoyo: true,
      repeat: -1,
      onRepeat: () => {
        this.scene.tweens.add({
          targets: this,
          angle: -5,
          duration,
          yoyo: true,
          onComplete: () => {
            this.scene.tweens.add({
              targets: this,
              angle: 5,
              duration,
              yoyo: true,
            });
          },
        });
      },
    });
  }
}
