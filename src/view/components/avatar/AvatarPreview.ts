import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Atlases } from '../../../assets';
import AvatarScene from '../../scenes/AvatarScene';
import BaseScene from '../../scenes/BaseScene';
import { getScene } from '../../utils/phaser/PhaserUtils';
import { ToggleSpriteButton } from '../../utils/simpleButton/ToggleSpriteButton';
import { AvatarBodyElement } from './preview/AvatarBodyElement';

export default class AvatarPreview extends Phaser.GameObjects.Container {
  public static NAME: string = 'AvatarPreview';
  public static GENDER_BUTTON_CLICK_EVENT: string = 'genderButtonClick';
  public static GENDER_BUTTON_CLICKED_NOTIFICATION: string = `${AvatarPreview.NAME}GenderButtonClickedNotification`;
  protected scene: BaseScene;
  protected background: NinePatch;
  protected mainBody: AvatarBodyElement;
  protected head: AvatarBodyElement;
  protected leftArm: AvatarBodyElement;
  protected rightArm: AvatarBodyElement;
  protected legs: AvatarBodyElement;
  protected maleButton: ToggleSpriteButton;
  protected femaleButton: ToggleSpriteButton;

  constructor() {
    super(getScene(AvatarScene.NAME));
    this.scene.add.existing(this);
    this.createComponents();
    this.applyPositioning();
    this.setListeners();
    this.startAvatarAnimation();
  }

  public updateColor(index: number): void {
    this.mainBody.updateBodySkin(index);
    this.head.updateBodySkin(index);
    this.leftArm.updateBodySkin(index);
    this.rightArm.updateBodySkin(index);
    this.legs.updateBodySkin(index);
  }

  public updateGender(gender: string): void {
    gender === 'male'
      ? this.femaleButton.setInactiveState()
      : this.maleButton.setInactiveState();
    this.mainBody.updateGender(gender);
    this.head.updateGender(gender);
    this.leftArm.updateGender(gender);
    this.rightArm.updateGender(gender);
    this.legs.updateGender(gender);
  }

  public updateFace(index: number): void {
    this.head.updateAttachment('face', index);
  }
  public updateHair(index: number): void {
    this.head.updateAttachment('hair', index);
  }

  public updateShirt(index: number): void {
    this.mainBody.updateAttachment('shirt', index);
    this.leftArm.updateAttachment('arm', index);
    this.rightArm.updateAttachment('arm', index);
  }

  public updateBreeches(index: number): void {
    this.legs.updateAttachment('breeches', index);
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createBodyParts();
    this.createGenderButtons();
  }

  protected createBackground(): void {
    const frame: Phaser.Textures.Frame = this.scene.textures.getFrame(
      Atlases.Avatar.Atlas.Name,
      Atlases.Avatar.Atlas.Frames.Frame,
    );
    this.background = this.scene.make.ninePatch({
      x: 0,
      y: 0,
      key: frame.texture.key,
      frame: frame.name,
      width: this.scene.width * 0.34,
      height: this.scene.height * 0.92,
    });
    this.add(this.background);
  }

  protected createBodyParts(): void {
    this.createBody();
    this.createHead();
    this.createArms();
    this.createLegs();
  }

  protected createBody(): void {
    this.mainBody = new AvatarBodyElement(this.scene, 'part/body');
    this.add(this.mainBody);
    this.mainBody.x = -this.width * 0.015;
    this.mainBody.y = -this.height * 0.04;
    this.mainBody.addAttachment('shirt');
  }

  protected createHead(): void {
    this.head = new AvatarBodyElement(this.scene, 'part/head');
    this.add(this.head);
    this.head.addAttachment('face');
    this.head.addAttachment('hair');
    this.head.x = this.mainBody.x - this.width * 0.01;
    this.head.y =
      this.mainBody.y - this.mainBody.height * 0.47 - this.head.height * 0.49;
  }

  protected createArms(): void {
    this.createLeftArm();
    this.createRightArm();
  }

