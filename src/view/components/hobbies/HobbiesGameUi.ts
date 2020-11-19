import BaseScene from '../../scenes/BaseScene';
import HobbiesFuel from './ui/HobbiesFuel';
import HobbiesLives from './ui/HobbiesLives';
import HobbiesRemaining from './ui/HobbiesRemaining';

export default class HobbiesGameUi extends Phaser.GameObjects.Container {
  public fuel: HobbiesFuel;
  public lives: HobbiesLives;
  public remaining: HobbiesRemaining;

  constructor(
    protected scene: BaseScene,
    protected road: Phaser.GameObjects.TileSprite,
  ) {
    super(scene);
    this.setScrollFactor(0);
    this.createComponents();
    this.setDepth(100);
  }

  protected createComponents(): void {
    this.createFuel();
    this.createRemaining();
    this.createLives();
  }

  protected createFuel(): void {
    this.fuel = new HobbiesFuel(this.scene);
    this.add(this.fuel);
    this.fuel.x = this.road.x - this.road.width * 0.55 - this.fuel.width * 0.5;
    this.fuel.y = this.fuel.height * 1.5;
  }

  protected createLives(): void {
    this.lives = new HobbiesLives(this.scene, 5);
    this.add(this.lives);
    this.lives.x = this.road.x + this.road.width * 0.51;
    this.lives.y = this.fuel.y;
  }

  protected createRemaining(): void {
    this.remaining = new HobbiesRemaining(this.scene);
    this.add(this.remaining);
    this.remaining.x = this.scene.width * 0.5;
    this.remaining.y = this.fuel.y;
  }
}
