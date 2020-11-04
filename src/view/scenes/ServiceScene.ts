import BaseScene from './BaseScene';

export default class ServiceScene extends BaseScene {
  public static NAME: string = 'ServiceScene';
  public static PLAY_SFX_EVENT: string = 'playSFX';

  public static GAME_RESUMED_NOTIFICATION: string = `${ServiceScene.NAME}GameResumedNotification`;
  public static GAME_PAUSED_NOTIFICATION: string = `${ServiceScene.NAME}GamePausedNotification`;

  private musics: Phaser.Sound.BaseSound[];
  private SFXs: Phaser.Sound.BaseSound[];
  private musicManager: Phaser.Sound.BaseSoundManager;
  private sfxManager: Phaser.Sound.BaseSoundManager;
  private musicVolume = 0.6;
  private sfxVolume = 1;

  constructor() {
    super(ServiceScene.NAME);
  }

  public preload(): void {
    this.SFXs = [];
    this.musics = [];

    this.musicManager = (Phaser.Sound.SoundManagerCreator as any).create(
      this.game,
    );
    this.sfxManager = (Phaser.Sound.SoundManagerCreator as any).create(
      this.game,
    );

    this.musicManager.volume = this.musicVolume;
    this.sfxManager.volume = this.sfxVolume;
  }

  public turnOffSounds(): void {
    this.musicManager.pauseAll();
    this.sfxManager.pauseAll();
  }
  public turnOnSounds(): void {
    this.musicManager.resumeAll();
    this.sfxManager.resumeAll();
  }

  public playMusic(key: string): void {
    for (const music of this.musics) {
      try {
        music.key === key
          ? !music.isPlaying &&
            music.play({
              volume: this.musicVolume,
            })
          : music.stop();
      } catch (error) {
        // CrashlyticsWrapper.sendSignedUserException(
        //   error,
        //   'ServiceScene.playMusic',
        //   null,
        //   null,
        // );
      }
    }
  }

  public updateMusicState(enabled: boolean): void {
    this.musicManager.mute = !enabled;
  }

  public updateSoundState(enabled: boolean): void {
    this.sfxManager.mute = !enabled;
  }

  public updateLanguage(lang: string): void {
    this.i18n.changeLanguage(lang);
  }

  public createBackgroundMusics(): void {
    this.createLobbyBackgroundMusic();
    this.createGameBackgroundMusic();
  }

  private createLobbyBackgroundMusic(): void {
    // const lobby: Phaser.Sound.BaseSound = this.musicManager.add(
    //   Audios.LobbyBackgroundMusic.Name,
    //   {
    //     loop: true,
    //     volume: this.musicVolume,
    //   },
    // );
    // lobby.stop();
    // this.musics.push(lobby);
  }

  private createGameBackgroundMusic(): void {
    // const game: Phaser.Sound.BaseSound = this.musicManager.add(
    //   Audios.GameBackgroundMusic.Name,
    //   {
    //     loop: true,
    //     volume: this.musicVolume,
    //   },
    // );
    // game.stop();
    // this.musics.push(game);
  }

  public playSFX(sfxKey: string): void {
    // let sfx: Phaser.Sound.BaseSound = this.SFXs.find(
    //   (sfx: Phaser.Sound.BaseSound) => sfx.key === sfxKey,
    // );
    // if (!sfx) {
    //   sfx = this.sfxManager.add(sfxKey, {
    //     volume: this.sfxVolume,
    //   });
    //   this.SFXs.push(sfx);
    // }
    // sfx.play();
  }

  public stopSFX(): void {
    // for (const sfx of this.SFXs) {
    //   try {
    //     sfx.stop();
    //   } catch (error) {
    //     CrashlyticsWrapper.sendSignedUserException(
    //       error,
    //       'ServiceScene.stopSFX',
    //       null,
    //       null,
    //     );
    //   }
    // }
  }
}
