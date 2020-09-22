import { Atlases } from '../../../assets';
import { upperCaseFirstLetter } from '../../../utils/Utils';
import BaseScene from '../../scenes/BaseScene';
import { enableDragAndDrop } from '../../utils/phaser/DeveloperUtils';

export default abstract class BasePerson extends Phaser.GameObjects.Container {
  protected character: Phaser.GameObjects.Image;
  protected arm: Phaser.GameObjects.Image;

  constructor(protected scene: BaseScene, protected gender: string) {
    super(scene);
    this.createComponents();
  }

  public startHandsRandomAnimation(): void {
    this.scene.tweens.add({
      targets: this.arm,
      angle: Phaser.Math.Between(-5, 5),
      duration: Phaser.Math.Between(500, 1000),
      delay: Phaser.Math.Between(2000, 5000),
      yoyo: true,
      onComplete: () => {
        this.startHandsRandomAnimation();
      },
    });
  }

  public abstract async startHandShake(): Promise<void>;

  protected createComponents(): void {
    this.createCharacter();
    this.createArm();
    this.setSize(this.character.width, this.character.height);
    this.setArmPosition();
    enableDragAndDrop(this.scene, this.arm, this.character);
  }

  protected createCharacter(): void {
    this.character = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Welcome.Atlas.Name,
      frame: (Atlases.Welcome.Atlas.Frames as any)[
        `${upperCaseFirstLetter(this.gender)}Body`
      ],
    });
    this.add(this.character);
  }
  protected createArm(): void {
    this.arm = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Welcome.Atlas.Name,
      frame: (Atlases.Welcome.Atlas.Frames as any)[
        `${upperCaseFirstLetter(this.gender)}Arm`
      ],
    });
    this.add(this.arm);
  }

  protected abstract setArmPosition(): void;
}
