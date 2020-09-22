import BaseScene from '../../scenes/BaseScene';
import { IPosition } from './PhaserUtils';

type DraggableGameObject = Phaser.GameObjects.GameObject &
  Phaser.GameObjects.Components.Transform;
type TargetGameObject = DraggableGameObject &
  Phaser.GameObjects.Components.Size;

export function enableDragAndDrop(
  scene: BaseScene,
  object: DraggableGameObject,
  target?: TargetGameObject,
): void {
  object.setInteractive();
  scene.input.setDraggable(object);
  const offset: IPosition = {
    x: 0,
    y: 0,
  };
  object.on(Phaser.Input.Events.DRAG_START, (pointer: Phaser.Input.Pointer) => {
    offset.x = pointer.x - object.x;
    offset.y = pointer.y - object.y;
  });
  object.on(Phaser.Input.Events.DRAG, (pointer: Phaser.Input.Pointer) => {
    object.x = pointer.x - offset.x;
    object.y = pointer.y - offset.y;
  });
  object.on(Phaser.Input.Events.DRAG_END, (pointer: Phaser.Input.Pointer) => {
    object.x = pointer.x - offset.x;
    object.y = pointer.y - offset.y;
    !!target
      ? console.warn('target', {
          x: (target.x - object.x) / target.displayWidth,
          y: (target.y - object.y) / target.displayHeight,
        })
      : console.warn({
          x: object.x / scene.width,
          y: object.y / scene.height,
        });
  });
}
