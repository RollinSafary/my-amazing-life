import { Atlases } from '../../../../assets';
import { upperCaseFirstLetter } from '../../../../utils/Utils';
import BaseScene from '../../../scenes/BaseScene';
import AvatarSkins from '../AvatarSkins';

export default class AvatarSkinButton extends Phaser.GameObjects.Image {
  constructor(
    protected scene: BaseScene,
    public skinName: string,
    public index: number,
    protected gender: string = null,
  ) {
    super(
      scene,
      0,
      0,
      Atlases.Avatar.Atlas.Name,
      (Atlases.Avatar.Atlas.Frames as any)[
        `${
          gender !== null ? `Button${upperCaseFirstLetter(gender)}` : 'Button'
        }${upperCaseFirstLetter(skinName)}${index}`
      ],
    );
    this.setListeners();
  }

  public updateGender(gender: string = this.gender): void {
    this.gender = gender;
    this.setFrame(
      (Atlases.Avatar.Atlas.Frames as any)[
        `${
          this.gender !== null
            ? `Button${upperCaseFirstLetter(this.gender)}`
            : 'Button'
        }${upperCaseFirstLetter(this.skinName)}${this.index}`
      ],
    );
  }

  protected setListeners(): void {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_UP, this.onClick, this);
    this.on(Phaser.Input.Events.POINTER_OVER, this.onHover, this);
    this.on(Phaser.Input.Events.POINTER_OUT, this.onOut, this);
  }

  protected onClick(): void {
    this.parentContainer.emit(
      AvatarSkins.SKIN_CLICKED_EVENT,
      this.skinName,
      this.index,
    );
  }

  protected onHover(): void {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.1,
      scaleY: 1.1,
      ease: Phaser.Math.Easing.Expo.InOut,
      duration: 200,
    });
  }
  protected onOut(): void {
    this.scene.tweens.killTweensOf(this);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      ease: Phaser.Math.Easing.Expo.InOut,
      duration: 200,
    });
  }
}
