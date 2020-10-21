import { ExtendedText } from '@candywings/phaser3-i18n-plugin';
import BaseScene from '../../../scenes/BaseScene';
import SkillsScene from '../../../scenes/SkillsScene';

export default abstract class BaseController extends Phaser.GameObjects
  .Container {
  protected bar: Phaser.GameObjects.Image;
  protected hook: Phaser.GameObjects.Image | Phaser.GameObjects.Container;
  protected label: ExtendedText;
  public multiplier: number;

  constructor(protected scene: BaseScene, public name: string) {
    super(scene);
    this.createComponents();
    this.setActiveState(false);
  }

  public abstract setActiveState(state: boolean): void;

  protected createComponents(): void {
    this.createBar();
    this.setSize(this.bar.width, this.bar.height);
    this.createLabel();
    this.createHook();
    this.setListeners();
  }

  protected abstract createBar(): void;

  protected abstract createLabel(): void;

  protected abstract createHook(): void;

  protected setListeners(): void {
    this.setInteractive();
    this.hook.setInteractive();
    this.scene.input.setDraggable(this.hook);
    this.hook.on(Phaser.Input.Events.DRAG_START, this.onDragStart, this);
    this.hook.on(Phaser.Input.Events.DRAG, this.onDrag, this);
    this.hook.on(Phaser.Input.Events.DRAG_END, this.onDragEnd, this);
  }

  protected abstract onDragStart(pointer: Phaser.Input.Pointer): void;
  protected abstract onDrag(pointer: Phaser.Input.Pointer): void;
  protected abstract onDragEnd(pointer: Phaser.Input.Pointer): void;

  protected abstract fixHookPosition(): void;

  protected emitSelection(): void {
    this.scene.events.emit(SkillsScene.CONTROLLER_CHOSE_EVENT, this);
  }

  protected emitValueChange(): void {
    this.scene.events.emit(
      SkillsScene.CONTROLLER_VALUE_CHANGED_EVENT,
      this.name,
      this.multiplier,
    );
  }
}
