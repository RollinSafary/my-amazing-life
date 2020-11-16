import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import { IPosition, ITextStyle } from '../../../utils/phaser/PhaserUtils';
import BaseController from './BaseController';
import CircleControllerHook from './CircleControllerHook';

export default class SphereController extends BaseController {
  protected startPosition: IPosition;
  protected hook: CircleControllerHook;

  public setActiveState(state: boolean): void {
    this.hook.setFrame(
      state
        ? MultiAtlases.Skills.Atlas.Frames.SphereActive
        : MultiAtlases.Skills.Atlas.Frames.SpherePassive,
    );
  }

  protected createBar(): void {
    this.bar = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.SphereBackground,
    });
    this.add(this.bar);
  }

  protected createLabel(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 14,
      fill: '#1d3f31',
    };
    this.label = this.scene.make.extText({
      x: 0,
      y: this.height * 0.42,
      text: (Translation as any)[`SKILLS_OPTION_${this.name.toUpperCase()}`],
      style,
    });
    this.label.setOrigin(0.5);
    this.add(this.label);
  }

  protected createHook(): void {
    this.hook = new CircleControllerHook(this.scene);
    this.hook.x = 0;
    this.hook.y = -this.height * 0.05;
    this.add(this.hook);
  }

  protected onDragStart(pointer: Phaser.Input.Pointer): void {
    this.setActiveState(true);
    const matrix = this.hook.getWorldTransformMatrix();
    this.startPosition = {
      x: matrix.tx,
      y: matrix.ty,
    };
    this.hook.angle = this.calculateAngle(pointer.x, pointer.y);
    this.emitSelection();
  }
  protected onDrag(pointer: Phaser.Input.Pointer): void {
    this.hook.angle = this.calculateAngle(pointer.x, pointer.y);
  }

  protected onDragEnd(): void {
    this.fixHookPosition();
  }

  protected fixHookPosition(): void {
    const step: number = 36;
    this.multiplier = Math.round(this.normalizeAngle(this.hook.angle) / step);
    this.hook.angle = this.multiplier * step;
    this.emitValueChange();
  }

  protected calculateAngle(x: number, y: number): number {
    return Phaser.Math.RadToDeg(
      Phaser.Math.Angle.Between(
        this.startPosition.x,
        this.startPosition.y,
        x,
        y,
      ) +
        Math.PI / 2,
    );
  }

  private normalizeAngle(angle: number): number {
    return (angle + 360) % 360;
  }
}