  protected createLeftArm(): void {
    this.leftArm = new AvatarBodyElement(this.scene, 'part/arm');
    this.add(this.leftArm);
    this.leftArm.addAttachment('arm');
    this.leftArm.x = this.mainBody.x - this.mainBody.width * 0.525;
    this.leftArm.y = this.mainBody.y - this.mainBody.height * 0.145;
  }
  protected createRightArm(): void {
    this.rightArm = new AvatarBodyElement(this.scene, 'part/arm');
    this.add(this.rightArm);
    this.rightArm.addAttachment('arm');
    this.sendToBack(this.rightArm);
    this.sendToBack(this.background);
    this.rightArm.x = this.mainBody.x + this.mainBody.width * 0.625;
    this.rightArm.y = this.mainBody.y - this.mainBody.height * 0.15;
  }
  protected createLegs(): void {
    this.legs = new AvatarBodyElement(this.scene, 'part/legs');
    this.add(this.legs);
    this.legs.addAttachment('breeches');
    this.sendToBack(this.legs);
    this.sendToBack(this.rightArm);
    this.sendToBack(this.background);
    this.legs.x = this.mainBody.x;
    this.legs.y = this.mainBody.y + this.mainBody.height * 0.5;
  }

  protected createGenderButtons(): void {
    this.createMaleButton();
    this.createFemaleButton();
  }

  protected createMaleButton(): void {
    this.maleButton = new ToggleSpriteButton(
      this.scene,
      Atlases.Avatar.Atlas.Name,
      Atlases.Avatar.Atlas.Frames.ButtonMaleActive,
      Atlases.Avatar.Atlas.Frames.ButtonMaleInactive,
    );
    this.add(this.maleButton);
    this.maleButton.x = -this.width * 0.341;
    this.maleButton.y = this.height * 0.41;
    this.maleButton.setActiveState();
  }
  protected createFemaleButton(): void {
    this.femaleButton = new ToggleSpriteButton(
      this.scene,
      Atlases.Avatar.Atlas.Name,
      Atlases.Avatar.Atlas.Frames.ButtonFemaleActive,
      Atlases.Avatar.Atlas.Frames.ButtonFemaleInactive,
    );
    this.add(this.femaleButton);
    this.femaleButton.x = this.width * 0.341;
    this.femaleButton.y = this.height * 0.41;
  }

  protected applyPositioning(): void {
    const difY: number = (this.scene.height - this.height) / 2;
    this.x = this.width * 0.5 + difY;
    this.y = this.height * 0.5 + difY;
  }

  protected setListeners(): void {
    this.maleButton.on(
      ToggleSpriteButton.CLICK_EVENT,
      this.onGenderButtonClick.bind(this, 'male'),
    );
    this.femaleButton.on(
      ToggleSpriteButton.CLICK_EVENT,
      this.onGenderButtonClick.bind(this, 'female'),
    );
  }

  protected startAvatarAnimation(): void {
    this.scene.tweens.killTweensOf([this.leftArm, this.rightArm]);
    const leftArmDuration: number = Phaser.Math.Between(1500, 2500);
    const rightArmDuration: number = Phaser.Math.Between(1500, 2500);
    this.scene.tweens.add({
      targets: this.rightArm,
      angle: Phaser.Math.Between(-15, 15),
      yoyo: true,
      duration: rightArmDuration,
      onComplete: () => {
        rightArmDuration > leftArmDuration && this.startAvatarAnimation();
      },
    });
    this.scene.tweens.add({
      targets: this.leftArm,
      duration: leftArmDuration,
      angle: Phaser.Math.Between(-15, 15),
      yoyo: true,
      onComplete: () => {
        leftArmDuration >= rightArmDuration && this.startAvatarAnimation();
      },
    });
  }

  protected onGenderButtonClick(gender: string): void {
    this.emit(AvatarPreview.GENDER_BUTTON_CLICK_EVENT, gender);
  }
}
