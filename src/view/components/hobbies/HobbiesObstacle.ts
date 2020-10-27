import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import { Fonts, MultiAtlases } from '../../../assets';
import { Translation } from '../../../translations';
import HobbiesScene from '../../scenes/HobbiesScene';
import { ITextStyle } from '../../utils/phaser/PhaserUtils';

export default class HobbiesEnemyCar extends Phaser.GameObjects.Container {
  protected obstacle: Phaser.GameObjects.Image;
  protected tooltipBackground: Phaser.GameObjects.Image;
  protected message: ExtendedText;

  constructor(
    protected scene: HobbiesScene,
    protected point: Phaser.Geom.Point,
    protected frame: string,
    public name: string,
  ) {
    super(scene);
    this.x = point.x;
    this.y = point.y - this.scene.height * (this.scene.cameraState + 1);
    this.createComponents();
  }

  public getBounds(): Phaser.Geom.Rectangle {
    const matrix = this.obstacle.getWorldTransformMatrix();
    return new Phaser.Geom.Rectangle(
      matrix.tx - this.width * 0.5,
      matrix.ty - this.height * 0.5,
      this.width,
      this.height,
    );
  }

  protected createComponents(): void {
    this.createObstacle();
    this.setSize(this.obstacle.width * 0.9, this.obstacle.height);
    this.createTooltipBackground();
    this.createTooltipMessage();
  }

  protected createObstacle(): void {
    this.obstacle = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: this.frame,
    });
    this.add(this.obstacle);
  }

  protected createTooltipBackground(): void {
    this.tooltipBackground = this.scene.make.image({
      x: 0,
      y: -this.height * 0.75,
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.InterfaceTooltip,
    });
    this.add(this.tooltipBackground);
    this.tooltipBackground.setScale(
      this.point.x < this.scene.width * 0.5 ? 1 : -1,
      1,
    );
  }

  protected createTooltipMessage(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 20,
      fill: '#000000',
    };
    this.message = this.scene.make.extText({
      x: -this.tooltipBackground.width * this.tooltipBackground.scaleX * 0.55,
      y: this.tooltipBackground.y - this.tooltipBackground.height * 0.25,
      text: (Translation as any)[
        `HOBBIES_MESSAGE_${Phaser.Math.Between(0, 17)}`
      ],
      style,
    });
    this.add(this.message);
    this.message.setOrigin(0.5);
    this.message.setWordWrapWidth(this.tooltipBackground.width * 0.7);
    this.message.setAlign('center');
    this.message.setScale(
      Math.min(
        (this.tooltipBackground.width * 0.7) / this.message.width,
        (this.tooltipBackground.height * 0.9) / this.message.height,
      ),
    );
  }
}
