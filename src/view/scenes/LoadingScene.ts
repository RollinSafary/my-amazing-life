import { Atlases, Audios, MultiAtlases } from '../../assets';
import {
  loadAtlases,
  loadAudios,
  loadMultiAtlases,
} from '../utils/assetLoader';
import BaseScene from './BaseScene';

export default class LoadingScene extends BaseScene {
  public static NAME: string = 'LoadingScene';
  public static LOAD_COMPLETE_EVENT: string = 'loadComplete';
  public static LOAD_COMPLETE_NOTIFICATION: string = `${LoadingScene.NAME}LoadCompleteNotification`;

  private logo: Phaser.GameObjects.Image;
  private fill: Phaser.GameObjects.TileSprite;

  constructor() {
    super(LoadingScene.NAME);
  }

  public create(): void {
    this.createLogo();
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

  private createFill(): void {
    const frame: Phaser.Textures.Frame = this.textures.getFrame(
      Atlases.Loading.Atlas.Name,
      Atlases.Loading.Atlas.Frames.LoadingFill,
    );
    this.fill = this.make.tileSprite({
      x: this.logo.x - frame.width / 2,
      y: this.logo.y + this.logo.height * 0.8,
      key: frame.texture.key,
      frame: frame.name,
      width: 0,
      height: frame.height,
    });
    this.fill.setOrigin(0, 0.5);
    this.fill.width = 0;
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
      targets: this.fill,
      width: frame.width * progress,
      duration: 200,
      ease: Phaser.Math.Easing.Expo.InOut,
    });
  }

  private onLoadComplete(): void {
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
    loadAtlases(this, Atlases.Welcome);
    loadAtlases(this, Atlases.Login);
    loadAtlases(this, Atlases.Avatar);
    loadAtlases(this, Atlases.Lobby);
    loadMultiAtlases(this, MultiAtlases);
    loadAudios(this, Audios);
    this.load.start();
  }
}
