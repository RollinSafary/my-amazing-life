import { Images, MultiAtlases } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';

export default class HobbiesImage extends Phaser.GameObjects.Image {
  constructor(protected scene: BaseScene) {
    super(scene, 0, 0, Images.WhitePixel.Name);
  }

  public updateTexture(frameName: string): void {
    this.setName(frameName);
    this.setTexture(MultiAtlases.Hobbies.Atlas.Name, `${this.name}`);
  }
}
