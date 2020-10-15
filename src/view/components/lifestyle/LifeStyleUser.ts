import { MultiAtlases } from '../../../assets';
import { upperCaseFirstLetter } from '../../../utils/Utils';
import { IPosition } from '../../utils/phaser/PhaserUtils';
import BaseUser from '../base/BaseUser';

export default class LifeStyleUser extends BaseUser {
  protected background: Phaser.GameObjects.Image;
  protected dragConfig: IPosition;
  public lastPosition: IPosition = {
    x: 0,
    y: 0,
  };

  public setPosition(x: number, y: number, z?: number, w?: number): this {
    if (!!this.lastPosition) {
      this.lastPosition.x = x;
      this.lastPosition.y = y;
    }
    return super.setPosition(x, y, z, w);
  }

  protected createComponents(): void {
    this.createBackground();
    super.createComponents();
    this.headContainer.setScale(0.3);
    this.setSize(this.background.width, this.background.height);
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
