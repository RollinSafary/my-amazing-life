import { Atlases } from '../../../assets';
import { IAvatarConfig } from '../../../model/vo/UiVO';
import { upperCaseFirstLetter } from '../../../utils/Utils';
import BaseScene from '../../scenes/BaseScene';

export default class BaseUser extends Phaser.GameObjects.Container {
  protected head: Phaser.GameObjects.Image;
  protected hair: Phaser.GameObjects.Image;
  protected face: Phaser.GameObjects.Image;
  protected headContainer: Phaser.GameObjects.Container;

  constructor(protected scene: BaseScene, protected config: IAvatarConfig) {
    super(scene);
    this.createComponents();
  }

  protected createComponents(): void {
    this.createUserHead();
  }

  protected createUserHead(): void {
    this.headContainer = this.scene.make.container({});
    this.add(this.headContainer);
    this.createHead();
    this.setSize(this.head.width, this.head.height);
    this.createHair();
    this.createFace();
  }

  protected createHead(): void {
    this.head = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Avatar.Atlas.Name,
      frame: (Atlases.Avatar.Atlas.Frames as any)[
        `PartHead${this.config.color}`
      ],
    });
    this.headContainer.add(this.head);
  }
  protected createHair(): void {
    this.hair = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Avatar.Atlas.Name,
      frame: (Atlases.Avatar.Atlas.Frames as any)[
        `${upperCaseFirstLetter(this.config.gender)}Hair${this.config.hair}`
      ],
    });
    this.headContainer.add(this.hair);
  }
  protected createFace(): void {
    this.face = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Avatar.Atlas.Name,
      frame: (Atlases.Avatar.Atlas.Frames as any)[
        `${upperCaseFirstLetter(this.config.gender)}Face${this.config.face}`
      ],
    });
    this.headContainer.add(this.face);
  }
}
