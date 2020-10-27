import { MultiAtlases } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';
import HobbiesImage from './HobbiesImage';

export default class HobbiesImagePair extends Phaser.GameObjects.Container {
  public collisionEnabled: boolean = false;
  public left: HobbiesImage;
  public right: HobbiesImage;
  protected selectionFrame: Phaser.GameObjects.Image;

  constructor(protected scene: BaseScene) {
    super(scene);
    this.createComponents();
    this.setVisible(false);
  }

  public makeSelected(frameName: string): void {
    const targetImage = this.left.name === frameName ? this.left : this.right;
    this.selectionFrame.setVisible(true);
    this.selectionFrame.x = targetImage.x;
    this.selectionFrame.y = targetImage.y;
    this.collisionEnabled = false;
  }

  public setImagePair(imagePair: string[]) {
    this.selectionFrame.setVisible(false);
    this.setVisible(true);
    this.left.updateTexture(imagePair.getFirst());
    this.right.updateTexture(imagePair.getLast());
    this.left.x = -this.left.width * 0.55;
    this.right.x = this.right.width * 0.55;
    this.collisionEnabled = true;
  }

  public getLeftImageBounds(): Phaser.Geom.Rectangle {
    return this.getImageBounds(this.left);
  }

  public getRightImageBounds(): Phaser.Geom.Rectangle {
    return this.getImageBounds(this.right);
  }

  protected getImageBounds(image: HobbiesImage): Phaser.Geom.Rectangle {
    return image.getBounds();
  }

  protected createComponents(): void {
    this.createLeftImage();
    this.createRightImage();
    this.createSelectionFrame();
  }

  protected createLeftImage(): void {
    this.left = new HobbiesImage(this.scene);
    this.add(this.left);
  }

  protected createRightImage(): void {
    this.right = new HobbiesImage(this.scene);
    this.add(this.right);
  }
  protected createSelectionFrame(): void {
    this.selectionFrame = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Hobbies.Atlas.Name,
      frame: MultiAtlases.Hobbies.Atlas.Frames.ClustersSelectionFrame,
    });
    this.add(this.selectionFrame);
    this.selectionFrame.setVisible(false);
  }
}
