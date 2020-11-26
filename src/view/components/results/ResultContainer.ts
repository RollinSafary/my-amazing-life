import { IAvatarConfig } from '../../../model/vo/UiVO';
import BaseScene from '../../scenes/BaseScene';
import { IImageConfig, IPosition } from '../../utils/phaser/PhaserUtils';
import Avatar from '../avatar/Avatar';

export class ResultContainer extends Phaser.GameObjects.Container {
  protected background: Phaser.GameObjects.Image;
  protected avatar: Avatar;
  protected maskGraphics: Phaser.GameObjects.Graphics;

  constructor(
    protected scene: BaseScene,
    protected config: IResultContainerConfig,
  ) {
    super(scene, config.position.x, config.position.y);
    this.scene.add.existing(this);
    this.createComponents();
  }

  protected createComponents(): void {
    this.setSize(this.config.size.width, this.config.size.height);
    this.createBackground();
    !!this.config.avatar &&
      !!this.config.avatarTransform &&
      this.createAvatar();
    this.createMask();
  }

  protected createBackground(): void {
    this.background = this.scene.make.image({
      x: 0,
      y: 0,
      key: this.config.image.key,
      frame: this.config.image.frame,
    });
    this.add(this.background);
    this.background.setScale(this.config.imageScale);
  }

  protected createAvatar(): void {
    this.avatar = new Avatar(this.scene, this.config.avatar);
    this.avatar.x = this.config.avatarTransform.x * this.width;
    this.avatar.y = this.config.avatarTransform.y * this.height;
    this.avatar.setScale(this.config.avatarTransform.scale);
    this.add(this.avatar);
    this.config.avatarTransform.flip &&
      this.avatar.setScale(this.avatar.scaleX * -1, this.avatar.scaleY);
  }

  protected createMask(): void {
    this.maskGraphics = this.scene.make.graphics({});
    this.maskGraphics.fillStyle(0xfffffff);
    this.maskGraphics.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height,
    );
    this.setMask(
      new Phaser.Display.Masks.GeometryMask(this.scene, this.maskGraphics),
    );
  }
}

export interface IResultContainerConfig {
  position: IPosition;
  image: IImageConfig;
  imageScale: number;
  avatar?: IAvatarConfig;
  avatarTransform?: IResultAvatarTransformConfig;
  size: { width: number; height: number };
}

export interface IResultAvatarTransformConfig extends IPosition {
  scale: number;
  flip: boolean;
}
