import { NinePatch } from '@koreez/phaser3-ninepatch';
import { Atlases, Audios, MultiAtlases } from '../../assets';
import {
  loadAtlases,
  loadAudios,
  loadMultiAtlases,
} from '../utils/assetLoader';
import { getFramesByName } from '../utils/phaser/PhaserUtils';
import BaseScene from './BaseScene';

export default class LoadingScene extends BaseScene {
  public static NAME: string = 'LoadingScene';
  public static LOAD_COMPLETE_EVENT: string = 'loadComplete';
  public static LOAD_COMPLETE_NOTIFICATION: string = `${LoadingScene.NAME}LoadCompleteNotification`;

  private logo: Phaser.GameObjects.Image;
  private background: Phaser.GameObjects.Image;
  private fill: NinePatch;
  private progress: number = 0;

  constructor() {
    super(LoadingScene.NAME);
  }

  public create(): void {
    this.createLogo();
    this.createBackground();
    this.createFill();
    this.startLoading();
    this.setListeners();
  }

  private createLogo(): void {
    this.logo = this.make.image({
      x: this.width * 0.5,
      y: this.height * 0.5,
      key: Atlases.Loading.Atlas.Name,
      frame: Atlases.Loading.Atlas.Frames.LoadingLogo,
    });
    this.add.existing(this.logo);
  }

  private createBackground(): void {
    this.background = this.make.image({
      x: this.width * 0.5,
      y: this.logo.y + this.logo.height * 0.8,
      key: Atlases.Loading.Atlas.Name,
      frame: Atlases.Loading.Atlas.Frames.LoadingBackground,
    });
    this.add.existing(this.background);
  }

  private createFill(): void {
    const frame: Phaser.Textures.Frame = this.textures.getFrame(
      Atlases.Loading.Atlas.Name,
      Atlases.Loading.Atlas.Frames.LoadingFill,
    );
    this.fill = this.make.ninePatch({
      x: this.background.x - this.background.width * 0.5 + 2,
      y: this.logo.y + this.logo.height * 0.8,
      key: frame.texture.key,
      frame: frame.name,
      width: 0,
      height: frame.height,
    });
    this.fill.setOrigin(0, 0.5);
    this.add.existing(this.fill);
  }

  private setListeners(): void {
    this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
    this.load.on(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);
  }

  private onLoadProgress(progress: number): void {
    const frame: Phaser.Textures.Frame = this.textures.getFrame(
      Atlases.Loading.Atlas.Name,
      Atlases.Loading.Atlas.Frames.LoadingFill,
    );
    this.tweens.killTweensOf(this.fill);
    this.tweens.add({
      targets: this,
      progress,
      onUpdate: () => {
        this.fill.resize(
          (this.background.width - 4) * this.progress,
          frame.height,
        );
      },
      duration: 200,
      ease: Phaser.Math.Easing.Expo.InOut,
    });
  }

  private onLoadComplete(): void {
    this.createAnimations();
    const frame: Phaser.Textures.Frame = this.textures.getFrame(
      Atlases.Loading.Atlas.Name,
      Atlases.Loading.Atlas.Frames.LoadingFill,
    );
    this.tweens.killTweensOf(this.fill);
    this.tweens.add({
      targets: this.fill,
      width: frame.width,
      duration: 200,
      ease: Phaser.Math.Easing.Expo.InOut,
      onComplete: () => {
        this.events.emit(LoadingScene.LOAD_COMPLETE_EVENT);
      },
    });
  }

  private startLoading(): void {
    loadAtlases(this, Atlases.Popups);
    loadAtlases(this, Atlases.Welcome);
    loadAtlases(this, Atlases.Login);
    loadAtlases(this, Atlases.Avatar);
    loadAtlases(this, Atlases.Lobby);
    loadAtlases(this, Atlases.Results);
    loadMultiAtlases(this, MultiAtlases);
    loadAudios(this, Audios);

    this.load.start();
  }

  private createAnimations(): void {
    this.createAnimation(
      'boom',
      MultiAtlases.Hobbies.Atlas.Name,
      'boom',
      0,
      30,
      false,
    );
  }

  private createAnimation(
    animationKey: string,
    textureKey: string,
    frameKeyword: string,
    repeat: number = 0,
    frameRate: number = 30,
    yoyo: boolean = false,
  ): void {
    const frames = getFramesByName(
      MultiAtlases.Hobbies.Atlas.Name,
      frameKeyword,
    );
    const animationFrames: Phaser.Types.Animations.AnimationFrame[] = [];
    for (const frame of frames) {
      animationFrames.push({
        key: textureKey,
        frame,
      });
    }
    this.anims.create({
      key: animationKey,
      frames: animationFrames,
      repeat,
      frameRate,
      skipMissedFrames: true,
      yoyo,
    });
  }
}
