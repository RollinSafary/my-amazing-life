import { Fonts, MultiAtlases } from '../../../../assets';
import { Translation } from '../../../../translations';
import { ILimitation, ITextStyle } from '../../../utils/phaser/PhaserUtils';
import BaseController from './BaseController';

export default class HorizontalController extends BaseController {
  protected pointerStartX: number;
  protected hookStartX: number;
  protected limit: ILimitation;
  protected hook: Phaser.GameObjects.Image;

  public setActiveState(state: boolean): void {
    this.hook.setFrame(
      state
        ? MultiAtlases.Skills.Atlas.Frames.HorizontalActive
        : MultiAtlases.Skills.Atlas.Frames.HorizontalPassive,
    );
  }

  protected createComponents(): void {
    super.createComponents();
    this.setLimits();
    this.hook.x = this.limit.min;
    this.limitMovement(true);
  }

  protected createBar(): void {
    this.bar = this.scene.make.image({
      x: 0,
      y: 0,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.HorizontalBar,
    });
    this.add(this.bar);
  }

  protected setLimits(): void {
    this.limit = {
      min: -this.width * 0.465,
      max: this.width * 0.46,
    };
  }
  protected createLabel(): void {
    const style: ITextStyle = {
      fontFamily: Fonts.ArialBlack.Name,
      fontSize: 14,
      fill: '#1d3f31',
    };
    this.label = this.scene.make.extText({
      x: 0,
      y: this.height * 0.75,
      text: (Translation as any)[`SKILLS_OPTION_${this.name.toUpperCase()}`],
      style,
    });
    this.label.setOrigin(0.5);
    this.add(this.label);
  }

  protected createHook(): void {
    this.hook = this.scene.make.image({
      x: 0,
      y: this.height * 0.35,
      key: MultiAtlases.Skills.Atlas.Name,
      frame: MultiAtlases.Skills.Atlas.Frames.HorizontalPassive,
    });
    this.add(this.hook);
  }

  protected onDragStart(pointer: Phaser.Input.Pointer): void {
    this.setActiveState(true);
    this.pointerStartX = pointer.x;
    this.hookStartX = this.hook.x;
    this.emitSelection();
  }

  protected onDrag(pointer: Phaser.Input.Pointer): void {
    this.hook.x = this.hookStartX + pointer.x - this.pointerStartX;
    this.limitMovement();
  }

  protected onDragEnd(): void {
    this.limitMovement(true);
  }

  protected limitMovement(handleDefault: boolean = false): void {
    switch (true) {
      case this.hook.x < this.limit.min:
        this.hook.x = this.limit.min;
        break;
      case this.hook.x > this.limit.max:
        this.hook.x = this.limit.max;
        break;
      default:
        handleDefault && this.fixHookPosition();
        break;
    }
  }

  protected fixHookPosition(): void {
    const step: number = 27;
    const absoluteX: number = this.hook.x - this.limit.min;
    this.multiplier = Math.round(Math.abs(absoluteX / step));
    this.hook.x = this.limit.min + this.multiplier * step;
    this.emitValueChange();
  }
}
