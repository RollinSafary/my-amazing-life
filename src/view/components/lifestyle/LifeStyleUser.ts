import { Atlases, MultiAtlases } from '../../../assets';
import { IAvatarConfig } from '../../../model/vo/UiVO';
import { upperCaseFirstLetter } from '../../../utils/Utils';
import BaseScene from '../../scenes/BaseScene';
import { IPosition } from '../../utils/phaser/PhaserUtils';

export default class LifeStyleUser extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected head: Phaser.GameObjects.Image;
  protected hair: Phaser.GameObjects.Image;
  protected face: Phaser.GameObjects.Image;
  protected headContainer: Phaser.GameObjects.Container;
  protected dragConfig: IPosition;
  public lastPosition: IPosition = {
    x: 0,
    y: 0,
  };

  constructor(protected scene: BaseScene, protected config: IAvatarConfig) {
    super(scene);
    this.createComponents();
  }

  public setPosition(x: number, y: number, z?: number, w?: number): this {
    if (!!this.lastPosition) {
      this.lastPosition.x = x;
      this.lastPosition.y = y;
    }
    return super.setPosition(x, y, z, w);
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createUserHead();

    this.setListeners();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Lifestyle.Atlas.Name,
      frame: (MultiAtlases.Lifestyle.Atlas.Frames as any)[
        `Buttons${upperCaseFirstLetter(this.config.gender)}`
      ],
    });
    this.add(this.background);
  }

  protected createUserHead(): void {
    this.headContainer = this.scene.make.container({});
    this.add(this.headContainer);
    this.headContainer.setScale(0.3);
    this.createHead();
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

  protected setListeners(): void {
    this.setInteractive();
    this.scene.input.setDraggable(this);
    this.on(Phaser.Input.Events.DRAG_START, this.onDragStart, this);
    this.on(Phaser.Input.Events.DRAG, this.onDrag, this);
  }

  protected onDragStart(pointer: Phaser.Input.Pointer): void {
    this.dragConfig = {
      x: pointer.x - this.x,
      y: pointer.y - this.y,
    };
  }

  protected onDrag(pointer: Phaser.Input.Pointer): void {
    this.x = pointer.x - this.dragConfig.x;
    this.y = pointer.y - this.dragConfig.y;
  }
}
