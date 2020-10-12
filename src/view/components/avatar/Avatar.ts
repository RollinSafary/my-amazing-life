import { Atlases } from '../../../assets';
import { defaultAvatarConfig } from '../../../constants/Constants';
import { IAvatarConfig } from '../../../model/vo/UiVO';
import BaseScene from '../../scenes/BaseScene';
import { AvatarBodyElement } from './preview/AvatarBodyElement';

export default class Avatar extends Phaser.GameObjects.Container {
  protected mainBody: AvatarBodyElement;
  protected head: AvatarBodyElement;
  protected leftArm: AvatarBodyElement;
  protected rightArm: AvatarBodyElement;
  protected legs: AvatarBodyElement;
  protected shadow: Phaser.GameObjects.Image;

  public config: IAvatarConfig = defaultAvatarConfig;

  constructor(protected scene: BaseScene, config?: IAvatarConfig) {
    super(scene);
    this.setSize(this.scene.width * 0.34, this.scene.height * 0.92);
    this.createComponents();
    !!config && this.setConfig(config);
  }

  public showShadow(): void {
    this.shadow.setVisible(true);
  }

  public setConfig(config: IAvatarConfig): void {
    this.config = config;
    this.updateGender();
    this.updateColor();
    this.updateHair();
    this.updateFace();
    this.updateShirt();
    this.updateBreeches();
    this.updateShadow();
  }

  public updateColor(): void {
    this.mainBody.updateBodySkin(this.config.color);
    this.head.updateBodySkin(this.config.color);
    this.leftArm.updateBodySkin(this.config.color);
    this.rightArm.updateBodySkin(this.config.color);
    this.legs.updateBodySkin(this.config.color);
  }

  public updateGender(): void {
    this.mainBody.updateGender(this.config.gender);
    this.head.updateGender(this.config.gender);
    this.leftArm.updateGender(this.config.gender);
    this.rightArm.updateGender(this.config.gender);
    this.legs.updateGender(this.config.gender);
  }

  public updateFace(): void {
    this.head.updateAttachment('face', this.config.face);
  }
  public updateHair(): void {
    this.head.updateAttachment('hair', this.config.hair);
  }

  public updateShirt(): void {
    this.mainBody.updateAttachment('shirt', this.config.shirt);
    this.leftArm.updateAttachment('arm', this.config.shirt);
    this.rightArm.updateAttachment('arm', this.config.shirt);
  }

  public updateBreeches(): void {
    this.legs.updateAttachment('breeches', this.config.breeches);
  }

  public updateShadow(): void {
    this.config.hair !== -1 &&
      this.shadow.setFrame(`${this.config.gender}/shadow-${this.config.hair}`);
  }

  protected createComponents(): void {
    this.createBody();
    this.createHead();
    this.createArms();
    this.createLegs();
    this.createShadow();
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
    this.leftArm.x = this.mainBody.x - this.mainBody.width * 0.6;
    this.leftArm.y = this.mainBody.y - this.mainBody.height * 0.145;
  }
  protected createRightArm(): void {
    this.rightArm = new AvatarBodyElement(this.scene, 'part/arm');
    this.add(this.rightArm);
    this.rightArm.addAttachment('arm');
    this.sendToBack(this.rightArm);
    this.rightArm.x = this.mainBody.x + this.mainBody.width * 0.625;
    this.rightArm.y = this.leftArm.y;
  }
  protected createLegs(): void {
    this.legs = new AvatarBodyElement(this.scene, 'part/legs');
    this.add(this.legs);
    this.legs.addAttachment('breeches');
    this.sendToBack(this.legs);
    this.sendToBack(this.rightArm);
    this.legs.x = this.mainBody.x;
    this.legs.y = this.mainBody.y + this.mainBody.height * 0.5;
  }

  protected createShadow(): void {
    this.shadow = this.scene.make.image({
      x: 0,
      y: 0,
      key: Atlases.Lobby.Atlas.Name,
      frame: Atlases.Lobby.Atlas.Frames.MaleShadow0,
    });
    this.add(this.shadow);
    this.sendToBack(this.shadow);
    this.shadow.setVisible(false);
  }

  public startAvatarAnimation(): void {
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
}
