import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import { ILimitation, ITextStyle } from '../../../utils/phaser/PhaserUtils';
import BaseController from './BaseController';

export default class VerticalController extends BaseController {
  protected pointerStartY: number;
  protected hookStartY: number;
  protected limit: ILimitation;
  protected hook: Phaser.GameObjects.Image;

  public setActiveState(state: boolean): void {
    this.hook.setFrame(
      state
        ? MultiAtlases.Skills.Atlas.Frames.VerticalActive
        : MultiAtlases.Skills.Atlas.Frames.VerticalPassive,
    );
  }

  protected createComponents(): void {
    super.createComponents();
    this.setLimits();
    this.hook.y = this.limit.max;
    this.limitMovement(true);
  }

  protected createBar(): void {
    this.bar = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.VerticalBar,
    });
    this.add(this.bar);
  }

  protected setLimits(): void {
    this.limit = {
      min: -this.height * 0.465,
      max: this.height * 0.46,
    };
  }
  protected createLabel(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 14,
      fill: '#1d3f31',
    };
    this.label = this.scene.make.extText({
      x: this.width * 0.15,
      y: this.height * 0.6,
      text: (Translation as any)[`SKILLS_OPTION_${this.name.toUpperCase()}`],
      style,
    });
    this.label.setOrigin(0.5);
    this.add(this.label);
  }

  protected createHook(): void {
    this.hook = this.scene.make.image({
      x: this.width * 0.125,
      y: 0,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.VerticalPassive,
    });
    this.add(this.hook);
  }

  protected onDragStart(pointer: Phaser.Input.Pointer): void {
    this.setActiveState(true);
    this.pointerStartY = pointer.y;
    this.hookStartY = this.hook.y;
    this.emitSelection();
  }

  protected onDrag(pointer: Phaser.Input.Pointer): void {
    this.hook.y = this.hookStartY + pointer.y - this.pointerStartY;
    this.limitMovement();
  }

  protected onDragEnd(): void {
    this.limitMovement(true);
  }

  protected limitMovement(handleDefault: boolean = false): void {
    switch (true) {
      case this.hook.y < this.limit.min:
        this.hook.y = this.limit.min;
        break;
      case this.hook.y > this.limit.max:
        this.hook.y = this.limit.max;
        break;
      default:
        handleDefault && this.fixHookPosition();
        break;
    }
  }

  protected fixHookPosition(): void {
    const step: number = 27;
    const absoluteY: number = this.limit.max - this.hook.y;
    this.multiplier = Math.round(Math.abs(absoluteY / step));
    this.hook.y = this.limit.max - this.multiplier * step;
    this.emitValueChange();
  }
}
