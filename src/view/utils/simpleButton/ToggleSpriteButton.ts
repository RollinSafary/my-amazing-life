import BaseScene from '../../scenes/BaseScene';

export class ToggleSpriteButton extends Phaser.GameObjects.Sprite {
  public static CLICK_EVENT: string = 'clicked';
  constructor(
    protected scene: BaseScene,
    key: string,
    protected activeFrame: string,
    protected inactiveFrame: string,
  ) {
    super(scene, 0, 0, key, inactiveFrame);
    this.setListeners();
  }

  public setActiveState(): void {
    this.setFrame(this.activeFrame);
  }
  public setInactiveState(): void {
    this.setFrame(this.inactiveFrame);
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_UP, this.onClick, this);
  }

  protected onClick(): void {
    if (this.frame.name === this.activeFrame) {
      return;
    }
    this.setFrame(this.activeFrame);
    this.emit(ToggleSpriteButton.CLICK_EVENT);
  }
}
