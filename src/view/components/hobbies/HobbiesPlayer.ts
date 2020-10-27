import { MultiAtlases } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';

export default class HobbiesPlayer extends Phaser.GameObjects.Sprite {
  protected keyLeft: Phaser.Input.Keyboard.Key;
  protected keyRight: Phaser.Input.Keyboard.Key;
  public isImmortal: boolean;
  public speedX: number = 0;

  constructor(
    protected scene: BaseScene,
    protected road: Phaser.GameObjects.TileSprite,
  ) {
    super(
      scene,
      scene.width * 0.5,
      0,
      MultiAtlases.Hobbies.Atlas.Name,
      MultiAtlases.Hobbies.Atlas.Frames.Player,
    );
    this.isImmortal = false;
    this.y = this.scene.height - this.height * 0.6;
    this.setSize(this.width * 0.9, this.height);
    this.setScrollFactor(0);
    this.setListeners();
  }

  public update(...args: any[]): void {
    super.update(...args);
    if (this.keyLeft.isDown) {
      this.x -= 2;
    }
    if (this.keyRight.isDown) {
      this.x += 2;
    }
    this.limitMovement();
    this.x += this.speedX;
  }

  protected setListeners(): void {
    this.createKeys();
  }

  protected createKeys(): void {
    this.keyLeft = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT,
    );
    this.keyRight = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
    );
  }

  protected limitMovement(): void {
    const multiplier: number = 0.445;
    if (
      this.x - this.width * 0.5 <
      this.road.x - this.road.width * multiplier
    ) {
      this.x = this.road.x - this.road.width * multiplier + this.width * 0.5;
    }
    if (
      this.x + this.width * 0.5 >
      this.road.x + this.road.width * multiplier
    ) {
      this.x = this.road.x + this.road.width * multiplier - this.width * 0.5;
    }
  }
}
