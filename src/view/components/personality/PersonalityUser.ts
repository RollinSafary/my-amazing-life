import BaseUser from '../base/BaseUser';

export default class PersonalityUser extends BaseUser {
  public static CLICKED_EVENT: string = 'clicked';

  protected createComponents(): void {
    super.createComponents();
    this.headContainer.setScale(0.4);
    this.setListeners();
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_UP, this.onClick, this);
    this.input.enabled = false;
  }

  protected onClick(): void {
    this.emit(PersonalityUser.CLICKED_EVENT);
  }
}
