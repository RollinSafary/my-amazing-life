import { MultiAtlases } from '../../../assets';
import BaseScene from '../../scenes/BaseScene';

export default class LifeStyleSection extends Phaser.GameObjects.Sprite {
  constructor(
    protected scene: BaseScene,
    public xIndex: number,
    public yIndex: number,
  ) {
    super(
      scene,
      0,
      0,
      MultiAtlases.Lifestyle.Atlas.Name,
      (MultiAtlases.Lifestyle.Atlas.Frames as any)[
        `SectionsSection${yIndex}${xIndex}`
      ],
    );
  }
}
