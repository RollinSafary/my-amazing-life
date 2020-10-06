import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Atlases } from '../../../assets';
import { IAvatarConfig } from '../../../model/vo/UiVo';
import AvatarScene from '../../scenes/AvatarScene';
import BaseScene from '../../scenes/BaseScene';
import { getScene } from '../../utils/phaser/PhaserUtils';
import { ToggleSpriteButton } from '../../utils/simpleButton/ToggleSpriteButton';
import Avatar from './Avatar';

export default class AvatarPreview extends Phaser.GameObjects.Container {
  public static NAME: string = 'AvatarPreview';
  public static GENDER_BUTTON_CLICK_EVENT: string = 'genderButtonClick';
  public static GENDER_BUTTON_CLICKED_NOTIFICATION: string = `${AvatarPreview.NAME}GenderButtonClickedNotification`;
  protected scene: BaseScene;
  protected background: NinePatch;
  protected avatar: Avatar;
  protected maleButton: ToggleSpriteButton;
  protected femaleButton: ToggleSpriteButton;

  constructor() {
    super(getScene(AvatarScene.NAME));
    this.scene.add.existing(this);
    this.createComponents();
    this.applyPositioning();
    this.setListeners();
    this.avatar.startAvatarAnimation();
  }

  public updateAvatar(config: IAvatarConfig): void {
    config.gender === 'male'
      ? this.femaleButton.setInactiveState()
      : this.maleButton.setInactiveState();
    this.avatar.setConfig(config);
  }

  protected createComponents(): void {
    this.createBackground();
    this.setSize(this.background.width, this.background.height);
    this.createAvatar();
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

  protected createAvatar(): void {
    this.avatar = new Avatar(this.scene);
    this.add(this.avatar);
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

  protected onGenderButtonClick(gender: string): void {
    this.emit(AvatarPreview.GENDER_BUTTON_CLICK_EVENT, gender);
  }
}
