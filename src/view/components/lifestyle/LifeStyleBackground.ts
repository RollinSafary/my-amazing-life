import { Images } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';
import { IPosition } from '../../utils/phaser/PhaserUtils';

export default class LifeStyleBackground extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected graphics: Phaser.GameObjects.Graphics;
  protected horizontals: Phaser.Geom.Point[];
  protected verticals: Phaser.Geom.Point[];

  constructor(protected scene: BaseScene) {
    super(scene);
    this.setSize(this.scene.width, this.scene.height);
    this.createComponents();
  }

  public getCeilPosition(xIndex: number, yIndex: number): IPosition {
    const x: number =
      (this.horizontals[xIndex].x + this.horizontals[xIndex + 1].x) / 2;
    const y: number =
      (this.verticals[yIndex].y + this.verticals[yIndex + 1].y) / 2;
    return { x, y };
  }

  protected createComponents(): void {
    this.createBackground();
    this.createGraphics();
    this.generatePoints();
    this.drawLines();
    this.horizontals.unshift(new Phaser.Geom.Point(0, 0));
    this.horizontals.push(new Phaser.Geom.Point(this.width, 0));
    this.verticals.unshift(new Phaser.Geom.Point(0, 0));
    this.verticals.push(new Phaser.Geom.Point(0, this.height));
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: Images.WhitePixel.Name,
    });
    this.add(this.background);
    this.background.setScale(this.width, this.height);
    this.background.setTint(0xb8dbe3);
    this.background.setOrigin(0);
  }

  protected createGraphics(): void {
    this.graphics = this.scene.make.graphics({});
    this.add(this.graphics);
    this.graphics.lineStyle(6, 0x7aabb9);
  }

  protected generatePoints(): void {
    const horizontalLine: Phaser.Geom.Line = new Phaser.Geom.Line(
      0,
      0,
      this.width,
      0,
    );
    const verticalLine: Phaser.Geom.Line = new Phaser.Geom.Line(
      0,
      0,
      0,
      this.height,
    );
    this.horizontals = horizontalLine.getPoints(7);
    this.horizontals.shift();
    this.verticals = verticalLine.getPoints(4);
    this.verticals.shift();
  }

  protected drawLines(): void {
    this.drawVerticals();
    this.drawHorizontals();
  }

  protected drawHorizontals(): void {
    this.graphics.lineBetween(
      0,
      this.verticals.getFirst().y,
      this.width,
      this.verticals.getFirst().y,
    );
    this.graphics.lineBetween(
      0,
      this.verticals.getLast().y,
      this.width,
      this.verticals.getLast().y,
    );
    for (const verticalPoint of this.verticals) {
      this.graphics.lineBetween(
        0,
        verticalPoint.y,
        this.horizontals.getFirst().x,
        verticalPoint.y,
      );
      this.graphics.lineBetween(
        this.horizontals.getLast().x,
        verticalPoint.y,
        this.width,
        verticalPoint.y,
      );
    }
  }
  protected drawVerticals(): void {
    this.graphics.lineBetween(
      this.horizontals.getFirst().x,
      0,
      this.horizontals.getFirst().x,
      this.height,
    );
    this.graphics.lineBetween(
      this.horizontals.getLast().x,
      0,
      this.horizontals.getLast().x,
      this.height,
    );
    for (const horizontalPoint of this.horizontals) {
      this.graphics.lineBetween(
        horizontalPoint.x,
        0,
        horizontalPoint.x,
        this.verticals.getFirst().y,
      );
      this.graphics.lineBetween(
        horizontalPoint.x,
        this.height,
        horizontalPoint.x,
        this.verticals.getLast().y,
      );
    }
  }
}
